import { Opponent, OpponentUI, StoreOpponent } from "./teamES6.js";
import * as leftBar from './left-bar.js';
console.log(leftBar.leftBarContent);
console.log(leftBar.leftBar)
leftBar.leftBar.innerHTML = leftBar.leftBarContent;
window.addEventListener("DOMContentLoaded", StoreOpponent.displayOpponent);

const addBtn = document.querySelector(".add-Btn");
console.log(addBtn);
addBtn.addEventListener("click", (e) => {
  const opponentUi = new OpponentUI();
  opponentUi.openModal(e);

  // Uploading logo

  const uploadField = document.getElementById("upload");
  uploadField.addEventListener("click", (e) => {
    opponentUi.uploadFile(e);
    e.preventDefault();
  });

  //Deleting logo

  document.getElementById("holder").addEventListener("click", (e) => {
    opponentUi.deleteItem(e.target);
    e.preventDefault();
  });
  // Closing modal window

  const closeBtn = document.querySelector(".closeBtn");
  closeBtn.addEventListener("click", (e) => {
    opponentUi.clearField(e);
    opponentUi.closeModal(e);
    e.preventDefault();
  });
  // Saving opponent

  const saveOpponent = document.querySelector("#addOpponent");
  saveOpponent.addEventListener("click", (e) => {
    const firstOpponentName = document.querySelector("#first-club-name").value,
      secondOpponentName = document.querySelector("#second-club-name").value,
      logo = document.querySelector(".uploaded-file").src;
    const opponent = new Opponent(firstOpponentName, secondOpponentName, logo);

    StoreOpponent.addOpponent(opponent);
    opponentUi.addOpponentToContent(opponent);
    opponentUi.clearField();
    opponentUi.closeModal();
  });
});
