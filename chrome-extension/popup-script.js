document.querySelector('#log-in').addEventListener('click', () => {
  chrome.runtime.sendMessage({message: 'login'}, (response) => {
    console.log('logged in')
  })
})