/*global chrome*/
import React from 'react';
import { Table } from 'reactstrap';

export default class TableClass extends React.Component {
  state = {
    table: [
      {
        id: '1',
        image:
          'https://www.bing.com/th?u=https%3a%2f%2fscontent-sea1-1.cdninstagram.com%2fvp%2f0e628beef9133524ff85b252fb144f10%2f5CC0BBB7%2ft51.2885-15%2fsh0.08%2fe35%2fc0.135.1080.1080%2fs640x640%2f50079442_1218857501600388_6153008597411267969_n.jpg%3f_nc_ht%3dscontent-sea1-1.cdninstagram.com&ehk=X2Ooodu0UoyhwdnXtvTkLQ&w=145&h=145&c=7&rs=1&qlt=80&rf=vl_fallback_instagram.png&pid=AlgoBlock',
        title: 'Puta nina bailando',
        url:
          'https://scontent-lga3-1.cdninstagram.com/vp/d67074c501cf721f1453fe61f86b363f/5C6B8033/t50.2886-16/52514223_809587446049287_3868763500645974016_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com'
      },
      {
        id: '2',
        image:
          'https://www.bing.com/th?u=https%3a%2f%2fscontent-sea1-1.cdninstagram.com%2fvp%2fb97a047ed392b27ecddf158262c3ea71%2f5CDF19ED%2ft51.2885-15%2fsh0.08%2fe35%2fc0.135.1080.1080%2fs640x640%2f49538211_378800539517644_2781103675312605684_n.jpg%3f_nc_ht%3dscontent-sea1-1.cdninstagram.com&ehk=ZefZzw7Tm2VRcI5qj6EujQ&w=145&h=145&c=7&rs=1&qlt=80&rf=vl_fallback_instagram.png&pid=AlgoBlock',
        title: 'Putisima nina linda bailando',
        url:
          'https://scontent-lga3-1.cdninstagram.com/vp/dce9956620d248e4a2948941d857193b/5C6B804C/t50.2886-16/51863638_517170855439703_3602953498024476672_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com'
      },
      {
        id: '3',
        image:
          'https://www.bing.com/th?id=AMMS_fdd5c63833a2f2e6ca576f9912700098&w=110&h=110&c=7&rs=1&qlt=80&pcl=f9f9f9&cdv=1&pid=16.1',
        title: 'Avejon de conon',
        url: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'
      }
    ]
  };
  getLink() {}
  // Cast videos to Roku
  cast({ url, title, image }) {
    chrome.runtime.sendMessage({
      type: 'cast',
      url: url,
      ip: this.props.ip,
      title: title,
      image: image
    });
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
  render() {
    const TBODY = this.state.table.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>
            <i
              className="fas fa-download"
              onClick={() => this.download(item)}
            />
          </td>
          <td>
            <i className="fas fa-file-import" onClick={() => this.cast(item)} />
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
