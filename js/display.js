let isShowing = true;
function hideAndShowValue(){
    let value = document.getElementById('div1');
    let eyesOpened = document.getElementById('eyesOpened');
    let eyesClosed = document.getElementById('eyesClosed');
    if(isShowing == true){
        value.style.background = '#1a1a1a';
        eyesOpened.style.display = 'none';
        eyesClosed.style.display = 'block';
        isShowing = false;
    }else{
        value.style.background = '#fafafa';
        eyesOpened.style.display = 'block';
        eyesClosed.style.display = 'none';
        isShowing = true;
    }
}