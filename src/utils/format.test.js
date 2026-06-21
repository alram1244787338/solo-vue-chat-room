import { describe, it, expect } from 'vitest'
import { formatTime } from './format'

describe('formatTime', () => {
  it('正常时间戳：上午时间补零', () => {
    const ts = new Date(2025, 5, 15, 9, 5).getTime()
    expect(formatTime(ts)).toBe('09:05')
  })

  it('正常时间戳：下午时间', () => {
    const ts = new Date(2025, 5, 15, 14, 30).getTime()
    expect(formatTime(ts)).toBe('14:30')
  })

  it('整数秒时间戳（10位）', () => {
    const ts = Math.floor(new Date(2025, 5, 15, 10, 0).getTime() / 1000)
    expect(formatTime(ts * 1000)).toBe('10:00')
  })

  it('零点时间：00:00', () => {
    const ts = new Date(2025, 5, 15, 0, 0).getTime()
    expect(formatTime(ts)).toBe('00:00')
  })

  it('23:59 午夜前一分钟', () => {
    const ts = new Date(2025, 5, 15, 23, 59).getTime()
    expect(formatTime(ts)).toBe('23:59')
  })

  it('分钟补零：12:05', () => {
    const ts = new Date(2025, 0, 1, 12, 5).getTime()
    expect(formatTime(ts)).toBe('12:05')
  })

  it('小时补零：08:15', () => {
    const ts = new Date(2025, 0, 1, 8, 15).getTime()
    expect(formatTime(ts)).toBe('08:15')
  })
})
