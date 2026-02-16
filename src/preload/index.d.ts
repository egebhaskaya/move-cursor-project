import { ElectronAPI } from '@electron-toolkit/preload'

interface Api {
  startKeepAwake: () => Promise<number>
  stopKeepAwake: () => Promise<void>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
