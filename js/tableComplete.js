var isFullView = false;

function openAndCloseTable(){
    const boxFields = document.getElementById('box-fields');
    const acessFullTable = document.getElementById('acessFullTable');
    const textFullTable = document.getElementById('textFullTable');
    if(isFullView){
        boxFields.style.height = '300px';
        isFullView = false;
        textFullTable.innerText = 'Diminuir tabela';
        document.getElementById('imgOfFullTable').style.transform = 'rotate(0deg)';
    }else{
        boxFields.style.height = '0px';
        isFullView = true;
        textFullTable.innerText = 'Aumentar tabela';
        document.getElementById('imgOfFullTable').style.transform = 'rotate(180deg)';
    }
}