// chrome.action.onClicked.addListener(() => {
//   chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
// });

// Вариант 2: Открытие в отдельном окне
// chrome.action.onClicked.addListener(() => {
//   chrome.windows.create({
//     url: chrome.runtime.getURL("index.html"),
//     type: "popup",
//     width: 1000,
//     height: 700,
//   });
// });

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "index.html" });
});
