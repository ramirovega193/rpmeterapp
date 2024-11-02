const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

let win
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 700,
    minHeight: 500,
    icon: path.join(__dirname, '/logos/logoWebp.webp'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Asegúrate de tener este archivo
      contextIsolation: true, // Para mayor seguridad
      enableRemoteModule: false, // Mantén deshabilitado el módulo remoto si no lo necesitas
      nodeIntegration: false, // Mantén deshabilitada la integración de Node.js en el proceso de renderizado
    },
  });

  win.loadURL('http://localhost:3000');

  ipcMain.on('open-new-window', () => {
    createNewWindow();
  });
}

function createNewWindow() {
  const newWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
    },
    /*frame: false */
  });

  newWin.loadURL('http://localhost:3000/home/grafico');
}

function createNewWindowTabla() {
  const newWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
    },
    /*frame: false */
  });

  newWin.loadURL('http://localhost:3000/home/tabla');
}

ipcMain.on('tabla', () => {
  createNewWindowTabla();
});






function createConfigWindow(){


  win.loadURL('http://localhost:3000/home/config');


}
function createActWindow(){


  win.loadURL('http://localhost:3000/home/activar');


}

const menu = Menu.buildFromTemplate([
  {
    label: 'Archivo',
    submenu: [
      {
        role: 'quit',
        label: 'Salir'
      },
    ],
  },
  {
    label: 'Vista',
    submenu: [
      { label: 'Recargar',
        role: 'reload' },
      { role: 'toggleDevTools',
        label: 'Herramientas de desarrollador'
       },
      { type: 'separator' },
      { role: 'resetZoom',
        label: 'Restaurar acercamiento'
       },
      { role: 'zoomIn',
        label: 'Acercar'
       },
      { role: 'zoomOut',
        label: 'Alejar'
       },
    ],
  },{

    label: 'Configuración',
    click(){
      createConfigWindow()
    }
  },
  {
    label: 'Activar cuenta',
    click(){
      createActWindow()
    }
  }
]);

Menu.setApplicationMenu(menu); 


app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});


