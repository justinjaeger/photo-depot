document.querySelector('#log-out').addEventListener('click', () => {
  chrome.runtime.sendMessage({message: 'logout'}, (response) => {
    console.log('logged out')
    if (response === 'success') window.close()
  })
})