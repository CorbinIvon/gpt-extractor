// JS Paths
// The parent which the save button is attached to.
const ParentSelector = "#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.relative.flex.h-full.max-w-full.flex-1.overflow-hidden > div > main > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient.pt-2 > div";
// The content that will be parsed and saved.
const contentSelector = "#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.relative.flex.h-full.max-w-full.flex-1.overflow-hidden > div > main > div.flex-1.overflow-hidden > div > div > div";
// Expected path of the button that is created.
let buttonSelector = "#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.relative.flex.h-full.max-w-full.flex-1.overflow-hidden > div > main > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient.pt-2 > div > button:nth-child(2)";

// Create a function to add the button
function addButton(toElement) {
  let importedButton = document.createElement('button');
  importedButton.textContent = 'Save Conversation';
  importedButton.className = 'btn relative btn-neutral border-0 md:border';
  importedButton.addEventListener('click', function() {
    let conversationDiv = document.querySelector(contentSelector);
    if (!conversationDiv) {
      console.error('gpt-saver: Conversation div not found: ' + contentSelector);
      return;
    }
    let conversationHTML = conversationDiv.innerHTML;
    // Parse HTML to get desired format.



    // Create a blob URL for the conversation text
    let blob = new Blob([conversationHTML], {type: 'text/plain'});
    let url = URL.createObjectURL(blob);

    // Tell the background script to save the conversation
    chrome.runtime.sendMessage({command: 'saveConversation', url: url});
  });
  toElement.appendChild(importedButton);
  // Get JS selector for the button.
}

// Wait for the chat box to be added to the DOM
// let observer = new MutationObserver(function(mutations) {
//   console.log("MutationObserver triggered!"); // Used to see how often the observer is triggered.
//   let _parentObject = document.querySelector(ParentSelector);
//   if (_parentObject) {
//     let saveButton = document.querySelector(buttonSelector);
//     if (!saveButton) {
//       addButton(_parentObject);
//     }
//   }
// });
// observer.observe(document.body, {childList: true, subtree: true});

// Save button can disappear when the chat is switched to a different conversation. This will re-add the button. Don't use MutationObserver
// because it will trigger when the button is removed. Check every 5 seconds.
setInterval(() => {
  let _parentObject = document.querySelector(ParentSelector);
  if (_parentObject) {
    let saveButton = document.querySelector(buttonSelector);
    if (!saveButton) {
      addButton(_parentObject);
    }
  }
}, 1000);