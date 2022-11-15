export class poster {
  constructor(
    yourTeamName,
    yourTeamLogo,
    yourTeamPlayer,
    opponentTeamName,
    opponentTeamLogo
  ) {
    this.yourTeamName = yourTeamName;
    this.yourTeamLogo = yourTeamLogo;
    this.yourTeamPlayer = yourTeamPlayer;
    this.opponentTeamName = opponentTeamName;
    this.opponentTeamLogo = opponentTeamLogo;
  }
}
export class posterUI {
  static writeYourTeamName(e, yourTeamInput, fabricCanvas, WIDTH) {
    WIDTH = 700;
    const yourTeamValue = yourTeamInput;
    let objects = fabricCanvas._objects;
    objects.forEach((element, i) => {
      if (fabricCanvas.item(i).className == "yourTeam") {
        fabricCanvas.remove(fabricCanvas.item(i));
        fabricCanvas.renderAll();
      }
    });

    const shadow = new fabric.Shadow({
      color: Edit.setColorShadow(e, yourTeamInput, fabricCanvas),
      blur: 20,
    });

    const text = new fabric.Text(yourTeamValue.value, {
      fontFamily: Edit.getFont(e, yourTeamInput, fabricCanvas),
      fill: Edit.getFirstColor(e, yourTeamInput, fabricCanvas),
      shadow: shadow,
      textAlign: "center",
      top: 250,
      className: "yourTeam",
      selectable: false,
      width: 300,
      stroke: Edit.setColorStroke(e, yourTeamInput, fabricCanvas),
      strokeWidth: Number(Edit.setStroke(e, yourTeamInput, fabricCanvas)),
    });
    console.log(text);
    text.left = WIDTH / 2 - text.width / 2;
    setTimeout(add, 5);
    function add() {
      fabricCanvas.add(text);
      fabricCanvas.renderAll();
    }
  }
  static writeCity(e, cityInput, fabricCanvas, WIDTH) {
    WIDTH = 700;
    const cityInputValue = cityInput;
    let objects = fabricCanvas._objects;
    fabricCanvas._objects.forEach((element, i) => {
      console.log(fabricCanvas.item(i).className);
      if (fabricCanvas.item(i).className == "city") {
        fabricCanvas.remove(fabricCanvas.item(i));
      }
    });

    const shadow = new fabric.Shadow({
      color: Edit.setSecondColorShadow(e, cityInput, fabricCanvas),
      blur: 20,
    });

    const text = new fabric.Text(cityInputValue.value, {
      fontFamily: Edit.getSecondFont(e, cityInput, fabricCanvas),
      fill: Edit.getSecondColor(e, cityInput, fabricCanvas),
      fontSize: 20,
      shadow: shadow,
      textAlign: "center",
      top: 300,
      selectable: false,
      stroke: Edit.setSecondColorStroke(e, cityInput, fabricCanvas),
      strokeWidth: Number(Edit.setSecondStroke(e, cityInput, fabricCanvas))
    });
    text.width = 300;
    text.left = WIDTH / 2 - text.width / 2;
    text.className = "city";

    fabricCanvas.add(text);
    fabricCanvas.renderAll();
  }
  static writeOpponentTeamName( e,opponentInput ,fabricCanvas, WIDTH) {
    WIDTH = 700;
    let objects = fabricCanvas._objects;

    fabricCanvas._objects.forEach((element, i) => {
      if (fabricCanvas.item(i).className == "opponent") {
        fabricCanvas.remove(fabricCanvas.item(i));
        fabricCanvas.renderAll();
      }
    });
    const shadow = new fabric.Shadow({
      color: Edit.setThirdColorShadow(e, opponentInput, fabricCanvas),
      blur: 20,
    });
    const text = new fabric.Text(opponentInput.value, {
      fontFamily: Edit.getThirdFont(e, opponentInput, fabricCanvas),
      fill: Edit.getThirdColor(e, opponentInput, fabricCanvas),
      shadow: shadow,
      textAlign: "center",
      top: 325,
      selectable: false,
      stroke: Edit.setThirdColorStroke(e, opponentInput, fabricCanvas),
      strokeWidth: Number(Edit.setThirdStroke(e, opponentInput, fabricCanvas))
    });
    console.log(text)
    text.width = 300;
    text.left = WIDTH / 2 - text.width / 2;
    text.className = "opponent";
    setTimeout(adding, 5);
    function adding(){
      fabricCanvas.add(text);
    }
    fabricCanvas.renderAll();
  }

  static uploadYourLogo() {}
  static loadImagesToSelect() {
    // Loading players of selected team
    let pickFont = "montserrat";
    const playerImage = document.querySelector("#your-player");
    const blankOption = document.createElement("option");
    blankOption.textContent = "";
    playerImage.append(blankOption);
    const getPlayers = JSON.parse(localStorage.getItem("players"));
    const checkId = JSON.parse(localStorage.getItem("chosenTeam"));
    getPlayers.forEach((player) => {
      const option = document.createElement("option");
      if (player.id == checkId) {
        option.innerHTML = `${player.number} ${player.firstPlayerName} ${player.lastPlayerName}`;
        playerImage.append(option);
      }
    });

    // Loading opponents of selected team

    const opponents = document.querySelector("#opponent-team");
    const secondBlankOption = document.createElement("option");
    secondBlankOption.textContent = "";
    opponents.append(secondBlankOption);
    const getOpponent = JSON.parse(localStorage.getItem("opponents"));
    getOpponent.forEach((opponent) => {
      const option = document.createElement("option");
      option.innerHTML = `${opponent.firstOpponentName} ${opponent.secondOpponentName}`;
      opponents.append(option);
    });
  }
  changeYourTeamNameColor() {}
}

export class Edit {
  static getFirstColor(e, yourTeamInput, fabricCanvas) {
    const getColor = document.querySelector("#first-text-color").value;
    let objects = fabricCanvas._objects;
    objects.forEach((object, i) => {
      if (fabricCanvas.item(i).className == "yourTeam") {
        fabricCanvas.item(i).set("fill", getColor);
        console.log(fabricCanvas.item(i));
        posterUI.writeYourTeamName(e, yourTeamInput, fabricCanvas);
      }
    });
    return getColor;
  }
  static getFont(e, yourTeamInput, fabricCanvas) {
    const getFont = document.querySelector("#font1").value;
    let objects = fabricCanvas._objects;
    objects.forEach((object, i) => {
      if (fabricCanvas.item(i).className == "yourTeam")
        loadAndUse(getFont, fabricCanvas, i);
    });

    return getFont;

    function loadAndUse(getFont, fabricCanvas, i) {
      const myFont = new FontFaceObserver(getFont);
      myFont
        .load()
        .then(() => {
          fabricCanvas.item(i).set("fontFamily", getFont);
          fabricCanvas.renderAll();
        })
        .catch((e) => console.log(e));
    }
  }
  static setStroke(e, yourTeamInput, fabricCanvas) {
    let getStrokeSize = document.querySelector("#strokeSize1").value;
    const objects = fabricCanvas._objects;
    objects.forEach((obj, i) => {
      if (fabricCanvas.item(i).className == "yourTeam") {
        fabricCanvas.item(i).set("StrokeWidth", getStrokeSize);
        posterUI.writeYourTeamName(e, yourTeamInput, fabricCanvas);
      }
    });
    return getStrokeSize;
  }
  static setColorStroke(e, yourTeamInput, fabricCanvas) {
    const getStrokeColor = document.querySelector("#strokeColor1").value;
    const objects = fabricCanvas._objects;
    objects.forEach((obj, i) => {
      if (fabricCanvas.item(i).className == "yourTeam") {
        fabricCanvas.item(i).set("stroke", getStrokeColor);
        posterUI.writeYourTeamName(e, yourTeamInput, fabricCanvas);
      }
    });

    return getStrokeColor;
  }
  static setColorShadow(e, yourTeamInput, fabricCanvas) {
    const getShadowColor = document.querySelector("#ShadowColor1").value;
    const objects = fabricCanvas._objects;
    objects.forEach((obj, i) => {
      if (fabricCanvas.item(i).className == "yourTeam") {
        fabricCanvas.item(i).set("shadow", getShadowColor);
        posterUI.writeYourTeamName(e, yourTeamInput, fabricCanvas);
      }
    });

    return getShadowColor;
  }
  static getSecondColor(e, cityInput, fabricCanvas) {
    const getColor = document.querySelector("#city-color").value;
    console.log(getColor);
    let objects = fabricCanvas._objects;
    objects.forEach((object, i) => {
      if (fabricCanvas.item(i).className == "city") {
        fabricCanvas.item(i).set("fill", getColor);
        posterUI.writeCity(e, cityInput, fabricCanvas);
      }
    });
    return getColor;
  }
  static getSecondFont(e, cityInput, fabricCanvas) {
    const getFont = document.querySelector("#font2").value;
    let objects = fabricCanvas._objects;
    objects.forEach((object, i) => {
      if (fabricCanvas.item(i).className == "city")
        loadAndUse(getFont, fabricCanvas, i);
    });

    return getFont;

    function loadAndUse(getFont, fabricCanvas, i) {
      const myFont = new FontFaceObserver(getFont);
      myFont
        .load()
        .then(() => {
          if (fabricCanvas.item(i).className == "city") {
            fabricCanvas.item(i).set("fontFamily", getFont);
            fabricCanvas.renderAll();
          }
        })
        .catch((e) => console.log(e));
    }
  }
  static setSecondStroke(e, cityInput, fabricCanvas) {
    const getStrokeSize = document.querySelector("#StrokeSize2").value;
    console.log(getStrokeSize);
    const objects = fabricCanvas._objects;
    objects.forEach((obj, i) => {
      if (fabricCanvas.item(i).className == "city") {
        fabricCanvas.item(i).set("strokeWidth", getStrokeSize);
        posterUI.writeCity(e, cityInput, fabricCanvas);
      }
    });
    return getStrokeSize;
  }
  static setSecondColorStroke(e, cityInput, fabricCanvas) {
    const getStrokeColor = document.querySelector("#StrokeColor2").value;
    const objects = fabricCanvas._objects;
    objects.forEach((obj, i) => {
      if (fabricCanvas.item(i).className == "city") {
        fabricCanvas.item(i).set("stroke", getStrokeColor);
        posterUI.writeCity(e, cityInput, fabricCanvas);
      }
    });

    return getStrokeColor;
  }
  static setSecondColorShadow(e, cityInput, fabricCanvas) {
    const getShadowColor = document.querySelector("#ShadowColor2").value;
    const objects = fabricCanvas._objects;
    objects.forEach((obj, i) => {
      if (fabricCanvas.item(i).className == "city") {
        fabricCanvas.item(i).set("shadow", getShadowColor);
        posterUI.writeCity(e, cityInput, fabricCanvas);
      }
    });

    return getShadowColor;
  }

  // Third

  static getThirdColor(e, opponentInput, fabricCanvas) {
    const getColor = document.querySelector("#opponent-team-color").value;
    let objects = fabricCanvas._objects;
    objects.forEach((object, i) => {
      if (fabricCanvas.item(i).className == "opponent") {
        fabricCanvas.item(i).set("fill", getColor);
        posterUI.writeOpponentTeamName(e, opponentInput, fabricCanvas);
      }
    });
    return getColor;
  }
  static getThirdFont(e, opponentInput, fabricCanvas) {
    const getFont = document.querySelector("#font3").value;
    let objects = fabricCanvas._objects;
    objects.forEach((object, i) => {
      if (fabricCanvas.item(i).className == "opponent")
        loadAndUse(getFont, fabricCanvas, i);
    });

    return getFont;

    function loadAndUse(getFont, fabricCanvas, i) {
      const myFont = new FontFaceObserver(getFont);
      myFont
        .load()
        .then(() => {
          if (fabricCanvas.item(i).className == "opponent") {
            fabricCanvas.item(i).set("fontFamily", getFont);
            fabricCanvas.renderAll();
          }
        })
        .catch((e) => console.log(e));
    }
  }
  static setThirdStroke(e, opponentInput, fabricCanvas) {
    const getStrokeSize = document.querySelector("#StrokeSize3").value;
    
    const objects = fabricCanvas._objects;
    objects.forEach((obj, i) => {
      if (fabricCanvas.item(i).className == "opponent") {
        fabricCanvas.item(i).set("StrokeWidth", getStrokeSize);
        posterUI.writeOpponentTeamName(e, opponentInput, fabricCanvas);
      }
    });
    return getStrokeSize;
  }
  static setThirdColorStroke(e, opponentInput, fabricCanvas) {
    const getStrokeColor = document.querySelector("#StrokeColor3").value;
    const objects = fabricCanvas._objects;
    objects.forEach((obj, i) => {
      if (fabricCanvas.item(i).className == "opponent") {
        fabricCanvas.item(i).set("stroke", getStrokeColor);
        posterUI.writeOpponentTeamName(e, opponentInput, fabricCanvas);
      }
    });

    return getStrokeColor;
  }
  static setThirdColorShadow(e, opponentInput, fabricCanvas) {
    const getShadowColor = document.querySelector("#ShadowColor3").value;
    const objects = fabricCanvas._objects;
    objects.forEach((obj, i) => {
      if (fabricCanvas.item(i).className == "opponent") {
        fabricCanvas.item(i).set("shadow", getShadowColor);
        posterUI.writeOpponentTeamName(e, opponentInput, fabricCanvas);
      }
    });

    return getShadowColor;
  }
  static addOpponentLogo(opponentLogo, fabricCanvas) {
    fabricCanvas._objects.forEach((images, i) => {
      if (fabricCanvas.item(i).className == "opponent-logo") {
        fabricCanvas.remove(fabricCanvas.item(i));
      }
    });
    const getLogo = JSON.parse(localStorage.getItem("opponents"));
    console.log(getLogo[0].id);
    getLogo.forEach((logo, i) => {
      if (
        logo.firstOpponentName + " " + logo.secondOpponentName ==
        opponentLogo
      ) {
        console.log(logo.id);
        const opponentImageLogo = new Image();
        opponentImageLogo.src = logo.logo;
        opponentImageLogo.onload = () => {
          const fabricOpponentLogo = new fabric.Image(opponentImageLogo, {
            left: fabricCanvas.width / 2,
            top: 450,
            originX: "center",
            originY: "center",
            selectable: false,
            className: "opponent-logo",
          });
          fabricOpponentLogo.scaleToWidth(150);
          if (fabricOpponentLogo.height > 350) {
            fabricOpponentLogo.scaleToHeight(100);
          }
          console.log(fabricOpponentLogo);
          fabricCanvas.add(fabricOpponentLogo);

          fabricCanvas.renderAll();
        };
      }
    });
  }
  static addYourPlayerImage(playerImageSrc, fabricCanvas) {
    console.log(playerImageSrc);
    fabricCanvas._objects.forEach((images, i) => {
      if (fabricCanvas.item(i).className == "your-playerImage") {
        fabricCanvas.remove(fabricCanvas.item(i));
      }
    });
    const getPlayers = JSON.parse(localStorage.getItem("players"));
    getPlayers.forEach((players, i) => {
      if (
        players.number +
          " " +
          players.firstPlayerName +
          " " +
          players.lastPlayerName ==
        playerImageSrc
      ) {
        let playerImage = new Image();
        playerImage.src = players.image;
        playerImage.onload = () => {
          const fabricPlayerImage = new fabric.Image(playerImage, {
            left: 525,
            top: 500,
            originX: "center",
            originY: "center",
            selectable: false,
            className: "your-playerImage",
          });
          console.log(fabricPlayerImage);
          fabricPlayerImage.scaleToWidth(150);
          if (fabricPlayerImage.height > 250) {
            fabricPlayerImage.scaleToHeight(150);
          }
          fabricCanvas.add(fabricPlayerImage);
          fabricCanvas.renderAll();
        };
      }
    });
  }
}
