let name
window.onload = function() {
  let image = document.getElementById("image")
  let height = image.naturalHeight
  let width = image.naturalWidth

  let body = document.getElementsByTagName("body")[0]
  body.style.height = height + "px"
  body.style.width = width + "px"

  let certificateContainer = document.getElementById("certificate")
  certificateContainer.style.height = height + "px"
  certificateContainer.style.width = width + "px"

  name = "Megharth Lakahataria"
  let nameContainer = document.getElementById("name")
  nameContainer.innerText = name
  nameContainer.style.top = (height / 2) + 200 +  "px"
  nameContainer.style.width = width + "px"


  let id = "1203921oxx"
  let idContainer = document.getElementById("id")
  idContainer.innerText = id
  idContainer.style.top = height/15 + "px"
  idContainer.style.width = width + "px"


  /*let waterMarkContainer = document.getElementById("watermark")
  console.log(waterMarkContainer)
  waterMarkContainer.innerText = name
  waterMarkContainer.style.top = ((height/2) - 100) + "px"
  waterMarkContainer.style.width = width + "px"*/

  toPdf()
}

// PDF CONVERSION

let toPdf = async function () {

  html2canvas(document.getElementById("certificate"), {
    scale: 1
  }).then(function(canvas) {
    let a = document.createElement('a');
    a.href = canvas.toDataURL("image/png");
    a.download = name + '.png';
    a.click();
  });
}

