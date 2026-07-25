let progressScroll = () => {
  let docElem = document.documentElement,
    docBody = document.body,
    scrollTop = docElem["scrollTop"] || docBody["scrollTop"],
    scrollBottom =
      (docElem["scrollHeight"] || docBody["scrollHeight"]) - window.innerHeight,
    scrollPercent = (scrollTop / scrollBottom) * 100 + "%";

  document
    .getElementById("progress-bar")
    .style.setProperty("--scrollAmount", scrollPercent);

  document
    .getElementById("progress-bar")
    .setAttribute('aria-valuenow', Math.round(scrollTop / scrollBottom * 100));
};

document.addEventListener("scroll", progressScroll);
