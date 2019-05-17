const { ipcRenderer } = require('electron');
const ini = require('../../iniHelper');

const salvar = document.querySelector('#salvar');

let nomeEmpresa = document.querySelector('#nomeEmpresa');
let ip = document.querySelector('#ip');

nomeEmpresa.value = ini.empresa;
ip.value = ini.ip;

salvar.addEventListener('click', function () {

    nomeEmpresa = document.querySelector('#nomeEmpresa').value;
    ip = document.querySelector('#ip').value;

    ipcRenderer.send('salvar-config', nomeEmpresa, ip);
});