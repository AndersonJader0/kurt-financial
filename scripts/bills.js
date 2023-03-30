class Conta{
    constructor(){
        this.id = 1;
        this.arrayContas = [];
        this.idOfEdit = null;
    }

    lerDados(){
        let conta = {};
        conta.id = this.id;
        conta.nome = document.getElementById('conta').value;
        conta.valor = document.getElementById('valor').value;
        conta.data = document.getElementById('data').value;

        if(conta.nome != '' && conta.valor!= ''){
        this.verifier(conta);
        }
    }

    verifier(conta){
        if(document.getElementById('adicionar').innerText === 'Editar'){
            // alert(this.idOfEdit);
            if(document.getElementById('conta').value != this.arrayContas[this.idOfEdit - 1].nome ||
            document.getElementById('valor').value != this.arrayContas[this.idOfEdit - 1].valor ||
            document.getElementById('data').value != this.arrayContas[this.idOfEdit - 1].data){

            for(let i = 0; i < this.arrayContas.length; i++){
                if(this.arrayContas[i].id == this.idOfEdit){
                    this.arrayContas[i].nome = conta.nome;
                    this.arrayContas[i].valor = conta.valor;
                    this.arrayContas[i].data = conta.data;
                }
                this.addDados();
            }
            }else{
                //não mudou
            }
            
        }else{
            this.arrayContas.push(conta);
            this.addDados();
        }
    }

    addDados(){
        let tbody = document.getElementById('tbody');
        
        tbody.innerHTML = '';

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

            imgDel.setAttribute('onclick', 'conta.delete('+ this.arrayContas[i].id +')');
            imgEdit.setAttribute('onclick', 'conta.edit('+ JSON.stringify(this.arrayContas[i]) +')');

            data_nome.classList.add('fix');
            data_valor.classList.add('fix');
            data_data.classList.add('fix');
            data_edit.classList.add('imgs');

        }

        this.cancelar();
        this.id++;
        this.calculate();
        this.bill();
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
        this.calculate();
        this.bill();
    }

    edit(conta){
        document.getElementById('conta').value = conta.nome;
        document.getElementById('valor').value = conta.valor;
        document.getElementById('data').value = conta.data;
        document.getElementById('adicionar').innerText = 'Editar';
        this.idOfEdit = conta.id;
    }

    calculate(){
        let soma = 0;
        for(let i = 0; i < this.arrayContas.length; i++){
            soma += parseFloat(this.arrayContas[i].valor);
        }
        document.getElementById('all-value').innerText = 'R$' + soma;
    }

    bill(){
        document.getElementById('all-bill').innerText = this.arrayContas.length;
    }
}

var conta = new Conta();