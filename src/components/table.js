/*global chrome*/
import React from 'react';
import { Table } from 'reactstrap';

export default class TableClass extends React.Component {
  state = {
    table: [
      {
        id: '1',
        url:
          'https://scontent-lga3-1.cdninstagram.com/vp/d67074c501cf721f1453fe61f86b363f/5C6B8033/t50.2886-16/52514223_809587446049287_3868763500645974016_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com'
      },
      {
        id: '2',
        url:
          'https://scontent-lga3-1.cdninstagram.com/vp/dce9956620d248e4a2948941d857193b/5C6B804C/t50.2886-16/51863638_517170855439703_3602953498024476672_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com'
      }
    ]
  };
  getLink() {}
  cast(url) {
    chrome.runtime.sendMessage({ type: 'open', url: url, ip: this.props.ip });
  }
  download() {}
  render() {
    const TBODY = this.state.table.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>
            <a href={item.url}>
              <i className="fas fa-download" />
            </a>
          </td>
          <td>
            <i
              className="fas fa-file-import"
              onClick={() => this.cast(item.url)}
            />
          </td>
        </tr>
      );
    });
    return (
      <Table dark>
        <thead>
          <tr>
            <th>#</th>
            <th>Download</th>
            <th>Cast</th>
          </tr>
        </thead>
        <tbody>{TBODY}</tbody>
      </Table>
    );
  }
}
