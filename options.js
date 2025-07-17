const input = document.getElementById("urlInput");

chrome.storage.sync.get("redirectUrl", (data) => {
    input.value = data.redirectUrl || "";
});

document.getElementById("saveBtn").addEventListener("click", () => {
    chrome.storage.sync.set({ redirectUrl: input.value }, () => {
        alert("Redirect URL saved!");
    });
});
