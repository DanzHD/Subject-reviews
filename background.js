chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    fetch(request.url)
    .then( (response) => { 
      let responseText = response.text();
      console.log(responseText);
      responseText.then( (docText) => {
        sendResponse({doc: docText});
      })
    });
      
    return true;
  }
);