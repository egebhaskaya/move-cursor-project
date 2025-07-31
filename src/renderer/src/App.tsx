import { Button, Segmented } from 'antd'
import Header from './components/Header'

declare global {
  interface Window {
    api: {
      moveMouse: (x: number, y: number) => void
    }
  }
}

function App(): React.JSX.Element {
  const moveMouse = (): void => {
    window.api.moveMouse(100, 100)
  }

  return (
    <div className="container">
      <Header />
      <Segmented<string>
        options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
        onChange={(value) => {
          console.log(value) // string
        }}
      />
      <Button onClick={moveMouse}>test</Button>
    </div>
  )
}

export default App
