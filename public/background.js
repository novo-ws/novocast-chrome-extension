chrome.runtime.onMessage.addListener(msg => {
  if (msg.type == 'open') {
    // Using Fetch
    const url = `http://${
      msg.ip
    }:8060/launch/dev?version=1&url=${encodeURIComponent(
      msg.url
    )}&title=${encodeURIComponent('video')}&image=${encodeURIComponent('url')}`;
    fetch(url, {
      method: 'POST'
    })
      .then(res => {
        console.log(res);
      })
      .catch(e => console.log(e));
  }
});
