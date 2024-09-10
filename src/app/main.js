const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let win
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth:700,
    minHeight:500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  win.loadURL('http://localhost:3000');
}

function createConfigWindow(){


  win.loadURL('http://localhost:3000/config');


}
function createActWindow(){


  win.loadURL('http://localhost:3000/activar');


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
