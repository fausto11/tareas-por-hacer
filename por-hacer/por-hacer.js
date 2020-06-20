const fs = require('fs');
const { throws } = require('assert');

//arreglo para guardar todas las notas
let listadoPorHacer = [];


//para hacer estos datos persistentes los guardo en db en formato json
//creamos una nueva funcion
const guardarDB = () => {
    //JSON.stringgify convierte un objeto a un json
    let data = JSON.stringify(listadoPorHacer);
    //grabamos la data en el archivo json
    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

// leer el archivo json y retornarlo al listado por hacer

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


}

//creamos la primera funcion
const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

// funcion listado
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

//funcion actualizar
const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

//funcion borrar

const borrar = (descripcion) => {
    cargarDB();
    //funcion filter de los arreglos

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion != descripcion;
    });

    if (listadoPorHacer.length == nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}