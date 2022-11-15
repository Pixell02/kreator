import { saveFile } from "./save-file.js";
import { Edit, posterUI } from "./creator-classes.js";
import * as leftBar from './left-bar.js';
console.log(leftBar.leftBarContent);
console.log(leftBar.leftBar)
leftBar.leftBar.innerHTML = leftBar.leftBarContent;
window.addEventListener("DOMContentLoaded", posterUI.loadImagesToSelect);

let pickFont = "montserrat";
const WIDTH = 700;
const canvas = document.getElementById("poster-edit");
canvas.width = WIDTH;
canvas.height = WIDTH;
const fabricCanvas = new fabric.Canvas(canvas);
document.getElementsByClassName("canvas-container")[0].style.width = "700px";
document.getElementsByClassName("canvas-container")[0].style.height = "700px";
document.getElementsByClassName("upper-canvas")[0].width = WIDTH;
document.getElementsByClassName("upper-canvas")[0].height = WIDTH;
document.getElementsByClassName("upper-canvas")[0].style.width = "700px";
document.getElementsByClassName("upper-canvas")[0].style.height = "700px";
const ctx = canvas.getContext("2d");
createBackgroundImage(fabricCanvas);

function createBackgroundImage(fabricCanvas) {
  const img = new Image();
  img.src = "../plakat/poster.png";
  img.width = WIDTH;
  img.height = WIDTH;

  let ratio = WIDTH / img.width;

  canvas.height = img.height * ratio;
  canvas.width = WIDTH;
  fabricCanvas.width = WIDTH;
  fabricCanvas.height = img.height * ratio;
  img.onload = () => {
    const newImg = new fabric.Image(img);
    newImg.scaleToWidth(WIDTH);
    fabricCanvas.setBackgroundImage(
      newImg,
      fabricCanvas.renderAll.bind(fabricCanvas)
    );
    fabricCanvas.selection = false;
    fabricCanvas.renderAll();
  };
}

// Writing name of your team

const yourTeamInput = document.getElementById("team");

yourTeamInput.addEventListener("keyup", (e) => {
  posterUI.writeYourTeamName(e, yourTeamInput, fabricCanvas, WIDTH);
});

// Setting color of your team text

const getColorInput = document.querySelector("#first-text-color");

getColorInput.addEventListener("change", (e) => {
  Edit.getFirstColor(e, yourTeamInput, fabricCanvas);
});

// Setting font of your team text

const getFonts = document.querySelector("#font1");
getFonts.onchange = (e) => {
  Edit.getFont(e, yourTeamInput, fabricCanvas);
};
// Setting size of stroke on text

const getStrokeSize = document.querySelector("#strokeSize1");
getStrokeSize.addEventListener("change", (e) => {
  Edit.setStroke(e, yourTeamInput, fabricCanvas);
});

// Setting color of stroke on text

const getStrokeColor = document.querySelector("#strokeColor1");
getStrokeColor.addEventListener("change", (e) => {
  Edit.setColorStroke(e, yourTeamInput, fabricCanvas);
});

// Setting color of shadow on text

const getShadowColor = document.querySelector("#ShadowColor1");
getShadowColor.addEventListener("change", (e) => {
  Edit.setColorShadow(e, yourTeamInput, fabricCanvas);
});

//
// Writing city, date and hour
// 



const cityInput = document.getElementById("city");

cityInput.addEventListener("keyup", (e) => {
  posterUI.writeCity(e, cityInput, fabricCanvas, WIDTH);
});

// Setting color of your team text

const getCityColorInput = document.querySelector("#city-color");

getCityColorInput.addEventListener("change", (e) => {
  Edit.getSecondColor(e, cityInput, fabricCanvas);
});

// Setting font of your team text

const getSecondFonts = document.querySelector("#font2");
getSecondFonts.onchange = (e) => {
  Edit.getSecondFont(e, cityInput, fabricCanvas);
};
// Setting size of stroke on text

const getSecondStrokeSize = document.querySelector("#StrokeSize2");
getSecondStrokeSize.addEventListener("change", (e) => {
  Edit.setSecondStroke(e, cityInput, fabricCanvas);
});

// Setting color of stroke on text

const getSecondStrokeColor = document.querySelector("#StrokeColor2");
getSecondStrokeColor.addEventListener("change", (e) => {
  Edit.setSecondColorStroke(e, cityInput, fabricCanvas);
});

// Setting color of shadow on text

const getSecondShadowColor = document.querySelector("#ShadowColor2");
getSecondShadowColor.addEventListener("change", (e) => {
  Edit.setSecondColorShadow(e, cityInput, fabricCanvas);
});

// 
// Writing opponents
//
const opponentInput = document.querySelector("#opponent");

opponentInput.addEventListener("keyup", (e) => {
  posterUI.writeOpponentTeamName(e, opponentInput, fabricCanvas, WIDTH);
}); 

// Setting color of opponent text

const opponentColor = document.querySelector("#opponent-team-color");

opponentColor.addEventListener("change", (e) => {
  posterUI.writeOpponentTeamName(e, opponentInput, fabricCanvas);
});

// Setting font of text

const getThirdFonts = document.querySelector("#font3");
getThirdFonts.onchange = (e) => {
  Edit.getThirdFont(e, opponentInput, fabricCanvas);
};

// Setting size of stroke on text

const getThirdStrokeSize = document.querySelector("#StrokeSize3");
getThirdStrokeSize.addEventListener("change", (e) => {
  Edit.setThirdStroke(e, opponentInput, fabricCanvas);
});

// Setting color of stroke on text

const getThirdStrokeColor = document.querySelector("#StrokeColor3");
getThirdStrokeColor.addEventListener("change", (e) => {
  Edit.setThirdColorStroke(e, opponentInput, fabricCanvas);
});

// Setting color of shadow on text

const getThirdShadowColor = document.querySelector("#ShadowColor3");
getThirdShadowColor.addEventListener("change", (e) => {
  Edit.setThirdColorShadow(e, opponentInput, fabricCanvas);
});


// More options

let showFirstOption = false;
const moreOptions1 = document.querySelector(".more-options1");
moreOptions1.addEventListener("click", (e) => {
  if (document.querySelector("#your-team-color").style.display == "none") {
    document.querySelector("#your-team-color").style.display = "initial";
    showFirstOption = true;
    console.log(showFirstOption);
  } else {
    document.querySelector("#your-team-color").style.display = "none";
    showFirstOption = false;
  }
});
if (showFirstOption == true) {
  Edit.getFirstColor();
}
const moreOptions2 = document.querySelector(".more-options2");
moreOptions2.addEventListener("click", (e) => {
  if (document.querySelector("#city-text-color").style.display == "none") {
    document.querySelector("#city-text-color").style.display = "initial";
  } else {
    document.querySelector("#city-text-color").style.display = "none";
  }
});

const moreOptions3 = document.querySelector(".more-options3");
moreOptions3.addEventListener("click", (e) => {
  if (document.querySelector("#opponent-team-text").style.display == "none") {
    document.querySelector("#opponent-team-text").style.display = "initial";
  } else {
    document.querySelector("#opponent-team-text").style.display = "none";
  }
});
const opponentOption = document.querySelector("#opponent-team");

opponentOption.addEventListener("change", (e) => {
  let opponentLogo = e.target.value;
  console.log(opponentLogo);
  Edit.addOpponentLogo(opponentLogo, fabricCanvas);
});

const yourPlayerImage = document.querySelector("#your-player");
yourPlayerImage.addEventListener("change", (e) => {
  const playerImageSrc = yourPlayerImage.value;
  Edit.addYourPlayerImage(playerImageSrc, fabricCanvas);
});
saveFile();
