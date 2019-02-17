chrome.runtime.onMessage.addListener(msg => {
  if (msg.type == 'open') {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', msg.url, true);
    xhr.onload = function() {
      var url =
        'http://' +
        '192.168.0.119' +
        ':8060/launch/dev?version=1' +
        '&url=' +
        encodeURIComponent(xhr.responseURL) +
        '&title=' +
        encodeURIComponent('video') +
        '&image=' +
        encodeURIComponent('url');
      var method = 'POST';
      var postData = '';
      var async = true;

      var request = new XMLHttpRequest();
      request.open(method, url, async);
      request.setRequestHeader(
        'Content-Type',
        'application/json;charset=UTF-8'
      );
      request.send(postData);
    };
    xhr.send(null);
  }
});
