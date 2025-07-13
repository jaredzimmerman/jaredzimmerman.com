let currentTab = "#about";

function switchWidth() {
  const windowWidth = $(window).width();
  const $current = $(currentTab);
  if (windowWidth <= 767) {
    $(".tabContents .tabData").hide();
    $(".tabContents .data .heading").removeClass("active");
    $("#tabs .data").show();
    $current.find(".heading").addClass("active");
    $current.find(".tabData").show();
  } else {
    $("#tabs .data").hide();
    $(".Tlinks").closest(".tablinks").find("li").removeClass("active").attr("aria-selected", "false");
    const sid = $current.attr("sid");
    $("#" + sid).addClass("active").attr("aria-selected", "true");
    $("#tabs " + currentTab).show();
  }
}

$(document).on("click", ".data .heading", function (e) {
  e.preventDefault();
  if (!$(this).hasClass("active")) {
    currentTab = "#" + $(this).closest(".data").attr("id");
    const $current = $(currentTab);
    $(".tabContents .tabData").hide();
    $(".tabContents .data .heading").removeClass("active");
    $current.find(".heading").addClass("active");
    $current.find(".tabData").fadeIn();
  }
});

$(document).on("click", ".Tlinks", function () {
  const $linksContainer = $(this).closest(".tablinks");
  $linksContainer.find("li").removeClass("active").attr("aria-selected", "false");
  $(this).addClass("active").attr("aria-selected", "true");
  const tabID = $(this).attr("id");
  $("#tabs .data").hide();
  const $section = $('section[sid="' + tabID + '"]');
  $section.fadeIn();
  currentTab = "#" + $section.attr("id");
  $(".tabContents .tabData").fadeIn();
});

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

$(document).ready(function () {
  switchWidth();
  $(".fade").fadeIn("slow");
  const link_location = window.location.hash;
  if (link_location !== "") {
    currentTab = link_location;
    $('a[href="' + currentTab + '"]').trigger("click");
  }
  $(window).on("resize", debounce(switchWidth, 100));
});

