const docIndex = document.querySelector(".layout .doc-index");
const docIndexButton = document.querySelector<HTMLButtonElement>(
  ".layout .doc-index-button",
);
if (docIndex && docIndexButton) {
  docIndexButton.addEventListener(
    "click",
    () => {
      docIndexButton.classList.toggle("on");
      docIndex.classList.toggle("active");
    },
  );
  if (window.innerWidth > 859) {
    docIndexButton.click();
  }
}
