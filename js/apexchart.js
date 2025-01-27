// DATA CAROUSEL
var util = {
  qs(sel, ctx){ 
    return (ctx || document).querySelector(sel);
  },
  qsa(sel, ctx){
    return Array.from((ctx || document).querySelectorAll(sel));
  }
};

class DateCarousel {
  constructor(el) {
    this.element = el;
    this.prevButton = util.qs(".date-carousel-prev", el);
    this.input = util.qs(".date-carousel-input",el);
    this.nextButton = util.qs(".date-carousel-next",el);
    this.input.valueAsDate = new Date();
    this.prevButton.addEventListener("click",this.prev.bind(this));
    this.nextButton.addEventListener("click",this.next.bind(this));
  }
  
  prev(){
    this.input.stepDown();
  }
  
  next() {
    this.input.stepUp();
  }  
}
util.qsa('.date-carousel').forEach(function(el){ new DateCarousel(el) });

//pegando a troca de data do carousel  
document.getElementById("dataprev").addEventListener("click", attchart);
document.getElementById("datanext").addEventListener("click", attchart);

var mes;
var ano;

function datanext() {
  let data = document.getElementById("datacarousel").value;
  let dataString = data.split('-') // Retornará ['09', '2022']
  mes = dataString[1]
  ano = dataString[0]
}

//id firebase
const iduser = window.localStorage.getItem('id');

//gets
function fazGet(url){
    const request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
};

function getWithIndex(url){
    const data = fazGet(url);
    const entradas = JSON.parse(data);
    return entradas;
};

//att graficos
function attchart(){
  datanext();
  attchart1();
  attchart2();
  attchart3();
  attchart4();
}

function attchart1(){
  var chart = new ApexCharts(document.querySelector("#spark1"), options);
  chart.render();
  var fahrenheit = getWithIndex("https://controle-de-gastos-pila.herokuapp.com/chartsaida?id_user="+iduser+"&mes="+mes+"&ano="+ano)
  let values_operation = [];
  let date_operations = [];
  var data_operacoes = fahrenheit.map(function(elem){
      // console.log((elem.datas_saida).split("T")[0].split("-").reverse().join("/"));
      date_operations.push((elem.datas_saida).split("T")[0].split("-").reverse().join("/"));
  });
  var valores_operacoes = fahrenheit.map(function(elem){
      values_operation.push(elem.preco_operation)
  });
  chart.updateOptions({
    series: [{
      data: values_operation
    }],
    xaxis: {
      categories: date_operations,
  }})
}

function attchart2(){
  var chart = new ApexCharts(document.querySelector("#spark2"), options2);
  chart.render();
  var pizza_exit = getWithIndex("https://controle-de-gastos-pila.herokuapp.com/chartcategorysaida?id_user="+iduser+"&mes="+mes+"&ano="+ano)
  let values_operation_pizza_exit = [];
  let category_operations_pizza_exit = [];
  var categoria_operacoes_pizza_exit = pizza_exit.map(function(elem){
    category_operations_pizza_exit.push((elem.category));
  });
  var valores_operacoes_pizza_exit = pizza_exit.map(function(elem){
    values_operation_pizza_exit.push(elem.total_category)
  });


  if(pizza_exit.length === 0){
    chart.updateOptions({
      series: [0],
      labels: ['Sem transações'],
      animations: {
        enabled: false}
    })
  }else{
    chart.updateOptions({
      series: values_operation_pizza_exit,
      labels: category_operations_pizza_exit,
      animations: {
        enabled: false}
  })
  }
}

function attchart3(){
  var chart = new ApexCharts(document.querySelector("#spark3"), options3);
  chart.render();
  var fahrenheit_enter = getWithIndex("https://controle-de-gastos-pila.herokuapp.com/chartentrada?id_user="+iduser+"&mes="+mes+"&ano="+ano)
  let values_operation_enter = [];
  let date_operations_enter = [];
  var data_operacoes_enter = fahrenheit_enter.map(function(elem){
    date_operations_enter.push((elem.datas_saida).split("T")[0].split("-").reverse().join("/"));
  });
  var valores_operacoes_enter = fahrenheit_enter.map(function(elem){
    values_operation_enter.push(elem.preco_operation)
  });
  chart.updateOptions({
    series: [{
      data: 
      values_operation_enter
    }],
    xaxis: {
      categories: date_operations_enter,
  }})
}

function attchart4(){
  var chart = new ApexCharts(document.querySelector("#spark4"), options4);
  chart.render();
  var pizza_enter = getWithIndex("https://controle-de-gastos-pila.herokuapp.com/chartcategoryentrada?id_user="+iduser+"&mes="+mes+"&ano="+ano)
  let values_operation_pizza_enter = [];
  let category_operations_pizza_enter = [];
  var categoria_operacoes_pizza_enter = pizza_enter.map(function(elem){
    category_operations_pizza_enter.push((elem.category));
  });
  var valores_operacoes_pizza_enter = pizza_enter.map(function(elem){
    values_operation_pizza_enter.push(elem.total_category)
  });

  if(pizza_enter.length === 0){
    chart.updateOptions({
      series: [0],
      labels: ['Sem transações'],
    })
  }else{
    chart.updateOptions({
      series: values_operation_pizza_enter,
      labels: category_operations_pizza_enter
  })
  }
}

datanext();

// gráfico 1 (linha) - saída
var fahrenheit = getWithIndex("https://controle-de-gastos-pila.herokuapp.com/chartsaida?id_user="+iduser+"&mes="+mes+"&ano="+ano)
let values_operation = [];
let date_operations = [];
var data_operacoes = fahrenheit.map(function(elem){
  // console.log((elem.datas_saida).split("T")[0].split("-").reverse().join("/"));
  date_operations.push((elem.datas_saida).split("T")[0].split("-").reverse().join("/"));
});
var valores_operacoes = fahrenheit.map(function(elem){
  values_operation.push(elem.preco_operation)
});
var options = {
  series: [{
  name: "Gasto",
  data: values_operation
}],
  chart: {
  // height: 400,
  // width: 600,
  type: 'line',
  zoom: {
  enabled: false
  }
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'straight'
},
title: {
  text: 'Gastos por dia',
  align: 'left'
},
grid: {
  row: {
  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
  opacity: 0.5
  },
},
xaxis: {
  categories: date_operations,
},
responsive: [
  {
    breakpoint: 1000,
    options: {
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      legend: {
        position: "bottom"
      }
    }
  }
]
};

// gráfico 3 (linha) - entrada
var fahrenheit_enter = getWithIndex("https://controle-de-gastos-pila.herokuapp.com/chartentrada?id_user="+iduser+"&mes="+mes+"&ano="+ano)
let values_operation_enter = [];
let date_operations_enter = [];
var data_operacoes_enter = fahrenheit_enter.map(function(elem){
  // console.log((elem.datas_saida).split("T")[0].split("-").reverse().join("/"));
  date_operations_enter.push((elem.datas_saida).split("T")[0].split("-").reverse().join("/"));
});
var valores_operacoes_enter = fahrenheit_enter.map(function(elem){
  values_operation_enter.push(elem.preco_operation)
});
var options3 = {
  series: [{
  name: "Entrada",
  data: values_operation_enter
}],
  chart: {
  type: 'line',
  zoom: {
  enabled: false
  }
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'straight'
},
title: {
  text: 'Entradas por dia',
  align: 'left'
},
grid: {
  row: {
  colors: ['#f3f3f3', 'transparent'],
  opacity: 0.5
  },
},
xaxis: {
  categories: date_operations_enter,
},
responsive: [
  {
    breakpoint: 1000,
    options: {
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      legend: {
        position: "bottom"
      }
    }
  }
]
};

// gráfico 2 (pizza) - saída
var pizza_exit = getWithIndex("https://controle-de-gastos-pila.herokuapp.com/chartcategorysaida?id_user="+iduser+"&mes="+mes+"&ano="+ano)
let values_operation_pizza_exit = [];
let category_operations_pizza_exit = [];
var categoria_operacoes_pizza_exit = pizza_exit.map(function(elem){
  category_operations_pizza_exit.push((elem.category));
});
var valores_operacoes_pizza_exit = pizza_exit.map(function(elem){
  values_operation_pizza_exit.push(elem.total_category)
});
var options2 = {
  series: values_operation_pizza_exit,
  chart: {
  width: 410,
  type: 'pie',
},
labels: category_operations_pizza_exit,
responsive: [{
  breakpoint: 480,
  options: {
    chart: {
      type: 'line',
      zoom: {
      enabled: false
      }},
    legend: {
      position: 'bottom'
    }
  }
}]
};

// gráfico 4 (pizza) - entrada
var pizza_enter = getWithIndex("https://controle-de-gastos-pila.herokuapp.com/chartcategoryentrada?id_user="+iduser+"&mes="+mes+"&ano="+ano)
let values_operation_pizza_enter = [];
let category_operations_pizza_enter = [];
var categoria_operacoes_pizza_enter = pizza_enter.map(function(elem){
  category_operations_pizza_enter.push((elem.category));
});
var valores_operacoes_pizza_enter = pizza_enter.map(function(elem){
  values_operation_pizza_enter.push(elem.total_category)
});
var options4 = {
  series: values_operation_pizza_enter,
  chart: {
  width: 410,
  type: 'pie',
},
labels: category_operations_pizza_enter,
responsive: [{
  breakpoint: 480,
  options: {
    chart: {
      type: 'line',
      zoom: {
      enabled: false
      }},
    legend: {
      position: 'bottom'
    }
  }
}]
};

function charts(){
  datanext();
  let chart = new ApexCharts(document.querySelector("#spark1"), options);
  let chart2 = new ApexCharts(document.querySelector("#spark2"), options2);
  chart.render();
  chart2.render();
  let chart3 = new ApexCharts(document.querySelector("#spark3"), options3);
  let chart4 = new ApexCharts(document.querySelector("#spark4"), options4);
  chart3.render();
  chart4.render();
}

charts();


const Ajuda = document.querySelector("#ajuda");
const Sugestao = document.querySelector("#sugestão");

function alertsuccess(msg) {
  iziToast.success({
      title: 'Sucesso',
      position: 'topRight',
      message: msg,
      displayMode: 1,
  }); 
}

function alerterror(msg){
  iziToast.error({
      title: 'Erro',
      position: 'topRight',
      message: msg,
      displayMode: 1,
  });
}

function alertwarning(msg) {
  iziToast.warning({
      title: 'Atenção',
      position: 'topRight',
      message: msg,
      displayMode: 1,
  });
}

function deletarregistro(item) {
  swal("Você tem certeza que quer deletar esta operação?", {
      dangerMode: true,
      closeOnClickOutside: false,
      buttons: ["Cancelar", "Deletar"],
  }).then((result) => {
      if (result) {
          deleteItem(item)
      }
  })
}