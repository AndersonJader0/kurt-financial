class Conta{
    constructor(){
        this.id = 1;
        this.arrayContas = [];
        this.idOfEdit = null;
    }

    lerDados(){
        let conta = {};
        conta.id = this.id;
        alert(conta.id);
        conta.nome = document.getElementById('conta').value;
        conta.valor = document.getElementById('valor').value;
        conta.data = document.getElementById('data').value;

        this.addDados(conta);
    }

    addDados(conta){
        if(document.getElementById('adicionar').innerText === 'Editar'){
            alert(this.idOfEdit);
            if(document.getElementById('conta').value != this.arrayContas[this.idOfEdit - 1].nome ||
            document.getElementById('valor').value != this.arrayContas[this.idOfEdit - 1].valor ||
            document.getElementById('data').value != this.arrayContas[this.idOfEdit - 1].data){
            alert('Mudou');
        }else{
            alert('Não mudou');
        }
        }else{
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        this.arrayContas.push(conta);
        for(let i = 0; i < this.arrayContas.length; i++){
            let tr = tbody.insertRow();
            let data_nome = tr.insertCell();
            let data_valor = tr.insertCell();
            let data_data = tr.insertCell();
            let data_edit = tr.insertCell();

            data_nome.innerText = this.arrayContas[i].nome;
            data_valor.innerText = this.arrayContas[i].valor;
            data_data.innerText = this.arrayContas[i].data;
            
            let imgEdit = document.createElement('img');
            let imgDel = document.createElement('img');
            imgEdit.src = '/images/edit.png';
            imgDel.src = '/images/del.svg';

            data_edit.appendChild(imgEdit);
            data_edit.appendChild(imgDel);

            imgEdit.setAttribute('onclick', 'conta.delete('+ this.arrayContas[i].id +')');
            imgEdit.setAttribute('onclick', 'conta.edit('+ JSON.stringify(this.arrayContas[i]) +')');
        }

        this.cancelar();
        this.id++;
    }
}
    

    cancelar(){
        document.getElementById('conta').value = '';
        document.getElementById('valor').value = '';
        document.getElementById('data').value = '';
    }

    delete(id){
        let tbody = document.getElementById('tbody');

        for(let i = 0; i < this.arrayContas.length; i++){
            if(this.arrayContas[i].id == id){
                this.arrayContas.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
    }

    edit(conta){
        document.getElementById('conta').value = conta.nome;
        document.getElementById('valor').value = conta.valor;
        document.getElementById('data').value = conta.data;
        document.getElementById('adicionar').innerText = 'Editar';
        this.idOfEdit = conta.id;
    }
}

var conta = new Conta();