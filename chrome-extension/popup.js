
// =========== Rob's Script ===========//

/* 
  Event listener to handle incoming message from context menu.  This contains the image url.
  Listens for when you right click an image
*/

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.msg === "imageUrl_sent") {
          // Extract url and display
          const shortenedUrl = request.data.urlId[0].substring(0, 20).concat('...')
          document.querySelector('#image-address').innerText = shortenedUrl;

          // Extract image id and display
          const imageId = request.data.urlId[1];
          document.querySelector('#image-id').innerText = imageId;
      }
  }
);

// =========== Justin's Script ===========//

document.querySelector('#log-in').addEventListener('click', () => {
  chrome.runtime.sendMessage({message: 'login'}, (response) => {
    console.log('logged in')
  })
})

document.querySelector('#log-out').addEventListener('click', () => {
  chrome.runtime.sendMessage({message: 'logout'}, (response) => {
    console.log('logged out')
  })
})

document.querySelector('#is-user-signed-in').addEventListener('click', () => {
  chrome.runtime.sendMessage({message: 'isUserSignedIn'}, (response) => {
    console.log('is user signed in')
  })
})




/*
  Display login
*/


// function logIn() {
//   console.log('Log in!!!!!')
// };

// function logOut() {
//   console.log('Log OUT!!!!!')
// };