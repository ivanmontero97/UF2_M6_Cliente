// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	dades = data.pokemon;		
	let pokemonArray = new Array();
	dades.forEach((data => { pokemonArray.push(data.name)}));
	pokemonArray.forEach((data => { console.log(data)}));
});




// // MUNICIPIS
// fetch("js/data/municipis.json")
// .then((response) => response.json())
// .then((data) => {
// 	dades = data.elements;		
// 	var municipisArray = new Array();	
// 	dades.forEach((data => { municipisArray.push(data.municipi_nom)}));
// 	municipisArray.forEach((data => { console.log(data)}));
// });



// METEORITS
// fetch("js/data/earthMeteorites.json")
// .then((response) => response.json())
// .then((data) => {
// 	dades = data;	
// 	let meteoritosArray = new Array();	
// 	dades.forEach((data => { meteoritosArray.push(data.name	)}));
// 	meteoritosArray.forEach((data => { console.log(data)}));
// });


// MOVIES
// fetch("js/data/movies.json")
// .then((response) => response.json())
// .then((data) => {
// 	dades = data.movies;	
// 	let peliculasArray = new Array();	
// 	dades.forEach((data => {
// 		peliculasArray.push(data.title);
// 	}))	
// 	peliculasArray.forEach((data => {
// 		console.log(data);
// 	}));


// });

