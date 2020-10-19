import { ByteDisplay } from '../src'

const bytes = [0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01]
const data = new Uint8Array([0x04, 0x80, 0x0e, 0xa0, 0x78, 0x90, 0x08, 0x90, 0x08, 0x84, 0xff, 0xfe, 0x08, 0x80, 0x08, 0x90, 0x0a, 0x90, 0x0c, 0x60, 0x18, 0x40, 0x68, 0xa0, 0x09, 0x20, 0x0a, 0x14, 0x28, 0x14, 0x10, 0x0c])

const display = new ByteDisplay(64, 32)

display.set(-8, 0, 16, 16, data)
display.set(8, -8, 16, 16, data)
display.set(24, -8, 16, 16, data)
display.set(56, 0, 16, 16, data)
display.set(8, 24, 16, 16, data)
display.set(24, 24, 16, 16, data)
display.set(24, 8, 16, 16, data)

function print(buffer: Uint8Array | number[], width: number, height: number) {
  for(let j = 0; j < height; j += 1) {
    let line = ''
    for(let i = 0; i < width; i += 1) {
      const len = j * width + i
      const idx = Math.floor(len / 8)
      const bit = len % 8
      const point = buffer[idx] & bytes[bit]

      if (point) {
        line += '●'
      } else {
        line += '○'
      }
    }
    console.log(line)
  }
}

print(display.toRB(), display.width, display.height)
console.log('');
print(display.toRT(), display.width, display.height)
