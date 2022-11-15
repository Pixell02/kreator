export function saveFile(){
const saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", function () {
  domtoimage
    .toBlob(document.getElementById("poster-edit"))
    .then(function (blob) {
      window.saveAs(blob, "my-node.png");
    });
});
}