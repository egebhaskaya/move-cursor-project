import Header from './components/Header'
import { FC } from 'react'
import Options from './components/Options'

declare global {
  interface Window {
    api: {
      moveMouseSmooth: (x: number, y: number, speed: number) => void
      getMousePosition: () => Promise<{ x: number; y: number }>
      setMouseDelay: (delay: number) => void
      getScreenCenter: () => Promise<{ x: number; y: number }>
    }
  }
}

const App: FC = () => {
  return (
    <div className="container">
      <Header />
      <Options />
    </div>
  )
}

export default App
