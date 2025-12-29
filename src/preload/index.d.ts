import { ElectronAPI } from '@electron-toolkit/preload'

interface DisplayBounds {
  cursor: { x: number; y: number }
  bounds: { x: number; y: number; width: number; height: number }
  workArea: { x: number; y: number; width: number; height: number }
  scaleFactor: number
}

interface Api {
  moveMouseSmooth: (x: number, y: number, speed: number) => Promise<void>
  getMousePosition: () => Promise<{ x: number; y: number }>
  setMouseDelay: (delay: number) => Promise<void>
  getScreenCenter: () => Promise<{ x: number; y: number }>
  getCurrentDisplayBounds: () => Promise<DisplayBounds>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
