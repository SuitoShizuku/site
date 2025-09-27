window.addEventListener('load', function () {
  document.cookie = "DaitoJavascript=On;";
  document.cookie = "DATA=TRUE;";
    console.log(document.cookie)

    let Data = document.cookie.split(';')
    const Root = document.getElementById('root')
    console.log(Data)
    for(let i=0;i<Data.length;i++){
        let d = document.createElement('p')
        d.className = 'Memo'
        d.id = Data[i]
        d.textContent = Data[i]
        Root.appendChild(d)
        console.log(Data[i])
    }
});