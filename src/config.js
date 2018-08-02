document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("#saveButton").addEventListener("click", function() {
    saveInfo();
  });

  chrome.storage.sync.get(
    ["cloudinary_api_key", "cloudinary_api_secret"],
    function(data) {
      var apiKey = document.querySelector("#api_key");
      apiKey.value = data.cloudinary_api_key;
    }
  );
});

function saveInfo() {
  var apiKey = document.querySelector("#api_key").value;
  var apiSecret = document.querySelector("#api_secret").value;

  chrome.storage.sync.set({ cloudinary_api_key: apiKey });
  chrome.storage.sync.set({ cloudinary_api_secret: apiSecret }, function() {
    alert("Cloudinary information saved");
  });
}
