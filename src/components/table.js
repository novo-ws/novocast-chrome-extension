/*global chrome*/
import React from 'react';
import { Table, UncontrolledTooltip, Spinner, Container } from 'reactstrap';

export default class TableClass extends React.Component {
  state = {
    table: [
      {
        id: '',
        casting: false,
        image: '',
        title: '',
        url: ''
      }
    ]
  };
  componentDidMount() {
    let getUrls = () => {
      var vids = document.getElementsByTagName('video');
      // vids is an HTMLCollection
      let urls = [];
      for (var i = 0; i < vids.length; i++) {
        urls.push(vids.item(i).currentSrc);
      }
      return urls;
    };
    chrome.tabs.executeScript(
      {
        code: '(' + getUrls + ')();'
      },
      results => {
        let table = results[0].map((item, i) => {
          return { id: i, casting: false, image: '', title: '', url: item };
        });
        this.setState({ table: table });
      }
    );
  }
  // Cast videos to Roku
  cast({ id, url, title, image }) {
    this.props.showCasting();
    chrome.runtime.sendMessage(
      {
        type: 'cast',
        url: url,
        ip: this.props.ip,
        title: title,
        image: image
      },
      () => {
        this.props.showCasting();
        // Change the icon to casting
        // map and update
        const newTable = this.state.table.map(item => {
          item.casting = false;
          if (item.id == id) {
            item.casting = true;
          }
          return item;
        });
        this.setState({ table: newTable });
      }
    );
  }
  // Download video to computer
  download({ url, title, image }) {
    chrome.runtime.sendMessage({
      type: 'download',
      url: url,
      ip: this.props.ip,
      title: title,
      image: image
    });
  }
  add() {
    // Adding urls to cast
  }
  render() {
    const TBODY = this.state.table.map(item => {
      return (
        <tr key={item.id}>
          <td>
            <i
              id={'item' + item.id}
              className="fas fa-download"
              onClick={() => this.download(item)}
            />
            <UncontrolledTooltip placement="left" target={'item' + item.id}>
              {`Download: ${item.url}`}
            </UncontrolledTooltip>
          </td>
          <td>
            {item.casting && (
              <div>
                <Spinner
                  id={'spinner' + item.id}
                  style={{ width: '1.2rem', height: '1.2rem', color: '#fff' }}
                  type="grow"
                />
                <UncontrolledTooltip
                  placement="left"
                  target={'spinner' + item.id}
                >
                  Now Playing..
                </UncontrolledTooltip>
              </div>
            )}
            {!item.casting && (
              <i
                className="fas fa-file-import"
                onClick={() => this.cast(item)}
              />
            )}
          </td>
        </tr>
      );
    });
    return (
      <div>
        {this.state.table.length >= 1 && (
          <Table>
            <thead>
              <tr>
                <th>Download</th>
                <th>Cast</th>
              </tr>
            </thead>
            <tbody>{TBODY}</tbody>
          </Table>
        )}
        {this.state.table.length <= 0 && (
          <p style={{ color: '#fff' }}>No video detected.</p>
        )}
      </div>
    );
  }
}
