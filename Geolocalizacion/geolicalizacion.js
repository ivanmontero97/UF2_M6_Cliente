propertiesJSON = ["id", "name", "year", "geolocation.coordinates"];
headersTable = ["Identificador", "Nombre", "Año", "Geolocalización", "Mapas"];
// Definición de variables globales
let mymap; // Variable global para almacenar el mapa
let marker; // Variable global para almacenar el marcador

// Función principal para ejecutar el código al hacer clic en el botón
async function execute() {
    try {
        // Obtener datos de meteoritos desde el archivo JSON
        let meteoritos = await getArrayFromJSON("", "earthMeteorites.json", propertiesJSON);
        // Imprimir la tabla con los datos y los botones para ver el mapa
        printTable(meteoritos, headersTable);
    } catch (error) {
        console.error('Error en la ejecución:', error);
    }
}

// Función para obtener un array de datos desde un archivo JSON
async function getArrayFromJSON(propiedadPrincipal = null, file, propertiesJSON) {
    try {
        // Obtener la respuesta del servidor
        const response = await fetch(file);
        // Convertir la respuesta a formato JSON
        const data = await response.json();
        // Inicializar un array para almacenar los datos de la tabla
        let itemsTable = [];
        // Obtener el array de datos o el array principal según la propiedad proporcionada
        let dataJSON = Array.isArray(data) ? data : data[propiedadPrincipal];

        // Iterar sobre los datos para procesarlos y formar el array de la tabla
        dataJSON.forEach((dades) => {
            let value = Array.isArray(dataJSON) ? [] : "";
            let geolocation = dades.geolocation ? dades.geolocation.coordinates : null;

            if (Array.isArray(value)) {
                // Si el valor es un array, procesar cada propiedad
                propertiesJSON.forEach((property) => {
                    if (property === "geolocation.coordinates" && geolocation) {
                        value.push(...geolocation);
                    } else {
                        value.push(dades[property]);
                    }
                });
            } else {
                // Si el valor no es un array, asignar el valor directamente
                value = dades[propertiesJSON];
                // Asignar la propiedad de geolocalización
                value.geolocation = geolocation;
            }

            // Agregar el valor procesado al array de la tabla
            itemsTable.push(value);
        });

        // Devolver el array de la tabla
        return itemsTable;
    } catch (error) {
        console.error('Error al obtener o procesar los datos:', error);
        throw error;
    }
}

// Función para imprimir la tabla con los datos y los botones para ver el mapa
function printTable(itemsTable, headersTable) {
    restartTable();

    let div = document.getElementById("result");
    let table = document.createElement("table");
    let tableHeaderRow = document.createElement("tr");

    headersTable.forEach((head) => {
        let th = document.createElement("th");
        th.textContent = head;
        tableHeaderRow.appendChild(th);
    });

    table.appendChild(tableHeaderRow);

    itemsTable.forEach((item, index) => {
        let rowItem = document.createElement("tr");

        headersTable.forEach((header, i) => {
            let tdItem = document.createElement("td");

            if (header === "Geolocalización") {
                // Mostrar ambos valores en la misma columna de geolocalización
                tdItem.textContent = `${item[3]} - ${item[4]}`;
            } else if (header === "Mapas") {
                // Crear un botón para ver el mapa
                let button = document.createElement('button');
                button.textContent = "Ver Mapa";
                button.onclick = function () {
                    showMap(item[3], item[4], item[1]);
                };
                tdItem.appendChild(button);
            } else {
                tdItem.textContent = item[i];
            }

            rowItem.appendChild(tdItem);
        });

        table.appendChild(rowItem);
    });

    div.appendChild(table);
}

// Función para reiniciar la tabla limpiando el contenedor de resultados en el HTML
function restartTable() {
    let divTable = document.getElementById("result");

    if (divTable) {
        divTable.innerHTML = "";
    } else {
        console.error('Elemento con el id "result" no encontrado.');
    }
}

// Función para mostrar el mapa con Leaflet
function showMap(lat, lon, name) {
    // Comprobar si ya existe un mapa y un marcador, y cerrarlos si es así
    if (mymap || marker) {
        closeMap(); // Cerrar el mapa y el marcador existentes antes de crear uno nuevo
    }

    // Crear el mapa en el contenedor especificado en el HTML
    mymap = L.map('result').setView([lat, lon], 5);

    // Añadir la capa del mapa base desde OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);

    // Añadir un marcador en la ubicación especificada
    marker = L.marker([lat, lon]).addTo(mymap)
        .bindPopup(name)
        .openPopup();
}

// Función para cerrar el mapa y el marcador
function closeMap() {
    // Comprobar si ya existe un mapa y cerrarlo si es así
    if (mymap) {
        mymap.remove();
        mymap = null;
    }

    // Comprobar si ya existe un marcador y cerrarlo si es así
    if (marker) {
        marker.remove();
        marker = null;
    }
} 

function reloadPage(){
	location.reload();
}
// Llamada inicial a la función execute al cargar la página
execute();
