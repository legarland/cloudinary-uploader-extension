import * as cloudinary from "cloudinary";

const asPromised = block => {
  return new Promise((resolve, reject) => {
    block((...results) => {
      if (chrome.runtime.lastError) {
        reject(chrome.extension.lastError);
      } else {
        resolve(...results);
      }
    });
  });
};

const storage = {
  set(items) {
    return asPromised(callback => {
      chrome.storage.sync.set(items, callback);
    });
  },

  get(keys) {
    return asPromised(callback => {
      chrome.storage.sync.get(keys, callback);
    });
  },

  remove(keys) {
    return asPromised(callback => {
      chrome.storage.sync.remove(keys, callback);
    });
  }
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: "Upload to Cloudinary",
    contexts: ["image"],
    onclick: uploadImage
  });
});

async function uploadImage(e) {
  const {
    cloudinary_api_key: api_key,
    cloudinary_api_secret: api_secret
  } = await storage.get(["cloudinary_api_key", "cloudinary_api_secret"]);

  if (!api_key || !api_secret) {
    alert("Error Uploading Image: Missing API Credentials");
    return;
  }

  cloudinary.v2.uploader.upload(
    e.srcUrl,
    {
      folder: "caption-game/",
      width: 480,
      height: 960,
      crop: "limit",
      cloud_name: "daubcreative",
      api_key,
      api_secret
    },
    (err, result) => {
      console.log(result, err);
      prompt("Success! This is your new image url", result.url);
    }
  );
}
