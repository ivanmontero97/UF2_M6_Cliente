export class Cicle{
    constructor(nom,categoria,numAlumnes,abreviatura){
        this.nom=nom;
        this.categoria=categoria;
        this.numAlumnes=numAlumnes;
        this.abreviatura=abreviatura;
        this.numEdicions=0;
        this.lastEditDate = null;
        this.moduls = [];
    }
    get nom_(){
        return this.nom;
    }
    set nom_(value){
        this.nom=value;
    }
    get categoria_(){
        return this.categoria;
    }
    set categoria_(value){
        this.categoria=value;
    }
    get numAlumnes_(){
        return this.numAlumnes;
    }
    set numAlumnes_(value){
        this.numAlumnes=value;
    }
    get abreviatura_(){
        return this.abreviatura;
    }
    set abreviatura_(value){
        this.abreviatura=value;
    }
    setnumEdicions(){
        this.numEdicions++;
    }
    setLastDateEdit(){
        this.lastEditDate= new Date();
    }
    get moduls_() {
        return this.moduls;
    }
    // Función para agregar un módulo a la lista de módulos
    añadirModulo(modul) {
    this.moduls.push(modul);
    // Ordenar la lista de módulos por su número
    this.moduls.sort((a, b) => a.num - b.num);
    }
    toString() {
        let result = `Cicle: ${this.abreviatura.toUpperCase()}. ${this._nom}\n`;
        result += `Categoria: ${this.categoria}\n`;
        result += `Num d'alumnes: ${this.numAlumnes}\n`;

        // Imprimir información de cada módulo
        if (this.moduls.length > 0) {
            result += "\nMòduls:\n";
            this.moduls.forEach((modul) => {
                result += `  ${modul.num}: ${modul.nom} (${modul.hores} hores)\n`;
            });
        }

        return result;
    }

       // Función para calcular las horas totales del cicle
       calculaHorasCiclo() {
        let horesTotal = 0;

        // Sumar las horas de cada módulo
        this.moduls.forEach((modul) => {
            horesTotal += modul.hores;
        });

        return horesTotal;
    }
}