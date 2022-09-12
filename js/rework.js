const selectorButton = document.querySelectorAll(".selector__button");
const selectorList = document.querySelectorAll(".selector__list");
const selectorItems = document.querySelectorAll(".selector__item");
const investorChart = document.querySelectorAll(".investor-item");

const toggleElem = (elem, className, duration) => {
  if (elem.classList.contains(className)) {
    elem.classList.remove(className);
    setTimeout(() => {
      elem.style.display = "none";
    }, duration);
  } else {
    elem.style.display = "block";
    setTimeout(() => {
      elem.classList.add(className);
    }, 50);
  }
};

selectorButton.forEach((item, index) => {
  item.addEventListener("click", () => {
    toggleElem(selectorList[index], "_active", 300);
    item.classList.toggle("_active");
  });
});

selectorList.forEach((item, index) => {
  item.setAttribute("data-index", index);
});

selectorItems.forEach((item) => {
  item.addEventListener("click", () => {
    const parentIndex = item.parentElement.getAttribute("data-index");
    const childred = item.childNodes;
    selectorButton[parentIndex].classList.toggle("_active");
    selectorButton[parentIndex].textContent = childred[0].textContent.trim();
    toggleElem(selectorList[parentIndex], "_active", 300);
  });
});

const col = document.querySelectorAll(".main-page__col");
const charts = document.querySelectorAll(".chart");

charts.forEach((elem) => {
  elem.style.width =
    col.length !== 1
      ? col[0].clientWidth + "px"
      : window.innerWidth < 1331
      ? col[0].clientWidth - 20 + "px"
      : col[0].clientWidth + "px";
});
const chartsShowmore = document.querySelector(".chart__showmore");

let initValueToShowCharts = 1;

if (investorChart) {
  if (window.innerWidth < 768) {
    investorChart.forEach((elem) => (elem.style.display = "none"));
    for (let i = 0; i <= initValueToShowCharts; i++) {
      investorChart[i].style.display = "block";
    }
  }

  chartsShowmore?.addEventListener("click", () => {
    initValueToShowCharts += 2;
    const condition =
      initValueToShowCharts > investorChart.length
        ? investorChart.length
        : initValueToShowCharts;
    for (let i = 0; i <= condition; i++) {
      try {
        investorChart[i].style.display = "block";
      } catch (error) {}
    }
    if (initValueToShowCharts === investorChart.length - 1)
      chartsShowmore.style.display = "none";
  });
}
const downloadButton = document.getElementById("download");

function download() {
  var image = document
    .getElementById("trading-chart")
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  downloadButton.setAttribute("href", image);
}

downloadButton.addEventListener("click", () => download());
