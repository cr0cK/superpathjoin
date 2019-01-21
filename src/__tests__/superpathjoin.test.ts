import { superpathjoin } from '../.'

describe('superpathjoin', () => {
  it('should return an empty string if no args are passed', () => {
    const ret = superpathjoin()
    expect(ret).toBe('')
  })

  it('should join parts', () => {
    const ret = superpathjoin('path', 'to', 'assets')
    expect(ret).toBe('path/to/assets')
  })

  it('should cast parts to string', () => {
    const ret = superpathjoin('path', 'to', 'assets', 42)
    expect(ret).toBe('path/to/assets/42')
  })

  it('should join with deduplicate slashes', () => {
    const ret = superpathjoin('//path/', '/to', 'assets///')
    expect(ret).toBe('/path/to/assets/')
  })

  it('should keep the last slash', () => {
    const ret = superpathjoin('//path/', '/to', 'assets/', '/')
    expect(ret).toBe('/path/to/assets/')
  })

  it('should return an absolute path if the last arg is true', () => {
    const ret = superpathjoin('path/', '/to', 'assets/', true)
    expect(ret).toBe('/path/to/assets/')
  })

  it('should remove the first slash if the last arg is false', () => {
    const ret = superpathjoin('/path/', '/to', 'assets/', false)
    expect(ret).toBe('path/to/assets/')
  })

  it('should filter empty values', () => {
    // @ts-ignore Test non valid types
    const ret = superpathjoin('path', null, undefined, '', 'to', {}, [], 42)
    expect(ret).toBe('path/to/42')
  })

  it('should trim args', () => {
    const ret = superpathjoin('path ', ' to ', 'assets/')
    expect(ret).toBe('path/to/assets/')
  })

  it('should handle "../" relative parts', () => {
    const ret = superpathjoin('path', 'to', '..', 'assets')
    expect(ret).toBe('path/assets')
  })

  it('should not replace "://"', () => {
    const ret = superpathjoin('https://hostname/', '/path/', 'to', 'assets')
    expect(ret).toBe('https://hostname/path/to/assets')
  })
})
