let name, id, eventName
let image = document.getElementById("image")
window.onload = function() {
  let url = document.location.href,
    params = url.split('?')[1].split('&'),
    data = {}, tmp

  for (let i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split('=');
    data[tmp[0]] = tmp[1];
  }

  name = data.name
  name = name.split("%20").join(" ")
  id = data.code
  eventName = data.eventName
  eventName = eventName.split("%20").join(" ")

  let height = image.naturalHeight
  let width = image.naturalWidth

  let body = document.getElementsByTagName("body")[0]
  body.style.height = height + "px"
  body.style.width = width + "px"

  let certificateContainer = document.getElementById("certificate")
  certificateContainer.style.height = height + "px"
  certificateContainer.style.width = width + "px"

  let nameContainer = document.getElementById("name")
  nameContainer.innerText = name
  nameContainer.style.top = (height / 2) - 140 +  "px"
  nameContainer.style.width = width + "px"


  let idContainer = document.getElementById("id")
  idContainer.innerText = id
  idContainer.style.top = height/25 +  "px"
  idContainer.style.width = width + "px"

  let eventContainer = document.getElementById("event")
  eventContainer.innerText = eventName
  eventContainer.style.top = (height / 2) + 210 +  "px"
  eventContainer.style.width = width + "px"
  toPdf()

}

// PDF CONVERSION

let toPdf = async function () {

  html2canvas(document.getElementById("certificate"), {
    scale: 1
  }).then(function(canvas) {
    let a = document.createElement('a')
    a.href = canvas.toDataURL("image/png")
    image.src = canvas.toDataURL("image/png")
    a.download = name + '.png'
    a.click()
  });
}

