var currentTab = "#about";

function switchWidth() {
  var windowWidth = $(window).width();
  if (windowWidth <= 767) {
    $(".tabContents .tabData").hide();
    $(".tabContents .data .heading").removeClass("active");
    $("#tabs .data").show();
    $(currentTab).find(".heading").addClass("active");
    $(currentTab).find(".tabData").show();
  } else {
    $("#tabs .data").hide();
    $(".Tlinks").closest(".tablinks").find("li").removeClass("active");
    var sid = $(currentTab).attr("sid");
    $("#" + sid).addClass("active");
    $("#tabs " + currentTab).show();
  }
}

$(document).on("click", ".contactme", function () {
  $("#l3").click();
});

$(document).on("click", ".data .heading", function (e) {
  e.preventDefault();
  if (!$(this).hasClass("active")) {
    currentTab = "#" + $(this).closest(".data").attr("id");
    $(".tabContents .tabData").hide();
    $(".tabContents .data .heading").removeClass("active");
    $(this).closest(".data").find(".heading").addClass("active");
    $(this).closest(".data").find(".tabData").fadeIn();
  }
});

$(document).on("click", ".Tlinks", function () {
  $(this).closest(".tablinks").find("li").removeClass("active");
  $(this).addClass("active");
  var tabID = $(this).attr("id");
  $("#tabs .data").hide();
  $('div[sid="' + tabID + '"]').fadeIn();
  currentTab = "#" + $('div[sid="' + tabID + '"]').attr("id");
  $(".tabContents .tabData").fadeIn();
});

$(document).ready(function () {
  switchWidth();
  $(".fade").fadeIn("slow");
  var link_location = window.location.hash;
  if (link_location !== "") {
    currentTab = link_location;
    $('a[href="' + currentTab + '"]').click();
  }
  $(window).resize(switchWidth);
});

