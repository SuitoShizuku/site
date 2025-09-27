window.addEventListener('load', function () {
  document.cookie = "DaitoJavascript=On;";
  document.cookie = "DATA=TRUE";
    console.log(document.cookie)

    let cookie = document.cookie
    const Data = cookie.split(';')
    const Root = document.getElementById('root')
    for(let i=0;i<Data.length;i++){
        let d = document.createElement('p')
        d.textContent = Data[i]
        Root.appendChild(d)
    }
});