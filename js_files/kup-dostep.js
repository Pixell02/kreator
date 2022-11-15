import * as leftBar from './left-bar.js';
console.log(leftBar.leftBarContent);
console.log(leftBar.leftBar)
const range = document.querySelector("input[type='range'");

window.addEventListener("DOMContentLoaded", (e) => {
document.querySelector(".number-container").innerHTML = 0;
leftBar.leftBar.innerHTML = leftBar.leftBarContent;
});

range.addEventListener("mousemove", (e) => {
  document.querySelector(".number-container").innerHTML = range.value;
  document.querySelector(".price-container").innerHTML = range.value*50 + " zł";
})
    
