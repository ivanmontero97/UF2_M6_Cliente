var itemsTable = [];
var headersTable =[];
var recargaPagina;

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


//Funciones propias del ejercicio y algunas adicionales
async function printTable(itemsTable,headersTable) {
	let div = document.getElementById("result");
	div.innerHTML="";
	let table = document.createElement("table");
	let tableHeaderRow = document.createElement("tr");
	headersTable.forEach((head)=>{
		let th = document.createElement("th");
		th.textContent = head;
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
async function getJSONData() {
	itemsTable.length=0; //Reiniciamos el array 
	headersTable.length=0 ; //Reiniciamos headers
	input = document.getElementById("selectorJSON").value;
	

	switch(input){
		case "pokemon":
			propertiesJSON = ["num","name","img","weight"];
			headersTable = ["Número","Nombre","Imágen" ,"Peso"]
			await getArrayFromJSON("pokemon","js/data/pokemon.json",propertiesJSON);
			printTable(itemsTable,headersTable);
			break;
		case "municipis":
			propertiesJSON = ["ine","municipi_nom","nombre_habitants", "extensio", "altitud", "municipi_escut"];
			headersTable = ["INE :","Nombre del municipio ","Nº de habitantes" ,"Extensión", "Altitud" , "Escudo municipio"]
			await getArrayFromJSON("elements","js/data/municipis.json",propertiesJSON);
			printTable(itemsTable,headersTable);
			break;
		case "meteoritos":
			propertiesJSON = ["id","name", "year","mass"];
			headersTable = ["Identificador","Nombre","Año" ,"Masa"]
			await getArrayFromJSON("","js/data/earthMeteorites.json",propertiesJSON);
			printTable(itemsTable,headersTable);
			break;
		case "movies":
			propertiesJSON=["title","genres", "year","url"];
			headersTable = ["Título","Genero","Año" ,"Imágen"] 
			await getArrayFromJSON("movies","js/data/movies.json",propertiesJSON);
			printTable(itemsTable,headersTable);
			break;
		default:
			return null;
	}
	
}
//Funcion que calcula el array de items de la tabla. Sus parámetros de entrada son el path del JSON y las columnas(propiedades del JSON) a mostrar en la tabla.
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
                    itemsTable.forEach((item) => console.log(item));
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
function ordenar(orden) {	

	let orderArray = itemsTable;
	if (orden === "asc") {
		orderArray.sort();
	} else if (orden === "desc") {
		orderArray.sort().reverse();
	}

	printTable(orderArray,headersTable);
}
function abrirBuscador() {
    var contenedorBuscador = document.getElementById('contenedorBuscador');
    var inputBuscador = document.getElementById('inputBuscador');

    // Cambia el contenido HTML del contenedor para sustituir el botón por el input
    contenedorBuscador.innerHTML = '';
    contenedorBuscador.appendChild(inputBuscador);

    // Muestra el input
    inputBuscador.style.display = 'block';
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
    printTable(searchArray, headersTable);
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

	



