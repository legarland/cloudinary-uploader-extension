document.addEventListener("DOMContentLoaded", function() {
  // Wire up save button
  document.querySelector("#saveButton").addEventListener("click", function() {
    saveInfo();
  });

  chrome.storage.sync.get(
    ["cloudinary_api_key", "cloudinary_api_secret", "cloud_name"],
    function(data) {
      var cloudName = document.querySelector("#cloud_name");
      var apiKey = document.querySelector("#api_key");
      var apiSecret = document.querySelector("#api_secret");

      cloudName.value = data.cloud_name || "";
      apiKey.value = data.cloudinary_api_key || "";
      apiSecret.value = data.cloudinary_api_secret || "";
    }
  );
});

function saveInfo() {
  var cloudName = document.querySelector("#cloud_name").value;
  var apiKey = document.querySelector("#api_key").value;
  var apiSecret = document.querySelector("#api_secret").value;

  chrome.storage.sync.set(
    {
      cloudinary_api_secret: apiSecret,
      cloudinary_api_key: apiKey,
      cloud_name: cloudName
    },
    function() {
      alert("Cloudinary information saved");
    }
  );
}
