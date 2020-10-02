document.querySelector('#log-out').addEventListener('click', () => {
  chrome.runtime.sendMessage({message: 'logout'}, (response) => {
    console.log('logged out')
    if (response === 'success') window.close()
  })
})

document.querySelector('#is-user-signed-in').addEventListener('click', () => {
  chrome.runtime.sendMessage({message: 'isUserSignedIn'}, (response) => {
    console.log('is user signed in')
  })
})