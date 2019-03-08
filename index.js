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
  let errorContainer = document.getElementById('error')
  if(phone === ''){
    errorContainer.innerText = "Number cannot be empty"
    errorContainer.style.display = 'block'
  }
  else if(phone.length < 10){
    errorContainer.innerText = "Invalid Number"
    errorContainer.style.display = 'block'
  }
  else {
    $.ajax({
      url: 'https://certification-api.herokuapp.com/talks/getCertificate',
      method: "POST",
      data: {
        phone: phone.toString()
      }
    }).then((response)=>{
      if(response) {
        let name = response.name
        let code = response.code
        document.location.href = 'certificate.html?name='+name+'&code='+code
      }
      else {
        errorContainer.innerText = "Number not registered"
        errorContainer.style.display = 'block'
      }
    })

  }
}

let verifyCertificate = function() {
  let name = document.getElementById('name').value
  let code = document.getElementById('code').value.toLowerCase()
  $.ajax({
    url: 'https://certification-api.herokuapp.com/talks/verify',
    method: "POST",
    data: {
      name,
      code
    }
  }).then((response) => {
    if(response.message === "True")
      document.getElementById("message").innerHTML = "Certificate is valid"
    else
      document.getElementById("message").innerHTML = "Certificate is invalid"
    document.getElementById("message").style.display = 'block'
  })
}
