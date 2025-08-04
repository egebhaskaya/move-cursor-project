import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  moveMouseSmooth: (x: number, y: number, speed: number) =>
    ipcRenderer.invoke('move-mouse-smooth', x, y, speed),
  getMousePosition: () => ipcRenderer.invoke('get-mouse-position'),
  setMouseDelay: (delay: number) => ipcRenderer.invoke('set-mouse-delay', delay),
  getScreenCenter: () => ipcRenderer.invoke('get-screen-center')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
