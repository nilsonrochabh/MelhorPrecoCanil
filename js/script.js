//descobrindo a data 
var diaSemana="";
$(document).ready(function(){
    var semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    $("input#data").blur(function(){
        var data = this.value;
        var arr = data.split("/").reverse();
        var separa = new Date(arr[0], arr[1] - 1, arr[2]);
        var dia = separa.getDay();
        if(semana[dia]==='Segunda-Feira'||semana[dia]==='Terça-Feira'||semana[dia]==='Quarta-Feira'||semana[dia]==='Quinta-Feira'||semana[dia]==='Sexta-Feira'){
            diaSemana=true;
        }else{
            diaSemana=false;
        }
        console.log(diaSemana);
    

    });
}); 
document.getElementById('formulario').addEventListener('submit',calcularValor);
function calcularValor(e){
    var dataEscolhida = document.getElementById('data').value;
    var pequeno = document.getElementById('pequeno').value;
    var grande = document.getElementById('grande').value;
    var patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    if(!patternData.test(dataEscolhida)){
        alert("Digite a data no formato Dia/Mês/Ano");
        
        return false;
    }
    if(pequeno==0 && grande ==0){
        alert("escolha ao menos uma valor direfente de zero");
        return false;

    }

    if(diaSemana===true){
        var opcao1 = [
            valorPequeno = 20.0,
            valorGrande = 40.0,
     ];
     var opcao2=[
         valorPequeno = 15.0,
         valorGrande = 50.0,
     ];  
 
    }
    if(diaSemana===false){
        var opcao1 = [
            valorPequeno = 24.0,
            valorGrande = 48.0,
     ];
     var opcao2=[
         valorPequeno = 20.0,
         valorGrande = 55.0,
     ]; 

    }
    
    var opcao3=[
        valorPequeno = 30.0,
        valorGrande = 45.0,
    ];
    //calculando os valores
    var calculo1= opcao1[0]*pequeno+opcao1[1]*grande;
    var calculo2= opcao2[0]*pequeno+opcao2[1]*grande;
    var calculo3= opcao3[0]*pequeno+opcao3[1]*grande;
    console.log(calculo1,calculo2,calculo3);

    //descobrindo menor valor
    var menor=0;
    var canil=['Meu Canino Feliz', 'Vai Rex','ChowChawgas'];
    var melhorOpcao='';

    
        if(calculo1<calculo2&&calculo1<calculo3){
            menor=calculo1;
            melhorOpcao = canil[0];
        }else if(calculo2<calculo1&&calculo2<calculo3){
            menor=calculo2;
            melhorOpcao = canil[1];
        }else if(calculo3<calculo1&&calculo3<calculo2){
            menor=calculo3;
            melhorOpcao = canil[2];
        }
        if(calculo1===calculo2){
                melhorOpcao=canil[1];
                menor=calculo2;
        }
        if(calculo1==calculo3){
            melhorOpcao=canil[2];
            menor=calculo3;
        } 
        if(calculo2==calculo3){
            melhorOpcao=canil[2];
            menor=calculo3;
        } 
    
        console.log(menor,melhorOpcao);
    //Criando objeto para carregar os dados 
    valor= {
        dataE:dataEscolhida,
        cpequeno:pequeno,
        cgrande:grande,
        vmenor:menor,
        mopcao:melhorOpcao
    }
    
    //Criando um db local para vazer alguns calculso
    if(localStorage.getItem(('base')) == null){
        var valores = [];
        valores.push(valor);
        //transformando objeto em string para armazernar 
        localStorage.setItem('base', JSON.stringify(valores));
    }else{
        //trasnformando os valores em json
        var valores = JSON.parse(localStorage.getItem('base'));
        valores.push(valor);
        localStorage.setItem('base' ,JSON.stringify(valores));
    
    }
    //mantendo console.log
    e.preventDefault();
    //buscando valores 
    mostraValores();
    //limando os campos apos input
    $("input").val("");
       
}

//função para mostrar os valores na tabela
function mostraValores(){
    var dados = JSON.parse(localStorage.getItem('base'));
    var mostrandoValores = document.getElementById('resultado');
    mostrandoValores.innerHTML = '';
   
    for(var i=0; i < dados.length; i++){
        var data = dados[i].dataE;
        var pequeno = dados[i].cpequeno;
        var grande = dados[i].cgrande;
        var valor = dados[i].vmenor;
        var opcao= dados[i].mopcao;
        mostrandoValores.innerHTML +='<tr><td>'+data+
                               '</td><td>'+pequeno+
                                   '</td><td>'+grande+
                                   '</td><td style="color:red;"">'+valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) +
                                   '</td><td style="font-weight: bolder; font-size:16px;">'+opcao+
                                   
                                   '</tr>'; 
  

    }
    console.log(dados);


}
