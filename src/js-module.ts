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

const detailsElements = document.querySelectorAll("details");
detailsElements.forEach((detail, index) => {
  const isOpened = localStorage.getItem("details-" + index);
  if (isOpened !== null) {
    detail.open = isOpened === "true";
  }
});
detailsElements.forEach((detail, index) => {
  detail.addEventListener("toggle", function () {
    localStorage.setItem("details-" + index, detail.open ? "true" : "false");
  });
});
