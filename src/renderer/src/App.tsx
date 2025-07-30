import Versions from './components/Versions'
import { DatePicker } from 'antd'

declare global {
  interface Window {
    api: {
      moveMouse: (x: number, y: number) => void
    }
  }
}

function App(): React.JSX.Element {
  const moveMouse = (): void => {
    console.log(window.api)
    window.api.moveMouse(100, 100)
  }

  return (
    <>
      <button onClick={moveMouse}>test</button>
      <DatePicker />
      <Versions></Versions>
    </>
  )
}

export default App
