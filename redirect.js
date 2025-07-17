chrome.storage.sync.get("redirectUrl", ({ redirectUrl }) => {
    const target = redirectUrl || "https://www.example.com";
    window.location.href = target;
});
