//==========="Background" Script===========//

// these are assigned when you log in
let userName;
let userId;


//===========Context Menu Button===========//
// Creates dropdown menu button to click and POST image to server

let contextMenuItem = {
  id: "photoDepot",
  title: "Photo Depot",
  contexts: ["image"]
};

// Create context menu
chrome.contextMenus.create(contextMenuItem);

// Event listener for when contect menu item is selected
chrome.contextMenus.onClicked.addListener(image => {
  const imageUrl = image.srcUrl;

  const data = { imageUrl: imageUrl, userId: userId }
  // Send request to server with image url - i.e. image.src.Url
  fetch(`http://localhost:3000/chrome/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    // Send image url and response id, respectively, to popup
    chrome.runtime.sendMessage({
      msg: "imageUrl_sent", 
      data: {
          urlId: [imageUrl, res.photoid],
      }
    });
  })
  .catch(err => console.log('Error: ', err))

})


// =========== Google Oauth ===========//

const CLIENT_ID = encodeURIComponent('265226410890-7hbseg0n4770i57n1c827s0d2amdpsnv.apps.googleusercontent.com');
const RESPONSE_TYPE = encodeURIComponent('id_token');
const REDIRECT_URI = encodeURIComponent('https://bpemhmnpammmgmigkjmdpefpjgnfmiih.chromiumapp.org');
// const STATE = encodeURIComponent('jfkls3n');
const SCOPE = encodeURIComponent('openid profile');
const PROMPT = encodeURIComponent('consent');

function create_oauth2_url() {
  let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  let url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&prompt=${PROMPT}&nonce=${nonce}`;

  return url
}

chrome.runtime.onMessage.addListener( (req, sender, sendResponse) => {
  // IF WE CLICK LOGIN
  if (req.message === 'login') {
      console.log('We are loggin you in')

      chrome.identity.launchWebAuthFlow({
        url: create_oauth2_url(),
        interactive: true
      }, async function (redirect_uri) {

        let id_token = redirect_uri.substring(redirect_uri.indexOf('id_token=')+9);
        id_token = id_token.substring(0, id_token.indexOf('&'));

        await fetch(`http://localhost:3000/chrome/login/${id_token}`)
          .then(res => res.json())
          .then(res => {
            userName = res[0];
            userId = res[1];
          })
          .catch(err => {
            console.log('errorrrrrrr:', err)
          })

        console.log('Welcome, ', userName)

        if (typeof userName === 'string') { // validating that the data we got back is not null
          chrome.browserAction.setPopup({ popup: './popup-signedin.html' }, function() {
            sendResponse('success');
          });
        } else {
          console.log('could not authenticate')
          sendResponse('failed at some point');
        };
      })

      return true;

  // IF WE CLICK LOGOUT
  } else if (req.message === 'logout') {
    console.log('logouttttt')
    chrome.browserAction.setPopup({ popup: './popup.html' }, function() {
      userId = null;
      userName = null;
      sendResponse('success');
    });
    return true

  }
})




