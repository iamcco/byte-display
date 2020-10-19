const Bytes = new Uint8Array([
  0x80, // 10000000
  0x40, // 01000000
  0x20, // 00100000
  0x10, // 00010000
  0x08, // 00001000
  0x04, // 00000100
  0x02, // 00000010
  0x01, // 00000001
])

export class ByteDisplay {
  static setByPoint (
    x: number,
    y: number,
    width: number,
    height: number,
    buffer: Uint8Array,
    dataX: number,
    dataY: number,
    dataWidth: number,
    dataHeight: number,
    data: Uint8Array
  ) {
    const len = (y * width + x)
    const idx = Math.floor(len / 8)
    const bit = len % 8
    const dataLen = dataY * dataWidth + dataX
    const dataIdx = Math.floor(dataLen / 8)
    const dataBit = dataLen % 8
    buffer[idx] =
      (buffer[idx] & (Bytes[bit] ^ 0xff)) // set 0
      +
      (
        dataBit >= bit
        ? ((data[dataIdx] & Bytes[dataBit]) << (dataBit - bit))
        : ((data[dataIdx] & Bytes[dataBit]) >> (bit - dataBit))
      )
  }

  private buffer: Uint8Array

  constructor(public width: number, public height: number) {
    this.buffer = new Uint8Array(Math.ceil(this.width * this.height / 8))
  }

  set (
    x: number,
    y: number,
    width: number,
    height: number,
    data: Uint8Array
  ) {
    for (let h = 0; h < height; h += 1) {
      const pY = y + h
      if (pY > (this.height - 1) || pY < 0) {
        continue
      }
      for (let w = 0; w < width; w += 1) {
        const pX = x + w
        if (pX > (this.width - 1) || pX < 0) {
          continue
        }
        ByteDisplay.setByPoint(pX, pY, this.width, this.height, this.buffer, w, h, width, height, data)
      }
    }
  }

  toRB () {
    return this.buffer.slice(0)
  }

  toRT () {
    const buffer = new Uint8Array(Math.ceil(this.width * this.height / 8))
    let idx = 0
    for (let h = this.height - 1; h >= 0; h -= 1) {
      for (let w = 0; w < this.width; w += 1) {
        ByteDisplay.setByPoint(
          (idx % this.width),
          Math.floor(idx / this.width),
          this.width,
          this.height,
          buffer,
          w,
          h,
          this.width,
          this.height,
          this.buffer
        )
        idx += 1
      }
    }
    return buffer
  }

  toLB () {
    const buffer = new Uint8Array(Math.ceil(this.width * this.height / 8))
    let idx = 0
    for (let h = 0; h < this.height; h += 1) {
      for (let w = this.width - 1; w >= 0; w -= 1) {
        ByteDisplay.setByPoint(
          (idx % this.width),
          Math.floor(idx / this.width),
          this.width,
          this.height,
          buffer,
          w,
          h,
          this.width,
          this.height,
          this.buffer
        )
        idx += 1
      }
    }
    return buffer
  }

  toLT () {
    const buffer = new Uint8Array(Math.ceil(this.width * this.height / 8))
    let idx = 0
    for (let h = this.height - 1; h >= 0; h -= 1) {
      for (let w = this.width - 1; w >= 0; w -= 1) {
        ByteDisplay.setByPoint(
          (idx % this.width),
          Math.floor(idx / this.width),
          this.width,
          this.height,
          buffer,
          w,
          h,
          this.width,
          this.height,
          this.buffer
        )
        idx += 1
      }
    }
    return buffer
  }

  toBR () {
    const buffer = new Uint8Array(Math.ceil(this.width * this.height / 8))
    let idx = 0
    for (let w = 0; w < this.width; w += 1) {
      for (let h = 0; h < this.height; h += 1) {
        ByteDisplay.setByPoint(
          (idx % this.width),
          Math.floor(idx / this.width),
          this.width,
          this.height,
          buffer,
          w,
          h,
          this.width,
          this.height,
          this.buffer
        )
        idx += 1
      }
    }
    return buffer
  }

  toBL () {
    const buffer = new Uint8Array(Math.ceil(this.width * this.height / 8))
    let idx = 0
    for (let w = this.width - 1; w >= 0; w -= 1) {
      for (let h = 0; h < this.height; h += 1) {
        ByteDisplay.setByPoint(
          (idx % this.width),
          Math.floor(idx / this.width),
          this.width,
          this.height,
          buffer,
          w,
          h,
          this.width,
          this.height,
          this.buffer
        )
        idx += 1
      }
    }
    return buffer
  }

  toTR () {
    const buffer = new Uint8Array(Math.ceil(this.width * this.height / 8))
    let idx = 0
    for (let w = 0; w < this.width; w += 1) {
      for (let h = this.height - 1; h >= 0; h -= 1) {
        ByteDisplay.setByPoint(
          (idx % this.width),
          Math.floor(idx / this.width),
          this.width,
          this.height,
          buffer,
          w,
          h,
          this.width,
          this.height,
          this.buffer
        )
        idx += 1
      }
    }
    return buffer
  }

  toTL () {
    const buffer = new Uint8Array(Math.ceil(this.width * this.height / 8))
    let idx = 0
    for (let w = this.width - 1; w >= 0; w -= 1) {
      for (let h = this.height - 1; h >= 0; h -= 1) {
        ByteDisplay.setByPoint(
          (idx % this.width),
          Math.floor(idx / this.width),
          this.width,
          this.height,
          buffer,
          w,
          h,
          this.width,
          this.height,
          this.buffer
        )
        idx += 1
      }
    }
    return buffer
  }
}
