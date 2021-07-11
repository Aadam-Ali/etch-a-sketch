/*
 * Etch-A-Sketch application
 *
 * Written by Aadam Ali on 31.12.2020
 */

let type = null;
let i = 0;

// Initial Loading Size
initialise(16, "startup");

$("#gridsize").click(() => {
  initialise();
});
$("#colorful").click(() => {
  type = "colorful";
});
$("#black").click(() => {
  type = "black";
});
$("#darken").click(() => {
  type = "darken";
});
$("#reset").click(() => initialise(16, "startup"));

function initialise(size, status) {
  if (status != "startup") {
    size = prompt("Enter Grid Size:");
  }
  while (size > 64 || size < 4) {
    size = prompt("Size Out Of Range 4-64, Try Again:");
  }
  container.style.setProperty("--grid-cols", size);
  container.style.setProperty("--grid-rows", size);
  createDivs(size);
  type = "colorful";
  changeColor();
}

function createDivs(size) {
  $("#container").empty();
  for (let i = 0; i < size * size; i++) {
    $("#container").append("<div class='grid-div'></div>");
  }
}

function random() {
  let num = Math.floor(Math.random() * 255);
  return num;
}

function randomColor() {
  return "rgb(" + random() + "," + random() + "," + random() + ")";
}

function changeColor() {
  $(".grid-div").on("mouseover touchend", function () {
    if (type == "colorful") {
      $(this).css("background-color", randomColor());
    } else if (type == "black") {
      $(this).css("background-color", "black");
    } else if (type == "darken") {
      let bgColor = $(this).css("background-color");
      let colorInts = bgColor.replace(/[^0-9,]/g, "");
      let splitColors = colorInts.split(",");
      for (let i = 0; i < splitColors.length; i++) {
        splitColors[i] -= 25.5;
      }
      $(this).css("background-color", `rgb(${splitColors.join(",")})`);
    }
  });
}
