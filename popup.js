///////////////////////////////////////////////////////////////////////////////////////////////////////
//-------------------------------------Button Logic--------------------------------------------------//
///////////////////////////////////////////////////////////////////////////////////////////////////////

// Restore previous state of popup (sessions and user preferences) stored in chrome.storage when new tab is opened
function restore_user() {
  // Restore popup HTML with previous state 
  chrome.storage.sync.get("prev_state", function(state) {
    // State is null only upon download, only update if not null
    if (state.prev_state != null) {
      // Delete current sessions-body
      document.getElementById("sessions-body").outerHTML = "";

      // Make dummy div to store inner HTML
      let div = document.createElement("div");
      div.innerHTML = state.prev_state;
      let new_state = div.firstChild;

      // Append state into correct position
      let anchor = document.getElementById("sessions"); // Reference point for insertion
      anchor.appendChild(new_state);
    }
  });

  // Restore user preferences
  chrome.storage.sync.get("preference_arr", function(arr) {
    
  });

  // Event listener for clicking to open session
  let elements = document.getElementsByClassName("click-session");
  for (let i = 0; i < elements.length; i++) {
    alert("added");
    elements[i].addEventListener("click", open_session);
  }
}

// Saving current tab and updating popup
function save_tab() {
  // Get url of user's current tab
  chrome.tabs.query({
    active: true, currentWindow: true
  }, function(tabs) {
      let url_arr = [tabs[0].url];

      // Prompt user for new session name
      let name = "tab";

      // Update session in chrome.storage
      chrome.storage.sync.set({[name]: url_arr});
      chrome.storage.sync.get([name], function(item){
        alert(item[name]);
      });

      // Update popup menu
      add_row(name);
  });
}

// Saving current session (all tabs of window)
function save_session() {
  // Get all urls of user's current window
  chrome.tabs.query({
    active: true, currentWindow: true
  }, function(tabs) {
      let url_arr = [];
      tabs.forEach(function(tab) {
        alert(tab.url);
        url_arr.push(tab.url)
      });
      // Prompt user for new session name
      let name = "tab";

      // Update session in chrome.storage
      chrome.storage.sync.set({[name]: url_arr});
      chrome.storage.sync.get([name], function(item){
        alert(item[name]);
      });

      // Update popup menu
      add_row(name);
  });
}

// Opening settings HTML page
function open_settings() {
  // Open settings html page
  alert("settings pressed");
}

// Add a session row into the popup menu
function add_row(name) {
  // Inject row into popup
  let menu = document.getElementById("sessions-body");
  let div = document.createElement("div");
  div.id = name;
  div.innerHTML = name;
  div.className = "click-session";
  menu.appendChild(div);

  // Update previous state in chrome.storage
  let new_state = document.getElementById("sessions-body");
  chrome.storage.sync.set({"prev_state": new_state.outerHTML});

  // Update names array in chrome.storage
  chrome.storage.sync.get("names_arr", function(arr) {
    let names_arr = arr.names_arr;
    names_arr.push(name);
    chrome.storage.sync.set({names_arr: names_arr});
  });
}

// Show form for session name
function prompt_name() {
  
  
  // Check if name already exists in name array


}

// Loop through and open all tabs
function open_session() {
  alert("test");
}

// Right click on row to rename





///////////////////////////////////////////////////////////////////////////////////////////////////////
//-------------------------------------Event Listeners-----------------------------------------------//
///////////////////////////////////////////////////////////////////////////////////////////////////////

// Only create event listeners and restore popup after DOM has loaded
document.addEventListener("DOMContentLoaded", restore_user);
document.getElementById("save-tab").addEventListener("click", save_tab);
document.getElementById("save-session").addEventListener("click", save_session);
document.getElementById("settings").addEventListener("click", open_settings);
