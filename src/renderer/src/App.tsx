import Header from './components/Header'
import { FC } from 'react'
import Options from './components/Options'

const App: FC = () => {
  return (
    <div className="container">
      <Header />
      <Options />
    </div>
  )
}

export default App
