/*  -------------------- © 2019. NOVO WORK SYSTEMS | http://novo.ws ------------------- */
/* -------------------------- Use @ your own risk. -------------------------- */
const contextMenuVideo = {
  id: 'video',
  title: 'Cast to Roku',
  contexts: ['video'],
  targetUrlPatterns: [
    '*://*/*.mp4*',
    '*://*/*.m3u8*',
    '*://*/*.3gp*',
    '*://*/*.mov*',
    '*://*/*.mkv*',
    '*://*/*.ism*',
    '*://*/*.mpd*',
    '*://*/*'
  ]
};
const contextMenuPoster = {
  id: 'image',
  title: 'Cast to Roku',
  contexts: ['image'],
  targetUrlPatterns: [
    '*://*/*.png*',
    '*://*/*.jpg*',
    '*://*/*.jpeg*',
    '*://*/*.gif*',
    '*://*/*'
  ]
};

const sendRequest = url => {
  fetch(url, {
    method: 'POST'
  })
    .then(re => {
      console.log(re);
    })
    .catch(e => {
      if (e.toString() === 'TypeError: Failed to fetch') {
        alert('Wrong IP Address.');
      } else {
        alert(e.toString());
      }
    });
};

chrome.contextMenus.create(contextMenuPoster);
chrome.contextMenus.create(contextMenuVideo);
chrome.contextMenus.onClicked.addListener((obj, tab) => {
  let srcURL = '';
  let mediaType = '';
  let title = '';
  let subtitle = '';
  const url = `http://${localStorage.getItem('ip')}:8060/launch/dev?`;

  switch (obj.mediaType) {
    case 'video':
      mediaType = 'url';
      srcURL = obj.srcUrl;
      title = tab.title;
      subtitle = 'iyy2u323yu2yu32y3uy2u3';

      sendRequest(
        url +
          `${mediaType}=${encodeURIComponent(
            srcURL
          )}&title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(
            subtitle
          )}`
      );
      break;
    case 'image':
      mediaType = 'poster';
      srcURL = obj.srcUrl;

      sendRequest(url + `${mediaType}=${encodeURIComponent(srcURL)}`);
      break;

    default:
      break;
  }
});
