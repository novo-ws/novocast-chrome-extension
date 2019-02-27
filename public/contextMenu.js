/*  -------------------- © 2019. NOVO WORK SYSTEMS | http://novo.ws ------------------- */
/* -------------------------- Use @ your own risk. -------------------------- */
const contextMenuVideo = {
  id: 'video',
  title: 'Cast to Roku',
  contexts: ['video'],
  targetUrlPatterns: ['*://*/*.mp4*', '*://*/*.webm*']
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

chrome.contextMenus.create(contextMenuPoster);
chrome.contextMenus.create(contextMenuVideo);
chrome.contextMenus.onClicked.addListener((obj, tab) => {
  // NOTE This will probably be extracted out into a reusable function.
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
      console.log(tab);
      // Make the request via fetch
      fetch(
        url +
          `${mediaType}=${encodeURIComponent(
            srcURL
          )}&title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(
            subtitle
          )}`,
        {
          method: 'POST'
        }
      )
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
      break;
    case 'image':
      mediaType = 'poster';
      srcURL = obj.srcUrl;
      // Make the request via fetch
      fetch(url + `${mediaType}=${encodeURIComponent(srcURL)}`, {
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
      break;

    default:
      break;
  }
});
