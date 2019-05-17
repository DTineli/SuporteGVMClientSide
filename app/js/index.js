const { ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;

const ini = require('../../iniHelper');

let config = document.querySelector('#link-config');
let cancelar = document.querySelector('#cancelar');
const agendar = document.querySelector('#agendar');

config.addEventListener('click', function () {
    ipcRenderer.send('abrir-janela-config');
});

cancelar.addEventListener('click', function () {
    ipcRenderer.send('cancelar');
});

agendar.addEventListener('click', function () {
    const nome = document.querySelector('#nome').value;
    const motivo = document.querySelector('#motivo').value;

    if (nome == '' || motivo == '') {
        dialog.showMessageBox({
            type: 'warning',
            title: 'Atenção',
            message: 'Preencha os campos nome e motivo'
        });
    } else {
        const axios = require('axios');

        axios.post(ini.ip + '/chamado', {
            nome: nome,
            motivo: motivo,
            empresa: ini.empresa
        }, { timeout: 8000 })
            .then((res) => {
                if (res.status != 200) {
                    dialog.showErrorBox('ERRO', 'Erro ao criar chamado ' + res.status);
                } else {
                    dialog.showMessageBox({
                        type: 'info',
                        title: 'Sucesso!',
                        message: 'Chamado criado com sucesso'
                    });
                    document.querySelector('#nome').value = '';
                    document.querySelector('#motivo').value = '';
                }
            })
            .catch((error) => {
                dialog.showErrorBox('ERRO', 'Erro ao criar chamado' + error);
            });
    }

});