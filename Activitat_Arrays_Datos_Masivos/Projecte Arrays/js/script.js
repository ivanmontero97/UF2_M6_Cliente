var itemsTable = [];
var headersTable =[];
var recargaPagina;
var dadesForGrafic=[];
var labelsValues =[];
var counterDadesForGrafic=[];
var backgroundColor;
var border;
var orden="asc";
var propertiesJSON=[];
var arrayMultidimensional = []; //Contiene los elementos del array itemsTable pero pasados a formato multidimensional. 

//Eventos relativos al select y la carga de pagina inicial
document.addEventListener('DOMContentLoaded', function () {
	agregarOptionSinValor();
});
document.getElementById('selectorJSON').addEventListener('change', function () {
    eliminarOptionSinValor();
});
document.getElementById("inputBuscador").addEventListener('input', searchInput);

function agregarOptionSinValor() {
    if (!document.querySelector('#selectorJSON option[value="" ]')) {
        let optionSinValor = document.createElement('option');
        optionSinValor.value = '';
        optionSinValor.textContent = 'Seleccionar';
		optionSinValor.selected = true;
        let selectorJSON = document.getElementById('selectorJSON');
        selectorJSON.insertBefore(optionSinValor, selectorJSON.firstChild);
    }
}

function eliminarOptionSinValor() {
    let optionSinValor = document.querySelector('#selectorJSON option[value=""]');
    if (optionSinValor) {
        optionSinValor.remove();
    }
}

// ---------------------------------------------------------------------------------------- METODO QUE EXTRAE LOS ITEMS DEL JSON EN UN ARRRAY UNIDIMENSIONAL -----------------
async function getArrayFromJSON(propiedadPrincipal = null, file, propertiesJSON) {
    try {
        return new Promise((resolve, reject) => {
            fetch(file)
                .then((response) => response.json())
                .then((data) => {
                    let dataJSON = Array.isArray(data) ? data : data[propiedadPrincipal];
                    dataJSON.forEach((dades) => {
                        let value = Array.isArray(dataJSON) ? [] : "";
                        if (Array.isArray(value)) {
                            propertiesJSON.forEach((property) => {
                                value.push(dades[property]);
                            });
                        } else {
                            value = dades[propertiesJSON];
                        }
                        itemsTable.push(value);
                    });
                    resolve(); // Resuelve la promesa cuando el procesamiento de datos está completo
                })
                .catch((error) => {
                    console.error('Error al obtener o procesar los datos:', error);
                    reject(error); // Rechaza la promesa en caso de error
                });
        });
    } catch (error) {
        console.error('Error al obtener o procesar los datos:', error);
    }
}
// ---------------------------------------------------------------------------MÉTODOS SOBRE ARRAY UNIDIMENSIONAL ---------------------------------------------------------------------------------
async function getJSONData() {
	itemsTable.length=0; //Reiniciamos el array 
	headersTable.length=0 ; //Reiniciamos headers
	input = document.getElementById("selectorJSON").value;
	switch(input){
		case "pokemon":
			propertiesJSON = ["num","name","img","weight","type"];
			headersTable = ["Número","Nombre","Imágen" ,"Peso"]
			await getArrayFromJSON("pokemon","js/data/pokemon.json",propertiesJSON);
			break;
		case "municipis":
			propertiesJSON = ["ine","municipi_nom","nombre_habitants", "extensio", "altitud", "municipi_escut"];
			headersTable = ["INE :","Nombre del municipio ","Nº de habitantes" ,"Extensión", "Altitud" , "Escudo municipio"]
			await getArrayFromJSON("elements","js/data/municipis.json",propertiesJSON);
			break;
		case "meteoritos":
			propertiesJSON = ["id","name", "year","mass"];
			headersTable = ["Identificador","Nombre","Año" ,"Masa"]
			await getArrayFromJSON("","js/data/earthMeteorites.json",propertiesJSON);
			break;
		case "movies":
			propertiesJSON=["title","genres", "year","url"];
			headersTable = ["Título","Genero","Año" ,"Imágen"] 
			await getArrayFromJSON("movies","js/data/movies.json",propertiesJSON);
			break;
		default:
			return null;
	}
    printTable(itemsTable,headersTable,propertiesJSON);
    getMultimensionalArrayFromUnidimensionalArray();
	showHideButton();
    getArraysForGrafic();
}
 function printTable(itemsTable,headersTable,propertiesJSON) {
     restartTable();
     restartChart();
    let div = document.getElementById("result");   
    let table = document.createElement("table");
	let tableHeaderRow = document.createElement("tr");
	headersTable.forEach((head ,index)=>{
		let th = document.createElement("th");
        let property = propertiesJSON[index];
		th.innerHTML =`<button onclick="ordenar('${property}')" class="${property}">${head}</button>`
        // let button = document.createElement('button');
		tableHeaderRow.appendChild(th);
	});
	table.appendChild(tableHeaderRow);
	itemsTable.forEach((item)=>{
		let rowItem = document.createElement("tr");
				for(i=0;i < headersTable.length ; i++){
				var tdItem = document.createElement("td");
				if(isURL(item[i])){
					tdItem.innerHTML ="<img src='" + item[i] + "'>";
				} else{
					tdItem.innerHTML = item[i];
				}
				rowItem.appendChild(tdItem);
			}
		table.appendChild(rowItem);
	});
	div.appendChild(table);
}

//Funcion que calcula el array de items de la tabla. Sus parámetros de entrada son el path del JSON y las columnas(propiedades del JSON) a mostrar en la tabla.
function isURL(cadena) {
    // Expresión regular para verificar si la cadena es una URL
    const expresionRegularURL = /^(ftp|http|https):\/\/[^ "]+$/;
	/*
  ^          : Coincide con el inicio de la cadena.
  (ftp|http|https) : Grupo de alternancia que coincide con "ftp", "http" o "https".
  :\/\/      : Coincide con "://" literalmente.
  [^ "]+     : Coincide con uno o más caracteres que no son espacio en blanco ni comillas.
  $          : Coincide con el final de la cadena.
*/
    // Verificar si la cadena coincide con la expresión regular
    return expresionRegularURL.test(cadena);
}
function reloadPage(){
	location.reload();
}

function abrirBuscador() {
    var contenedorBuscador = document.getElementById('contenedorBuscador');
    var inputBuscador = document.getElementById('inputBuscador'); //Para copiar el input con sus propiedades
    inputBuscador.id="sonInputBuscador";
    // Cambia el contenido HTML del contenedor para sustituir el botón por el input
    contenedorBuscador.innerHTML = '';
    contenedorBuscador.appendChild(inputBuscador);
    // Muestra el input
    inputBuscador.style.display = 'block';
    document.getElementsById('result').addEventListener('click', function() {
        // Verifica si el clic no ocurrió dentro del contenedorBuscador
            // Oculta el contenedorBuscador
            inputBuscador.style.display = 'none';
    });
}

function searchInput(e) {
    let value = e.target.value.toLowerCase();
    let selectedJSON = document.getElementById("selectorJSON").value;
    let searchArray = [];

    switch (selectedJSON) {
        case "pokemon":
            searchArray = itemsTable.filter(pokemon => pokemon[1].toLowerCase().includes(value));
            break;
		case "municipis":
            searchArray = itemsTable.filter(municipios => municipios[1].toLowerCase().includes(value));
            break;
		case "movies":
            searchArray = itemsTable.filter(movies => movies[0].toLowerCase().includes(value));
            break;
		case "meteoritos":
            searchArray = itemsTable.filter(meteoritos => meteoritos[1].toLowerCase().includes(value));
            break;
    }
    printTable(searchArray, headersTable,propertiesJSON);
}
function calcMitjana() {
	let selectedJSON = document.getElementById("selectorJSON").value;
    switch (selectedJSON) {
        case "pokemon":
			calcMedia(3);
            break;
		case "municipis":
			calcMedia(2);
            break;
		case "movies":
			calcMedia(2);
            break;
		case "meteoritos":
			calcMedia(3);
            break;

}}

function calcMedia(columnIndex) {
    let columnValues = itemsTable.map(item => {
        let value = item[columnIndex];

        if (typeof value === 'string' && value.includes('kg')) {
            // Extraemos el valor numérico de la cadena que contiene 'kg'
            let numericValue = parseFloat(value);

            return !isNaN(numericValue) ? numericValue : undefined;
        } else {
            return !isNaN(value) ? parseFloat(value) : undefined;
        }
    });

    // Filtramos los valores válidos (no undefined)
    const validValues = columnValues.filter(value => value !== undefined);

    if (validValues.length > 0) {
        const suma = validValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const media = suma / validValues.length;

        alert(`La media de la columna ${columnIndex + 1} es: ${media.toFixed(2)}`);
    } else {
        alert(`No hay valores válidos en la columna ${columnIndex + 1}.`);
    }
}

function ordenar(property) {
    let columnIndex = propertiesJSON.indexOf(property);

    // Verificar si la columna es válida
    if (columnIndex === -1) {
        console.error("Columna no encontrada");
        return;
    }

    let order = (orden === "asc") ? 1 : -1; //Si quiero que lo ordene de forma ascendente querre que el resultado que devuelva sort sea del mismo signo , si quiero
    //ordenarlo de forma inversa deberé cambiar el valor del signo.

    itemsTable.sort(function (a, b) {
        let aValue = a[columnIndex];
        let bValue = b[columnIndex];

        //Comprobar que  no es URL
        if(isURL(aValue) || isURL(bValue)){
            return;
        }
        // Convertir a valores numéricos si es necesario
        if (typeof aValue === 'string' && !isURL(aValue) && aValue.includes(' kg')) {
            aValue = parseFloat(aValue);
        }

        if (typeof bValue === 'string' && !isURL(bValue) && bValue.includes(' kg')) {
            bValue = parseFloat(bValue);
        }

        // Realizar la comparación
        if (aValue < bValue) {
            return -1 * order;
        } else if (aValue > bValue) {
            return 1 * order;
        } else {
            return 0;
        }
    });

    // Cambiar el orden para la próxima vez
    orden = (orden === "asc") ? "desc" : "asc";

     printTable(itemsTable, headersTable, propertiesJSON);
}


//Ejercicio 2 :
// ---------------------------------------------------------------------------MÉTODOS PARA EL CANVAS - SOBRE ARRAY UNIDIMENSIONAL  ---------------------------------------------------------------------------------
function showHideButton() {
    let selectedOption = document.getElementById("selectorJSON").value;  
    let graficButton = document.getElementById("grafic");
      if (selectedOption === "pokemon" || selectedOption === "movies") {
      graficButton.style.display = "block";
    } else {
      graficButton.style.display = "none";
    }
  }
  //Funcion para obtener las labels del JSON de Pokemon y Movies
 function getArraysForGrafic(){

    let selectedOption = document.getElementById("selectorJSON").value;

    if(selectedOption === "pokemon" || selectedOption ==="movies"){
        //A través de un contador buscamos la propiedad que contiene una lista de la lista que usamos de propiedades en selectedJSON
        var counter = 0;
        var numberColumnWithList = 0;
        itemsTable[0].forEach((item => {
            if(Array.isArray(item)){
                numberColumnWithList = counter;
            }
            counter++;
        }));
        // Una vez encontrada la columna que posee la lista la añadimos a un nuevo array que tendrá datos duplicados
        let arrayLabelsWithDuplicateValues = [];
        itemsTable.forEach((item => {
            item[numberColumnWithList].forEach((subItem => {
                arrayLabelsWithDuplicateValues.push(subItem);
            }))
        }));
        //Pasamos la lista con valores duplicados a un set que no puede contener valores repetidos.
        dadesForGrafic = arrayLabelsWithDuplicateValues;
        labelsValues = Array.from(new Set(arrayLabelsWithDuplicateValues));
        counterDadesForGrafic = new Array(labelsValues.length).fill(0);  
        dadesForGrafic.forEach(dadaGrafic => {
            labelsValues.forEach((label, index) => {
                if (dadaGrafic === label) {
                    counterDadesForGrafic[index]++;
                }
            });
        });    
       
        

    }
    return;
  }


function getRGBColors(){
    border = new Array(labelsValues.length).fill(0);
    backgroundColor = new Array(labelsValues.length).fill(0);
    border.forEach((bor, index) => {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);

        let stringRGB = `rgb(${r},${g},${b})`;
        border[index] = stringRGB;
        backgroundColor[index]= `rgba(${r},${g},${b},0.2)` // Asignar el valor RGB al elemento en el índice actual del array border
    });

    border.forEach(bor => console.log(bor));
   
}

 function printGrafic(){
     restartTable();
     restartChart();
     getArraysForGrafic();
     getRGBColors();
     let labelGrafic = 	input = document.getElementById("selectorJSON").value == "pokemon" ? "Tipos de pokemon" : "Géneros de pelicula";
     const polarArea = document.getElementById("myChart");

    new Chart(polarArea , {
    type: 'polarArea',
    data:{
        labels: labelsValues,
            datasets: [{
            label: labelGrafic,
            data: counterDadesForGrafic,
            borderColor: border,
            backgroundColor: backgroundColor
            }],
          },
    options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });   
}
  
function restartTable(){
    let divTable = document.getElementById("result");   
	divTable.innerHTML="";
}
function restartChart(){
    const chart = document.getElementById("myChart")
    if(chart){
        let chartInstance = Chart.getChart(chart);
        if (chartInstance) {
            chartInstance.destroy(); // Destruye la instancia del gráfico si existe
        }
    }
}



// ---------------------------------------------------------------------------MÉTODOS SOBRE ARRAY MULTIDIMENSIONAL ---------------------------------------------------------------------------------
function getMultimensionalArrayFromUnidimensionalArray(){    
    
    // Obtener la longitud del arrayUnidimensional y el número de columnas
    let longitud = itemsTable.length;
    let numColumnas = itemsTable[0].length;
    
    // Iterar sobre las columnas
    for (let i = 0; i < numColumnas; i++) {
        // Crear una nueva columna (array)
        let columna = [];
        
        // Iterar sobre los elementos y añadir el valor de la columna correspondiente
        for (let j = 0; j < longitud; j++) {
            columna.push(itemsTable[j][i]);
        }
    
        // Añadir la columna al arrayMultidimensional
        arrayMultidimensional.push(columna);
    }
    
    
}




