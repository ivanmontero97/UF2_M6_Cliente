function arrayColors(){
    
    let colors = ["verd", "vermell", "groc", "blau", "negre", "blanc"];

    //Pintar Array Original
    document.getElementById("listaOriginal").innerHTML = "Parte 1 - Array de colores"
    colors.forEach((item,index) => {
        document.getElementById("arrays").innerHTML += item + " : " + index + "<br>"
    });

    // ¿Todos los colores del array son menores que marron ?
    document.getElementById("arrays").innerHTML+="<br><br><b>¿Todos los colores del array son menores que marron ? </b><br><br> ";
    colors.every((colors)=>{
       document.getElementById("arrays").innerHTML += colors < "marró" +"<br>";
    })
    // Array con los colores menores que marron
    let coloresMenores = colors.filter((colors)=>{
       return colors < "marró";
    })
    document.getElementById("arrays").innerHTML+="<br><br><b> Array con los colores menores que marron </b><br><br>";
    coloresMenores.forEach((item,index)=>{
        document.getElementById("arrays").innerHTML +=  item + " : " + index + "<br>";
    });
    //Devolver los últimos dos elementos
    let lastElement = colors.pop();
    let penultimateElement = colors.pop();
    document.getElementById("arrays").innerHTML += "<br><br><b> Devolver los últimos dos elementos </b><br><br>"+lastElement +"<br>" + penultimateElement +"<br><br>";
    colors.forEach((item,index)=>{
        document.getElementById("arrays").innerHTML += item + " : " + index + "<br>"
    })
    //Añadir el color turquesa
    document.getElementById("arrays").innerHTML+="<br><br><b>Añadir el color turquesa </b><br><br>";
    colors.push("turquesa");
    colors.forEach((item,index)=>{
        document.getElementById("arrays").innerHTML += item + " : " + index + "<br>"
    })
    //Eliminar el color verde
    colors.shift();
    document.getElementById("arrays").innerHTML+="<br><br><b>Eliminar el color verde</b> <br><br>";
    colors.forEach((item,index)=>{
        document.getElementById("arrays").innerHTML += item + " : " + index + "<br>"
    })
}
function arrayMethods(){
    document.getElementById("arrayMethods").innerHTML = "Parte 2 - Metódos de arrays"
    let arrayForMethods=["Teclado","Raton","Monitor","CPU","GPU","RAM","Fuente de alimentacion","Placa Base"];
    document.getElementById("printMethods").innerHTML+=" <b> Array Original : " + recorrerArray(arrayForMethods)  +  "</b> <br><br>";
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"
    recorrerArray(arrayForMethods);
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> at() </u> <b>Expresión usada :</b> arrayForMethods.at(arrayForMethods.length -1)  <b>|  Resultado :</b> " + arrayForMethods.at(arrayForMethods.length -1) + "<br><br>";
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"
    let arrayConcat = ["elemento1","elemento2"];
    let newArray = arrayForMethods.concat(arrayConcat);
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> concat() </u> <b>Expresión usada :</b> let arrayConcat = ['elemento1','elemento2'] let newArray = arrayForMethods.concat(arrayConcat); <b>|  Resultado :</b> " + recorrerArray(newArray) + "<br><br>";
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    let text = arrayForMethods.constructor;
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> constructor </u> <b>Expresión usada :</b> let text = arrayForMethods.constructor;  <b>|  Resultado :</b> " + text + "<br><br>";
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    let copiedArray = arrayForMethods.slice();
    copiedArray.copyWithin(2,0,2)
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> copyWithin()</u><b> Expresión usada :</b>  arrayForMethods.copyWithin(2,0,2)  <b>|  Resultado :</b> " + recorrerArray(copiedArray) + "<br><br>" 
     + " <b>Explicacion : <br> arr.copyWithin(target, start, end)</b> <br><br>target: Índice donde se iniciará la copia. <br> start (opcional): Índice donde comenzará la extracción de elementos. Por defecto es 0. <br>end (opcional): Índice donde se detendrá la extracción de elementos. Por defecto es arr.length.<br><br>";
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    let arrayEntries = arrayForMethods.entries();
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> entries()</u> The entries() method returns an Array Iterator object with key/value pairs: <b> Expresión usada :</b> let arrayEntries = arrayForMethods.entries(); <b>|  Resultado :</b> " ;
    for (let x of arrayEntries) {
        document.getElementById("printMethods").innerHTML +="<br>" + x ;
      }
    document.getElementById("printMethods").innerHTML+="<br><br>";
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //every()
    function checkA(item){
        return item.includes('a');
    }
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> every() </u><br> <b>Expresión usada :</b> <br> function checkA(item){ <br> return item.includes('a');  <br>  } <br> arrayForMethods.every(checkA)   <b>| <br> Resultado :</b> " + arrayForMethods.every(checkA) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //fill()
    let copiedArray2 = arrayForMethods.slice();
    copiedArray2.fill('AMDRyzen7',2,4);
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> fill() </u><br> <b>Expresión usada :<br></b> let copiedArray2 = arrayForMethods.slice();<br>  copiedArray2.fill('AMDRyzen7',2,4);<br>   <b>|  Resultado :</b> " + recorrerArray(copiedArray2) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //filter()
    let copiedArray3 = arrayForMethods.filter(checkA);
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> filter() </u> <b>Expresión usada :</b>let copiedArray3 = copiedArray3.filter(checkA);   <b>|  Resultado :</b> " + recorrerArray(copiedArray3) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //find()
    let itemFinded = arrayForMethods.find(checkA);
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> find() </u> <b>Expresión usada :</b>let itemFinded = arrayForMethods.find(checkA);   <b>|  Resultado :</b> " + itemFinded + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    // findIndex()
    let itemFindedIndex = arrayForMethods.findIndex(checkA);
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> findIndex() </u> <b>Expresión usada :</b>let itemFindedIndex = arrayForMethods.findIndex(checkA);   <b>|  Resultado :</b> " + itemFindedIndex + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"
    //flat()
    let auxArray = [["Intel","Radeon"],["RTX,GTX"],["SSD","HDD"]];
    let newArrayAux = auxArray.flat();  
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> flat() </u> <b>Expresión usada :</b><br> let auxArray = [['Intel','Radeon'],['RTX,GTX'],['SSD','HDD']]; <br>  let newArrayAux = auxArray.flat; <br>  <b>|  Resultado :</b> " + recorrerArray(newArrayAux) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //flatMap()
    let newArrayFlatMap  = arrayForMethods.flatMap((x)=> x+"A");
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> flatMap() </u> <b>Expresión usada :</b>  let newArrayFlatMap  = arrayForMethods.flatMap((x)=> x+'A'); <b>|  Resultado :</b> " + recorrerArray(newArrayFlatMap) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //forEach();
    let copiedArrayForEach = arrayForMethods.slice();
    function testFunction(item, index, array) {
        array[index] = item + "ForEach";
    }
    copiedArrayForEach.forEach(testFunction);
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> forEach() </u> <b>Expresión usada :</b><br> let copiedArrayForEach = arrayForMethods.slice();<br> function testFunction(item, index, array) { <br>  array[index] = item + 'ForEach';  <br> } <br>  }<br>copiedArrayForEach.forEach(testFunction);<br>  <b>|  Resultado :</b> " + recorrerArray(copiedArrayForEach) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //from();
    let conversionToArray = 'convertirEnArray';
    let arrayFrom = Array.from(conversionToArray);
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> from() </u> <b>Expresión usada :</b><br>let conversionToArray = 'convertirEnArray'; <br> <b>|  Resultado :</b> " + recorrerArray(arrayFrom) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //includes();
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> includes() </u> <b>Expresión usada :</b> arrayForMethods.includes('Raton',1) <b>|  Resultado :</b> " + arrayForMethods.includes('Raton',1) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //indexOf()
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> indexOf() </u> <b>Expresión usada :</b> arrayForMethods.indexOf('CPU') <b>|  Resultado :</b> " + arrayForMethods.indexOf('CPU') + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //isArray()
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> Array.isArray(posibleArray) </u> <b>Expresión usada :</b> Array.isArray(arrayForMethods)  <b>|  Resultado :</b> " + Array.isArray(arrayForMethods) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //join()
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> join() </u> <b>Expresión usada :</b> arrayForMethods.join()  <b>|  Resultado :</b> " + arrayForMethods.join() + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="En JavaScript, un Array Iterator es un objeto que proporciona una forma de acceder a<br>los elementos de un array secuencialmente. Estos objetos Iterator se utilizan para <br>recorrer los elementos de un array uno por uno, permitiendo operaciones específicas <br>en cada uno de ellos.<br> <br>El Array Iterator se obtiene utilizando algunos métodos específicos de los arrays, como entries(), keys(), values(), o utilizando bucles for...of.<br><br> Existen tres tipos principales de Array Iterator: <br><br><b> entries():</b> Retorna un nuevo objeto Iterator que contiene pares clave/valor para cada índice en el array.<br><b>keys():</b> Retorna un nuevo objeto Iterator que contiene los índices de los elementos del array.<br><b>values():</b> Retorna un nuevo objeto Iterator que contiene los valores de los elementos del array.<br><br>"
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //keys()
    let keys = arrayForMethods.keys();
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> keys() </u>The keys() method returns an Array Iterator object with the keys of an array. <br> The keys() method does not change the original array.<br>  <b>Expresión usada :</b> for (let key of keys) {<br>document.getElementById('printMethods').innerHTML+=key <br>}<br> <b>|  Resultado :</b><br> ";
    for (let key of keys) {
        document.getElementById("printMethods").innerHTML+=key;
    }
    document.getElementById("printMethods").innerHTML+="<br><br>";
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //lastIndexOf()
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> lastIndexOf() </u> <b>Expresión usada :</b> arrayForMethods.lastIndexOf('Placa Base');  <b>|  Resultado :</b> " + arrayForMethods.lastIndexOf("Placa Base") + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //length()
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> length() </u> <b>Expresión usada :</b> arrayForMethods.length ;  <b>|  Resultado :</b> " + arrayForMethods.length + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //map()
    let newArrayMap = arrayForMethods.map(checkA);
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> map() </u> creates a new array from calling a function for every array element. <b>Expresión usada : </b>  let newArrayMap = arrayForMethods.map(checkA);  <b>|  Resultado :</b> " + recorrerArray(newArrayMap) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //pop()
    let copiedArray4 = arrayForMethods.slice();
    copiedArray4.pop();
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> pop() </u> <b>Expresión usada : </b> let copiedArray4 = arrayForMethods.slice();<br> copiedArray4.pop();   <b>|  Resultado :</b> " + recorrerArray(copiedArray4) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //prototype
    Array.prototype.myUcase = function() {
        for (let i = 0; i < this.length; i++) {
          this[i] = this[i].toUpperCase();
        }
      };
    let copiedArray5 = arrayForMethods.slice();
    copiedArray5.myUcase();
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> prototipe </u><br> prototype allows you to add new properties and methods to arrays.<br>prototype is a property available with all JavaScript objects.<br> <b>Expresión usada : </b> Array.prototype.myUcase = function() {<br>  for (let i = 0; i < this.length; i++) {<br> this[i] = this[i].toUpperCase();<br>  }<br>};<br>let copiedArray5 = arrayForMethods.slice();<br>copiedArray5.myUcase();   <br><b>|  Resultado :</b> " + recorrerArray(copiedArray5) + "<br><br>" ; 
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //push()
    let copiedArray6 = arrayForMethods.slice();
    copiedArray6.push('Ejemplo Nuevo');
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> push() </u> <b>Expresión usada :</b>  let copiedArray6 = arrayForMethods.slice();<br>copiedArray6.push('Ejemplo Nuevo');<br> <b>|  Resultado :</b> " + recorrerArray(copiedArray6) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //reduce()
    let numbers = [175, 50, 25];
    function myFunc(total, num) {
        return total - num;
    }   
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> reduce() </u> <b>Expresión usada :</b>let numbers = [175, 50, 25];<br>function myFunc(total, num) {<br>return total - num;<br>}<br>numbers.reduce(myFunc) <br>  <b>|  Resultado :</b> " + numbers.reduce(myFunc) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //reduceRight()
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> reduceRight() </u> <b>Expresión usada :</b>let numbers = [175, 50, 25];<br>function myFunc(total, num) {<br>return total - num;<br>}<br>numbers.reduceRight(myFunc) <br>  <b>|  Resultado :</b> " + numbers.reduce(myFunc) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //reverse()
    let copiedArray7 = arrayForMethods.reverse();
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> reverse() </u> <b>Expresión usada :</b>let copiedArray7 = arrayForMethods.reverse(); <b>|  Resultado :</b> " + recorrerArray(arrayForMethods) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //shift()
    let copiedArray8 = arrayForMethods.slice();
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> shift() </u> <b>Expresión usada :</b> let copiedArray8 = arrayForMethods.slice();<br> copiedArray8.shift(); <b>|  Resultado :</b> " + recorrerArray(copiedArray8) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //slice()
    let copiedArray9 = arrayForMethods.slice();
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> slice() </u> <b>Expresión usada :</b> let copiedArray9 = arrayForMethods.slice(); <b>|  Resultado :</b> " + recorrerArray(copiedArray9) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //some()
    function checkGPU(array) {
        return array == "GPU";
      }
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> some() </u> <b>Expresión usada :</b> function checkGPU(array) {<br>return age == 'GPU';<br>}<br>  <b>|  Resultado :</b> " + arrayForMethods.some(checkGPU) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //sort()
    let copiedArray10 = arrayForMethods.slice();
    copiedArray10.sort();
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> sort() </u> <b>Expresión usada :</b> let copiedArray10 = arrayForMethods.slice();<br> copiedArray10.sort();<br>  <b>|  Resultado :</b> " + recorrerArray(copiedArray10) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //splice()
    let arraySplice =  arrayForMethods.slice();
    arraySplice.splice(2,2,"Ejemplo1","Ejemplo2"); 
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> splice() </u> <b>Expresión usada :</b> let arraySplice =  arrayForMethods.slice();<br>arraySplice.splice(2,2,'Ejemplo1','Ejemplo2');<br>   <b>|  Resultado :</b> " + recorrerArray(arraySplice) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //toString()
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> toString() </u> <b>Expresión usada :</b> arrayForMethods.toString();   <b>|  Resultado :</b> " + arrayForMethods.toString() + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //unshift();
    let copiedArray11 = arrayForMethods.slice();
    copiedArray11.unshift("Nuevo Elemento en primera posicion");
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> unshift() </u> <b>Expresión usada :</b> let copiedArray11 = arrayForMethods.slice();<br>copiedArray11.unshift('Nuevo Elemento en primera posicion');<br>   <b>|  Resultado :</b> " + recorrerArray(copiedArray11) + "<br><br>" ;
    document.getElementById("printMethods").innerHTML+="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>"

    //valueOf();
    let valueofArray = arrayForMethods.valueOf();
    document.getElementById("printMethods").innerHTML+="<b>|   Metodo :</b><u> valueOf() </u> <b>Expresión usada :</b>let valueofArray = arrayForMethods.valueOf();  <b>|  Resultado :</b> " + recorrerArray(valueofArray) + "<br><br>" ;

    //Función que recorre un array y lo pasa  a string para poder pintarlo por pantalla a través de inner.HTML
    function recorrerArray(array) {
        let strArray = ' [ ';
        array.forEach((item, index) => {
            strArray += item;
            if (index !== array.length - 1) {
                strArray += " , ";
            }
        });
        strArray += " ] ";
        return strArray;
    }
    
    
}
