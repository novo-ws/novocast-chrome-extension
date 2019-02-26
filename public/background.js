/* ---------------------- COPY RIGHT 2019: NOVO WORK SYSTEMS --------------------- */
/* -------------------------- Use @ your own risk. -------------------------- */
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.ip === '') {
    alert("You must set your Roku's IP Address.");
    throw new Error("You must set your Roku's IP Address.");
  }
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
          response(true);
        })
        .catch(e => {
          response(false);
          if (e.toString() === 'TypeError: Failed to fetch') {
            alert('Wrong IP Address.');
          } else {
            alert(e.toString());
          }
        });
      return true;
    // Handles file downloads
    case 'download':
      chrome.downloads.download({ url: msg.url, saveAs: true });
      break;
    default:
  }
});
