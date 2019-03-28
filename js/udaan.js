let techEvents = [
  "Electro Musiciano",
  "Contraption",
  "Designer's Market",
  "Circuit-e-Ishq ",
  "Mad Scientist",
  "Roller Coaster",
  "Bomb Rush",
  "Let's Sling it !",
  "ELECTRO-SNOOPER ",
  "Track Mania",
  "Dam it!",
  "Chip-Patrons",
  "MasterWare",
  "Er. Delving",
  "Eco-Arena",
  "Wizard Graphica",
  "WebiClan",
  "Mecha-Hunt",
  "Ingenious",
  "Geek-Out-Loud",
  "Game of Codes",
  "Auto-Ignito",
  "Python Bootcamp",
  "Wizards of IOT",
  "Drone Workshop"
]


let nonTechEvents = [
  "Takeshi Castle",
  "Guru",
  "Potterhead",
  "SOTY (STUDENT OF THE YEAR) ",
  "SSB",
  "Crazy Cricket",
  "Valar Morghulis",
  "Sherlocked! ",
  "Roadies ",
  "Math-pi-Rates",
  "BVM MUN",
  "Stockhastic",
  "Marvel Alliance",
  "F.R.I.E.N.D.S",
  "Mann Ki Baat",
  "Antakshari",
  "QUIZZITCH",
  "Youth Parliament",
  "Artes Elegantase",
  "S.P.E.N.T Quiz",
  "BOLLY MIX BOLLY",
  "Treasure Hunt",
  "PUBG Gaming Mobile",
  "Bakers and Sellers",
  "View Finder ",
  "Counter Strike (CSGO) "
]

let populateEvents = function() {
  let eventDropDown = document.getElementById("events-get")
  if(event.target.value === "techEvents"){
    techEvents.forEach((el)=>{
      let option = document.createElement('option')
      option.value = el
      option.innerHTML = el
      eventDropDown.append(option)
    })
  }
  else if(event.target.value === "nonTechEvents") {
    nonTechEvents.forEach((el)=>{
      let option = document.createElement('option')
      option.value = el
      option.innerHTML = el
      eventDropDown.append(option)
    })
  }
}

let populateEventsVerify = function() {
  let eventDropDown = document.getElementById("events")
  if(event.target.value === "techEvents"){
    techEvents.forEach((el)=>{
      let option = document.createElement('option')
      option.value = el
      option.innerHTML = el
      eventDropDown.append(option)
    })
  }
  else if(event.target.value === "nonTechEvents") {
    nonTechEvents.forEach((el)=>{
      let option = document.createElement('option')
      option.value = el
      option.innerHTML = el
      eventDropDown.append(option)
    })
  }
}

let switchTab = function(tab) {
  let getSelectors = document.querySelectorAll('.get-certificate')
  let verifySelectors = document.querySelectorAll('.verify')
  let getTab = event.target.parentNode.children[0]
  let verifyTab = event.target.parentNode.children[1]
  if(tab === 'get') {
    getSelectors.forEach((element)=>{
      element.style.display = 'unset'
    })
    verifySelectors.forEach((element)=>{
      element.style.display = 'none'
    })
    verifyTab.classList.remove('active')
    getTab.classList.add('active')
  }
  else {
    getSelectors.forEach((element)=>{
      element.style.display = 'none'
    })
    verifySelectors.forEach((element)=>{
      element.style.display = 'unset'
    })
    verifyTab.classList.add('active')
    getTab.classList.remove('active')
  }
}

let getCertificate = function() {
  let phone = document.getElementById('contact').value
  let department = document.getElementById('department-get').value
  let event = null

  if(department !== "null")
    event = document.getElementById("events-get").value

  let errorContainer = document.getElementById('error')
  if(phone === '' || event === "null" || event === null || department === "null"){
    errorContainer.innerText = "Number/Event cannot be empty"
    errorContainer.style.display = 'block'
  }
  else if(phone.length < 10){
    errorContainer.innerText = "Invalid Number"
    errorContainer.style.display = 'block'
  }
  else {
    $.ajax({
      url: 'https://certification-api.herokuapp.com/getCertificate',
      method: "POST",
      data: {
        eventName: event,
        phone: phone.toString()
      }
    }).then((response)=>{
      if(response) {
        let name = response.name
        let code = response.code
        let eventName = response.eventName
        document.location.href = 'udaan-certificate.html?name='+name+'&code='+code+'&eventName='+eventName
      }
      else {
        errorContainer.innerText = "Number not registered"
        errorContainer.style.display = 'block'
      }
    })

  }
}

let verifyCertificate = function() {
  let name = document.getElementById('name').value.toLowerCase()
  let code = document.getElementById('code').value.toLowerCase()
  let eventName = document.getElementById('events').value
  $.ajax({
    url: 'https://certification-api.herokuapp.com/verify',
    method: "POST",
    data: {
      name,
      code,
      eventName
    }
  }).then((response) => {
    if(response.message === "True")
      document.getElementById("message").innerHTML = "Certificate is valid"
    else
      document.getElementById("message").innerHTML = "Certificate is invalid"
    document.getElementById("message").style.display = 'block'
  })
}
