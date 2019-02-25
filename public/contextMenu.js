let contextMenuPoster = {
  id: 'NovoCast',
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
chrome.contextMenus.onClicked.addListener(obj => {
  // TODO:
  // Make a call to the API and send srcUrl and pageUrl
  const url = `http://${localStorage.getItem(
    'ip'
  )}:8060/launch/dev?poster=${encodeURIComponent(obj.srcUrl)}`;

  // Make the request via fetch
  fetch(url, { method: 'POST' })
    .then(re => {
      console.log(re);
    })
    .catch(e => {
      console.log(e);
    });
});
