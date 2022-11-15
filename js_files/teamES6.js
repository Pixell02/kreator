import {http} from "./http.js";
export class Team {
  constructor(firstTeamName, lastTeamName, logo) {
    this.firstTeamName = firstTeamName;
    this.lastTeamName = lastTeamName;
    this.logo = logo;
  }
  static displayTeams(teams) {
   teams.forEach((team) => {
    TeamUI.addTeamToMainContent(team);
   }); 
   
  }
  
}
export class Player {
  constructor(firstPlayerName, lastPlayerName, number, image, id) {
    this.id = JSON.parse(localStorage.getItem("chosenTeam"));
    this.firstPlayerName = firstPlayerName,
    this.lastPlayerName = lastPlayerName,
    this.number = number,
    this.image = image;
  }
}

export class TeamUI {
  static addTeamToMainContent(team) {
    const createDiv = document.createElement("div");
    createDiv.id = team.firstTeamName + "-" + team.lastTeamName;
    createDiv.className = "rectangle";
    createDiv.innerHTML = `
        <a href="sub_page/katalog.html" id="${team.firstTeamName}_${team.lastTeamName}" class="box">
          <div class="team-name" id="${team.firstTeamName}_${team.lastTeamName}">${team.firstTeamName} ${team.lastTeamName}</div>
          <div class="rectangle-content" id="${team.firstTeamName}_${team.lastTeamName}">
            
            <img src="${team.logo}" class="imageIcon" id=${team.firstTeamName}_${team.lastTeamName}>
          </div>
        </a>
    `;
    document.querySelector(".toChoose").appendChild(createDiv);
  }
  openModal(e) {
    document.querySelector("#team-modal").style.display = "flex";
  }
  closeModal(e) {
    document.querySelector(".modal").style.display = "none";
  }
  deleteItem(target) {
    if (target.className == "binIcon") {
      target.remove();
      document.querySelector(".uploaded-file").remove();
    }
  }

  uploadFile(e) {
    const uploadBtn = document.getElementById("input-file");
    uploadBtn.click();
    uploadBtn.onchange = (e) => {
      const reader = new FileReader();
      reader.readAsDataURL(uploadBtn.files[0]);
      reader.onload = () => {
        const img = new Image();
        if (document.querySelector(".uploaded-file")) {
          document.querySelector(".uploaded-file").remove();
          document.querySelector(".binIcon").remove();
        }
        img.src = reader.result;
        img.className = "uploaded-file";
        document.getElementById("holder").append(img);

        const icon = new Image();
        icon.src = "../icons/bin.png";
        icon.className = "binIcon";
        icon.width = 50;
        document.getElementById("holder").append(icon);
        e.preventDefault();
      };
    };
  }
  clearFields(e) {
    let inputPlace = document.querySelectorAll(".inputPlace");
    inputPlace.forEach((element, i) => {
      element.value = "";
    });
    if (document.querySelector(".uploaded-file")) {
      document.querySelector(".uploaded-file").remove();
      document.querySelector(".binIcon").remove();
    }
  }
  static getTeams(teams) {
    http.get('http://localhost:3000/teams')
      .then(teams => Team.displayTeams(teams))
      .catch(err => console.log(err));
  }
}


export class PlayerUI {
  addTeamToMainContent(player) {
    let players = StorePlayer.getPlayers();
    const createDiv = document.createElement("div");
    
    createDiv.className = "rectangle";
    createDiv.innerHTML = `
        <div class="box">
          <div class="team-name">${player.firstPlayerName} ${player.lastPlayerName}</div>
            <div class="rectangle-content">
                <img src="${player.image}" class="imageIcon" id=${player.firstPlayerName}-${player.lastPlayerName}>
            </div>
        </div>`;
    document.querySelector(".toChoose").appendChild(createDiv);
  }
  openModal(e) {
    document.getElementById("player-modal").style.display = "flex";
  }
  closeModal(e) {
    document.querySelector(".modal").style.display = "none";
  }
  deleteItem(target) {
    if (target.className == "binIcon") {
      target.remove();
      document.querySelector(".uploaded-file").remove();
    }
  }

  uploadFile(e) {
    const uploadBtn = document.getElementById("input-file");
    uploadBtn.click();
    uploadBtn.onchange = (e) => {
      const reader = new FileReader();
      reader.readAsDataURL(uploadBtn.files[0]);
      reader.onload = () => {
        const img = new Image();
        if (document.querySelector(".uploaded-file")) {
          document.querySelector(".uploaded-file").remove();
          document.querySelector(".binIcon").remove();
        }
        img.src = reader.result;
        img.className = "uploaded-file";
        document.getElementById("holder").append(img);

        const icon = new Image();
        icon.src = "../icons/bin.png";
        icon.className = "binIcon";
        icon.width = 50;
        document.getElementById("holder").append(icon);
        e.preventDefault();
      };
    };
  }
  clearFields(e) {
    let inputPlace = document.querySelectorAll(".inputPlace");
    inputPlace.forEach((element, i) => {
      element.value = "";
    });
    if (document.querySelector(".uploaded-file")) {
      document.querySelector(".uploaded-file").remove();
      document.querySelector(".binIcon").remove();
    }
  }
}

export class StorePlayer {
  static getPlayers() {
    let players;
    if (localStorage.getItem("players") == null) {
      players = new Array();
    } else {
      players = JSON.parse(localStorage.getItem("players"));
    }

    return players;
  }

  static displayPlayers() {
    const players = StorePlayer.getPlayers();
    console.log(players);
    if (players == null) {
      console.log("No players");
    } else {
      let checkId = JSON.parse(localStorage.getItem("chosenTeam"));
      console.log(checkId);
      players.forEach((player) => {
        const playerUi = new PlayerUI();
        if (player.id == checkId) {
          playerUi.addTeamToMainContent(player, checkId);
        }
      });
    }
  }

  static addPlayers(player) {
    const players = StorePlayer.getPlayers();
    players.push(player);
    localStorage.setItem("players", JSON.stringify(players));
  }
}

export class Opponent {
  constructor(firstOpponentName, secondOpponentName, logo) {
    this.id = JSON.parse(localStorage.getItem('chosenTeam'));
    this.firstOpponentName = firstOpponentName;
    this.secondOpponentName = secondOpponentName;
    this.logo = logo;
  }
}
export class OpponentUI {
  addOpponentToContent(opponent, checkId) {
    let opponents = StoreOpponent.getOpponent();
    const createDiv = document.createElement("div");
    createDiv.id = opponent.firstOpponentName + "-" + opponent.secondOpponentName;
    createDiv.className = 'rectangle';
    createDiv.innerHTML = `
    <div class="box">
          <div class="team-name">${opponent.firstOpponentName} ${opponent.secondOpponentName}</div>
            <div class="rectangle-content">
                <img src="${opponent.logo}" class="imageIcon" id=${opponent.firstOpponentName}-${opponent.secondOpponentName}>
            </div>
        </div>`;
        document.querySelector(".toChoose").appendChild(createDiv);
  }
  openModal(e) {
    document.getElementById("opponent-modal").style.display = "flex";
  }
  closeModal(e) {
    document.querySelector(".modal").style.display = "none";
  }
  deleteItem(target) {
    if (target.className == "binIcon") {
      target.remove();
      document.querySelector(".uploaded-file").remove();
    }
  }
  uploadFile(e) {
    const uploadBtn = document.getElementById("input-file");
    uploadBtn.click();
    uploadBtn.onchange = (e) => {
      const reader = new FileReader();
      reader.readAsDataURL(uploadBtn.files[0]);
      reader.onload = () => {
        const img = new Image();
        if (document.querySelector(".uploaded-file")) {
          document.querySelector(".uploaded-file").remove();
          document.querySelector(".binIcon").remove();
        }
        img.src = reader.result;
        img.className = "uploaded-file";
        document.getElementById("holder").append(img);

        const icon = new Image();
        icon.src = "/icons/bin.png";
        icon.className = "binIcon";
        icon.width = 50;
        document.getElementById("holder").append(icon);
        e.preventDefault();
      };
    };
  }
  clearField(e) {
    let inputPlace = document.querySelectorAll(".inputPlace");
    inputPlace.forEach((element, i) => {
      element.value = "";
    });
    if (document.querySelector(".uploaded-file")) {
      document.querySelector(".uploaded-file").remove();
      document.querySelector(".binIcon").remove();
    }
  }
}

export class StoreOpponent {
  static getOpponent(){
    let opponents;
    if(localStorage.getItem("opponents") == null) {
      opponents = new Array();
    } else {
      opponents = JSON.parse(localStorage.getItem('opponents'));
    }

    return opponents;
  }
  static displayOpponent(){
    const opponents = StoreOpponent.getOpponent();
    if(opponents == null) {
      console.log("no opponent");
    } else {
      let checkId = JSON.parse(localStorage.getItem('chosenTeam'));
      opponents.forEach((opponent) => {
        const opponentUi = new OpponentUI();
        if(opponent.id == checkId) {
          opponentUi.addOpponentToContent(opponent, checkId);
        }
      });
    }
  }
  static addOpponent(opponent) {
    const opponents = StoreOpponent.getOpponent();
    opponents.push(opponent);
    localStorage.setItem('opponents', JSON.stringify(opponents));
    
  }
}

export class Sponsor {
  constructor(sponsorName, sponsorNumber, logo) {
    this.id = JSON.parse(localStorage.getItem('chosenTeam'));
    this.sponsorName = sponsorName;
    this.sponsorNumber = sponsorNumber;
    this.logo = logo;
  }
}
export class SponsorUI {
  addOpponentToContent(sponsor, checkId) {
    let sponsors = StoreSponsor.getSponsor();
    const createDiv = document.createElement("div");
    createDiv.className = 'rectangle';
    createDiv.innerHTML = `
    <div class="box">
          <div class="team-name">${sponsor.sponsorName}</div>
            <div class="rectangle-content">
                <img src="${sponsor.logo}" class="imageIcon" >
            </div>
        </div>`;
        document.querySelector(".toChoose").appendChild(createDiv);
  }
  openModal(e) {
    document.getElementById("sponsor-modal").style.display = "flex";
  }
  closeModal(e) {
    document.querySelector(".modal").style.display = "none";
  }
  deleteItem(target) {
    if (target.className == "binIcon") {
      target.remove();
      document.querySelector(".uploaded-file").remove();
    }
  }
  uploadFile(e) {
    const uploadBtn = document.getElementById("input-file");
    uploadBtn.click();
    uploadBtn.onchange = (e) => {
      const reader = new FileReader();
      reader.readAsDataURL(uploadBtn.files[0]);
      reader.onload = () => {
        const img = new Image();
        if (document.querySelector(".uploaded-file")) {
          document.querySelector(".uploaded-file").remove();
          document.querySelector(".binIcon").remove();
        }
        img.src = reader.result;
        img.className = "uploaded-file";
        document.getElementById("holder").append(img);

        const icon = new Image();
        icon.src = "/icons/bin.png";
        icon.className = "binIcon";
        icon.width = 50;
        document.getElementById("holder").append(icon);
        e.preventDefault();
      };
    };
  }
  clearField(e) {
    let inputPlace = document.querySelectorAll(".inputPlace");
    inputPlace.forEach((element, i) => {
      element.value = "";
    });
    if (document.querySelector(".uploaded-file")) {
      document.querySelector(".uploaded-file").remove();
      document.querySelector(".binIcon").remove();
    }
  }
}

export class StoreSponsor {
  static getSponsor(){
    let sponsors;
    if(localStorage.getItem("sponsors") == null) {
      sponsors = new Array();
    } else {
      sponsors = JSON.parse(localStorage.getItem('sponsors'));
    }

    return sponsors;
  }
  static displaySponsor(){
    const sponsors = StoreSponsor.getSponsor();
    if(sponsors == null) {
      console.log("no sponsors");
    } else {
      let checkId = JSON.parse(localStorage.getItem('chosenTeam'));
      sponsors.forEach((sponsor) => {
        const sponsorUi = new SponsorUI();
        if(sponsor.id == checkId) {
          sponsorUi.addOpponentToContent(sponsor, checkId);
        }
      });
    }
  }
  static addSponsor(sponsor) {
    const sponsors = StoreSponsor.getSponsor();
    sponsors.push(sponsor);
    localStorage.setItem('sponsors', JSON.stringify(sponsors));
    
  }
}
