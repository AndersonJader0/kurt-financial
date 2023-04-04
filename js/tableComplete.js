function openAndCloseTable(){
    const table = document.getElementById('table');
    const acessFullTable = document.getElementById('acessFullTable');

    // table.style.overflow = 'static';
    // table.style.height = '90vh';
    table.style.position = 'absolute';
    table.style.top = '7vh';
    table.style.width ='88%';
    acessFullTable.style.position = 'absolute';
    acessFullTable.style.top = '1vh';
    acessFullTable.style.left = '50%';
    acessFullTable.style.transform = 'translateX(-50%)';
}