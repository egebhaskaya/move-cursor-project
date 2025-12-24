import { Button, Radio, Segmented } from 'antd'
import { FC, useState } from 'react'

const Options: FC = () => {
  const [tabIndex, setTabIndex] = useState('Speed')

  const [speedValue, setSpeedValue] = useState<number>(2)
  const [shapeValue, setShapeValue] = useState<string>('Square')
  const [intervalValue, setIntervalValue] = useState<number>(180)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  const onChangeSpeed = (e: import('antd').RadioChangeEvent): void => {
    setSpeedValue(e.target.value)
  }

  const onChangeShape = (e: import('antd').RadioChangeEvent): void => {
    setShapeValue(e.target.value)
  }

  const onChangeInterval = (e: import('antd').RadioChangeEvent): void => {
    setIntervalValue(e.target.value)
  }

  const moveMouse = (): void => {
    if (shapeValue === 'Circle') {
      shapeCircle() // Immediate start
      const interval = setInterval(() => {
        shapeCircle()
      }, intervalValue * 1000)
      setIntervalId(interval)
    } else {
      shapeSquare() // Immediate start
      const interval = setInterval(() => {
        shapeSquare()
      }, intervalValue * 1000)
      setIntervalId(interval)
    }
  }

  const stopMouse = (): void => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
  }

  const shapeCircle = async (): Promise<void> => {
    const radius = 100 // pixels
    const center = await window.api.getScreenCenter()
    window.api.moveMouseSmooth(center.x, center.y, speedValue)

    // Increase step size for faster movement (e.g., every 10 degrees)
    for (let angle = 0; angle <= 360; angle += 5) {
      const rad = angle * (Math.PI / 180)
      const x = center.x + radius * Math.cos(rad)
      const y = center.y + radius * Math.sin(rad)
      window.api.moveMouseSmooth(x, y, speedValue)
    }

    window.api.moveMouseSmooth(center.x, center.y, speedValue)
  }

  const shapeSquare = async (): Promise<void> => {
    const size = 200
    const center = await window.api.getScreenCenter()
    window.api.moveMouseSmooth(center.x, center.y, speedValue)

    const halfSize = size / 2

    const corners = [
      { x: center.x - halfSize, y: center.y },
      { x: center.x - halfSize, y: center.y - halfSize },
      { x: center.x + halfSize, y: center.y - halfSize },
      { x: center.x + halfSize, y: center.y + halfSize },
      { x: center.x - halfSize, y: center.y + halfSize },
      { x: center.x - halfSize, y: center.y }
    ]
    for (const corner of corners) {
      window.api.moveMouseSmooth(corner.x, corner.y, speedValue)
    }
    window.api.moveMouseSmooth(center.x, center.y, speedValue)
  }

  return (
    <div className="options">
      <Segmented<string>
        options={['Speed', 'Shape', 'Interval']}
        onChange={(value) => {
          setTabIndex(value)
        }}
      />

      {tabIndex === 'Speed' && (
        <div>
          <Radio.Group
            onChange={onChangeSpeed}
            value={speedValue}
            options={[
              { value: 2, label: 'Very Fast' },
              { value: 4, label: 'Fast' },
              { value: 6, label: 'Moderate' },
              { value: 8, label: 'Slow' },
              { value: 10, label: 'Very Slow' }
            ]}
          />
        </div>
      )}
      {tabIndex === 'Shape' && (
        <div>
          <Radio.Group
            onChange={onChangeShape}
            value={shapeValue}
            options={[
              { value: 'Circle', label: 'Circle' },
              { value: 'Square', label: 'Square' }
            ]}
          />
        </div>
      )}
      {tabIndex === 'Interval' && (
        <div>
          <Radio.Group
            onChange={onChangeInterval}
            value={intervalValue}
            options={[
              { value: 5, label: '5 Seconds' },
              { value: 15, label: '15 Seconds' },
              { value: 30, label: '30 Seconds' },
              { value: 60, label: '1 Minute' },
              { value: 180, label: '3 Minutes' },
              { value: 300, label: '5 Minutes' }
            ]}
          />
        </div>
      )}

      <div className="button-container">
        {intervalId ? (
          <Button disabled color="yellow" variant="solid" loading>
            Working!
          </Button>
        ) : (
          <Button color="primary" onClick={moveMouse}>
            Go!
          </Button>
        )}
        <Button color="danger" variant="outlined" onClick={stopMouse}>
          Stop
        </Button>
      </div>
    </div>
  )
}

export default Options
