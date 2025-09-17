window.addEventListener('load', function () {
    function pushBtn(){
        var button = document.getElementById('roll');
        var box = document.getElementById('box');
        let output = document.createElement('b');
        if(Math.floor(Math.random() + 0.5) == 1){
            output.textContent = '寝なさい';
            output.className = 'sleep'
        }else{
            output.textContent = '起きなさい';
            output.className = 'wake'
        };
        button.remove();
        box.appendChild(output);
    };
    document.getElementById('roll').onclick = pushBtn;
});