import { Button } from 'antd'
import { FC, useState, useEffect, useRef } from 'react'

const formatElapsed = (seconds: number): string => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  const parts: string[] = []
  if (h > 0) parts.push(`${h}h`)
  if (m > 0) parts.push(`${m}m`)
  parts.push(`${s}s`)
  return parts.join(' ')
}

const Options: FC = () => {
  const [active, setActive] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const start = (): void => {
    window.api.startKeepAwake()
    setStartTime(new Date())
    setElapsed(0)
    setActive(true)
  }

  const stop = (): void => {
    window.api.stopKeepAwake()
    setActive(false)
    setStartTime(null)
    setElapsed(0)
  }

  useEffect(() => {
    if (active && startTime) {
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime.getTime()) / 1000))
      }, 1000)
    }
    return (): void => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [active, startTime])

  return (
    <div className="options">
      <div className="button-container">
        {active ? (
          <Button disabled color="yellow" variant="solid" loading>
            Working!
          </Button>
        ) : (
          <Button color="primary" onClick={start}>
            Go!
          </Button>
        )}
        <Button color="danger" variant="outlined" disabled={!active} onClick={stop}>
          Stop
        </Button>
      </div>
      {active && startTime && (
        <div style={{ textAlign: 'center', color: '#888', fontSize: 14 }}>
          Started at {startTime.toLocaleTimeString()} — running for {formatElapsed(elapsed)}
        </div>
      )}
    </div>
  )
}

export default Options
