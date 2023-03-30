var isOpen = '';
function menu(){
    if(isOpen == false){
    document.querySelector('.menu-left').style.transform = 'translateX(0)';
    isOpen = true;
    }else{
        document.querySelector('.menu-left').style.transform = 'translateX(-100%)';
        isOpen = false;
    }
}