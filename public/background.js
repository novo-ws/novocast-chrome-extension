chrome.runtime.onMessage.addListener((msg, sender, response) => {
  switch (msg.type) {
    case 'cast':
      // Casting to Roku
      const url = `http://${
        msg.ip
      }:8060/launch/dev?version=1&url=${encodeURIComponent(
        msg.url
      )}&title=${encodeURIComponent(msg.title)}`;
      fetch(url, {
        method: 'POST'
      })
        .then(() => {
          response();
        })
        .catch(e => alert(e.toString()));
      return true;
    // Handles file downloads
    case 'download':
      chrome.downloads.download({ url: msg.url, saveAs: true });
      break;
    default:
  }
});
