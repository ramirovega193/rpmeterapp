const { contextBridge, ipcRenderer } = require('electron');

// Exponer ipcRenderer al proceso de renderizado de forma segura
contextBridge.exposeInMainWorld('electron', {
  openNewWindow: () => ipcRenderer.send('open-new-window'),
});