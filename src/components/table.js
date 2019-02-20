/*global chrome*/
import React from 'react';
import { Table, UncontrolledTooltip, Spinner } from 'reactstrap';
import Add from './add';

export default class TableClass extends React.Component {
  state = {
    title: '',
    table: [
      {
        id: '',
        casting: false,
        url: ''
      }
    ]
  };
  componentDidMount() {
    let getUrls = () => {
      var vids = document.querySelectorAll('video, source');
      var pageTitle = document.title;
      let urls = [];
      for (var i = 0; i < vids.length; i++) {
        if (vids.item(i).src !== '') {
          urls.push({ url: vids.item(i).src });
        }
      }
      return { urls: urls, title: pageTitle };
    };
    chrome.tabs.executeScript(
      {
        code: '(' + getUrls + ')();'
      },
      results => {
        let table = results[0].urls.map((item, i) => {
          return { id: i, casting: false, url: item.url };
        });

        this.setState({
          title: results[0].title,
          table: table
        });
      }
    );
  }
  // Cast videos to Roku
  cast({ id, url }) {
    this.props.showCasting();
    chrome.runtime.sendMessage(
      {
        type: 'cast',
        url: url,
        ip: this.props.ip
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
  download({ url }) {
    chrome.runtime.sendMessage({
      type: 'download',
      url: url,
      ip: this.props.ip
    });
  }
  add(e) {
    // Add url to current table
    if (e.key == 'Enter') {
      this.state.table.push({
        id: this.state.table.length + 1,
        casting: false,
        url: e.target.value
      });
      this.setState({ table: this.state.table });
      e.preventDefault();
    }
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
        {this.props.add && <Add add={this.add.bind(this)} />}
        <h6 style={{ color: '#fff', textAlign: 'center' }}>
          {this.state.title}
        </h6>
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
