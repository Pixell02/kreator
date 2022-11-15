import { TeamUI } from "./teamES6.js";
import { http } from "./http.js";

document.addEventListener("DOMContentLoaded", TeamUI.getTeams)
export const input = document.querySelector("#asdasd");
document.querySelector(".down-container").addEventListener("click", (e) => {
    let chosenTeam = e.target.id;
    sessionStorage.setItem("chosenTeam", JSON.stringify(chosenTeam));
});

const addBtn = document.querySelector(".add-Btn");
addBtn.addEventListener("click", (e) => {
  const teamUi = new TeamUI();
  teamUi.openModal(e);

  // Uploading logo

  const uploadField = document.querySelector("#upload");
  uploadField.addEventListener("click", (e) => {
    teamUi.uploadFile(e);
    e.preventDefault();
  });

  // Deleting logo

  document.getElementById("holder").addEventListener("click", (e) => {
    teamUi.deleteItem(e.target);
    e.preventDefault();
  });

  // Closing modal window

  const closeBtn = document.querySelector(".closeBtn");
  closeBtn.addEventListener("click", (e) => {
    teamUi.clearFields(e);
    teamUi.closeModal(e);
    e.preventDefault();
  });

  // Saving team

  const saveTeam = document.querySelector("#addTeam");
  saveTeam.addEventListener("click", (e) => {
    const firstTeamName = document.querySelector("#first-club-name").value;
    const lastTeamName = document.querySelector("#second-club-name").value;
    const logo = document.querySelector(".uploaded-file").src;

    const data = {
      firstTeamName,
      lastTeamName,
      logo
    }

    // Create team 
    console.log(data);
    http.post('http://localhost:3000/teams', data)
     .then(data => {
      console.log(data)
     })
     .catch(err => console.log(err));
    
  });
});
