const btn = document.getElementById('submit_btn')
btn.addEventListener('click', async () => {

    let language = document.getElementById('language').value
    //console.log(language);
    let code = document.getElementById('code').innerText
    // console.log(code.innerText);
    let XHR = new XMLHttpRequest()
    XHR.open('POST', 'http://localhost:5000/', true)
    XHR.setRequestHeader('Content-Type', 'application/json')
    XHR.send(JSON.stringify({
        language : language,
        code : code
    }))
})