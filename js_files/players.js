import { PlayerUI, Player, StorePlayer} from "./teamES6.js";
import * as leftBar from './left-bar.js';
console.log(leftBar.leftBarContent);
console.log(leftBar.leftBar);

leftBar.leftBar.innerHTML = leftBar.leftBarContent;
window.addEventListener("DOMContentLoaded", StorePlayer.displayPlayers);

const addBtn = document.querySelector(".add-Btn");
addBtn.addEventListener("click", (e) => {
  const playerUi = new PlayerUI();
  playerUi.openModal(e);

  // Uploading logo

  const uploadField = document.getElementById("upload");
  uploadField.addEventListener("click", (e) => {
    playerUi.uploadFile(e);
    e.preventDefault();
  });

  // Deleting logo

  document.getElementById("holder").addEventListener("click", (e) => {
    playerUi.deleteItem(e.target);
    e.preventDefault();
  });

  // Closing modal window

  const closeBtn = document.querySelector(".closeBtn");
  closeBtn.addEventListener("click", (e) => {
    playerUi.clearFields(e);
    playerUi.closeModal(e);
    e.preventDefault();
  });

  // Saving team

  const saveTeam = document.querySelector("#addPlayer");
  saveTeam.addEventListener("click", (e) => {
    const firstPlayerName = document.querySelector("#name").value,
      lastPlayerName = document.querySelector("#surName").value,
      number = document.querySelector("#number").value,
      image = document.querySelector(".uploaded-file").src;
    console.log(image);
    const player = new Player(firstPlayerName, lastPlayerName, number, image);

    StorePlayer.addPlayers(player);
    playerUi.addTeamToMainContent(player);
    playerUi.clearFields();
    playerUi.closeModal();
  });
});
