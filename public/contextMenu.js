/* ---------------------- COPY RIGHT 2019: NOVO WORK SYSTEMS --------------------- */
/* -------------------------- Use @ your own risk. -------------------------- */
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
  // NOTE This will probably be extracted out into a reusable function.
  const url = `http://${localStorage.getItem(
    'ip'
  )}:8060/launch/dev?poster=${encodeURIComponent(obj.srcUrl)}`;

  // Make the request via fetch
  fetch(url, { method: 'POST' })
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
});
