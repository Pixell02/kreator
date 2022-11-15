import { Sponsor, SponsorUI, StoreSponsor } from "./teamES6.js";
import * as leftBar from './left-bar.js';
leftBar.leftBar.innerHTML = leftBar.leftBarContent;
window.addEventListener("DOMContentLoaded", StoreSponsor.displaySponsor);

const addBtn = document.querySelector(".add-Btn");
console.log(addBtn);
addBtn.addEventListener("click", (e) => {
  const sponsorUi = new SponsorUI();
  sponsorUi.openModal(e);

  // Uploading logo

  const uploadField = document.getElementById("upload");
  uploadField.addEventListener("click", (e) => {
    sponsorUi.uploadFile(e);
    e.preventDefault();
  });

  //Deleting logo

  document.getElementById("holder").addEventListener("click", (e) => {
    sponsorUi.deleteItem(e.target);
    e.preventDefault();
  });
  // Closing modal window

  const closeBtn = document.querySelector(".closeBtn");
  closeBtn.addEventListener("click", (e) => {
    sponsorUi.clearField(e);
    sponsorUi.closeModal(e);
    e.preventDefault();
  });
  // Saving opponent

  const saveSponsor = document.querySelector("#addSponsor");
  saveSponsor.addEventListener("click", (e) => {
    const sponsorName = document.querySelector("#sponsor-name").value,
      sponsorNumber = document.querySelector("#number").value,
      logo = document.querySelector(".uploaded-file").src;
    const sponsor = new Sponsor(sponsorName, sponsorNumber, logo);

    StoreSponsor.addSponsor(sponsor);
    sponsorUi.addSponsorToContent(sponsor);
    sponsorUi.clearField();
    sponsorUi.closeModal();
  });
});
