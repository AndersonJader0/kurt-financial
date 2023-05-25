class Bill{
    constructor(){
        this.id = 1;
        this.arrayBills = [];
        this.billIdforEdition;
    }

    attBD(){
        const url = "http://150.136.101.49:8080/bill/all"

        fetch(url).then((response) => {
            response.json().then((contas) => {
                contas.map((conta) => {
                    let bill = {};
                    bill.id = conta.id;
                    bill.name = conta.name;
                    bill.value = conta.value;
                    bill.date = conta.date;

                    this.saveDateOnArrayBills(bill);
                    this.addDateOnTable();
                })
            })
        })
    }

    sendDataToBD(data){
        fetch(`http://150.136.101.49:8080/bill/add`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => console.log(data))
    }

    attObjectOnBD(data){
        fetch(`http://150.136.101.49:8080/bill/update`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => console.log(data))
    }

    deleteObjOnBD(id){
        fetch(`http://150.136.101.49:8080/bill/delete/` + id, {
        method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))
    }

    readInputData(){
        let bill = {};
        bill.name = document.getElementById('name').value;
        bill.value = document.getElementById('value').value;
        bill.date = document.getElementById('date').value;
        bill.id = this.id;

        if(bill.value.length === 0){
            alert('É obrigatório preencher o valor');
        }else{
            if(document.getElementById('add').innerText == 'Adicionar'){
                this.saveDateOnArrayBills(bill);
                this.addDateOnTable();
                this.sendDataToBD(bill);
            }else{
                this.editTableRow(bill);
                this.attObjectOnBD(bill);
                document.getElementById('add').innerText = 'Adicionar';
            }
        }
    }

    saveDateOnArrayBills = (bill) => {
        this.arrayBills.push(bill);
    }

    addDateOnTable(){
        const tbody = document.getElementById('tbody');
        this.clearInputFields();
        tbody.innerText = '';
        
        for(let i = 0; i < this.arrayBills.length; i++){
            let tableRow = tbody.insertRow();

            let [name, value, date, options] = [tableRow.insertCell(), tableRow.insertCell(), tableRow.insertCell(), tableRow.insertCell()];

            name.innerText = this.arrayBills[i].name;
            value.innerText = this.arrayBills[i].value;
            date.innerText = this.arrayBills[i].date;

            let [iconEdit, iconDelete] = [document.createElement('img'), document.createElement('img')];
            
            iconDelete.src = '/images/iconClose.svg';
            iconEdit.src = '/images/iconEdit.png';

            options.appendChild(iconEdit);
            options.appendChild(iconDelete);

            iconDelete.setAttribute('onclick', 'bill.deleteTableRow('+ this.arrayBills[i].id +')');
            iconEdit.setAttribute('onclick', 'bill.prepareTableRowEdition('+ JSON.stringify(this.arrayBills[i]) +')');

            options.classList.add('onlyTopBottomPadding');
        }
        this.id++;
        this.clearInputFields();
        this.calculateTotalValue();
        this.calculateTotalBills();
    }

    clearInputFields = () => {
    document.getElementById('box-fields').reset();
        if(document.getElementById('add').innerText == 'Editar'){
            document.getElementById('add').innerText = 'Adicionar';
        }
    }

    deleteTableRow(id){
        const tbody = document.getElementById('tbody');
        for(let i = 0; i < this.arrayBills.length; i++){
            if(this.arrayBills[i].id == id){
                this.arrayBills.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
        this.calculateTotalValue();
        this.calculateTotalBills();
        this.deleteObjOnBD(id);
    }

    prepareTableRowEdition(bill){
        console.log('name: ' + bill.name);
        console.log('id: ' + bill.id);
        console.log('value: ' + bill.value);
        console.log('date: ' + bill.date);
        const tbody = document.getElementById('tbody');
        document.getElementById('name').value = bill.name;
        document.getElementById('value').value = bill.value;
        document.getElementById('date').value = bill.date;

        document.getElementById('add').innerText = 'Editar';
        this.billIdForEdition = bill.id;
    }

    editTableRow(bill){
        for(let i = 0; i < this.arrayBills.length; i++){
            if(this.billIdForEdition == this.arrayBills[i].id){
                this.arrayBills[i].name = bill.name;
                this.arrayBills[i].value = bill.value;
                this.arrayBills[i].date = bill.date;
            }
        }
        this.addDateOnTable();
    }

    calculateTotalValue(){
        let amountTotal = 0;
        for(let i = 0; i < this.arrayBills.length; i++){
            amountTotal += parseFloat(this.arrayBills[i].value);
        }
        if(amountTotal != 0){
        document.getElementById('div1').innerText = 'R$ ' + amountTotal.toFixed(2);
        }else{
            document.getElementById('div1').innerText = 'R$ ' + amountTotal;
        }
    }

    calculateTotalBills(){
        let amountBill = 0;
        amountBill += this.arrayBills.length;
        document.getElementById('ammountBill').innerText = amountBill;
    }
}

var bill = new Bill();
bill.attBD();