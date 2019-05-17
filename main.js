const { app, BrowserWindow, ipcMain } = require('electron');

let main = null;
app.on('ready', () => {

    main = new BrowserWindow({
        width: 600,
        height: 700,
        resizable: false,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    main.loadURL(`file://${__dirname}/app/index.html`);
    //main.webContents.openDevTools();

    main.once('ready-to-show', () => {
        main.show();
    });

});

let janelaConfig = null;
ipcMain.on('abrir-janela-config', () => {

    if (janelaConfig == null) {
        janelaConfig = new BrowserWindow({
            width: 600,
            height: 350,
            alwaysOnTop: true,
            parent: main,
            frame: true,
            webPreferences: {
                nodeIntegration: true
            }
        });
        janelaConfig.on('close', () => {
            janelaConfig = null;
        });
    }
    janelaConfig.loadURL(`file://${__dirname}/app/config.html`);
    //janelaConfig.webContents.openDevTools();
});

ipcMain.on('salvar-config', (event, nomeEmpresa, ip) => {
    const ini = require('ini');
    const fs = require('fs');
    var config = [];
    config.empresa = nomeEmpresa;
    config.ip = ip;
    fs.writeFileSync('./config.ini', ini.stringify(config));
});

ipcMain.on('cancelar', () => {
    app.quit();
})

app.on('window-all-closed', () => {
    app.quit();
});
