import Header from './components/Header'
import { FC } from 'react'
import Options from './components/Options'

declare global {
  interface Window {
    api: {
      moveMouseSmooth: (x: number, y: number, speed: number) => void
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
