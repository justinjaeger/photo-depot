document.querySelector('#log-in').addEventListener('click', () => {
  chrome.runtime.sendMessage({message: 'login'}, (response) => {
    console.log('logged in')
  })
})

document.querySelector('#is-user-signed-in').addEventListener('click', () => {
  chrome.runtime.sendMessage({message: 'isUserSignedIn'}, (response) => {
    console.log('is user signed in')
  })
})