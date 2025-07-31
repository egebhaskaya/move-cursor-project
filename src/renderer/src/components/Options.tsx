import { Button, Segmented } from 'antd'
import { FC, useState } from 'react'

const Options: FC = () => {
  const [tabIndex, setTabIndex] = useState('Speed')

  const moveMouse = (): void => {
    window.api.moveMouseSmooth(100, 100, 5)
  }

  return (
    <div className="options">
      <Segmented<string>
        options={['Speed', 'Shape', 'Interval']}
        onChange={(value) => {
          setTabIndex(value)
        }}
      />

      {tabIndex === 'Speed' && <div>Speed Options</div>}
      {tabIndex === 'Shape' && <div>Shape Options</div>}
      {tabIndex === 'Interval' && <div>Interval Options</div>}

      <Button onClick={moveMouse}>Go!</Button>
    </div>
  )
}

export default Options
