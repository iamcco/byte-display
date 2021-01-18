const Bytes = new Uint8Array([
  0x80, // 10000000
  0x40, // 01000000
  0x20, // 00100000
  0x10, // 00010000
  0x08, // 00001000
  0x04, // 00000100
  0x02, // 00000010
  0x01, // 00000001
]);

export class ByteDisplay {
  static reverse(buffer: Uint8Array) {
    for (let i = 0, len = buffer.byteLength; i < len; i += 1) {
      buffer[i] = buffer[i] ^ 0xff;
    }
    return buffer;
  }
  static setByPoint(
    x: number,
    y: number,
    width: number,
    height: number,
    buffer: Uint8Array,
    dataX: number,
    dataY: number,
    dataWidth: number,
    dataHeight: number,
    data: Uint8Array,
  ) {
    const len = y * width + x;
    const idx = Math.floor(len / 8);
    const bit = len % 8;
    const dataLen = dataY * dataWidth + dataX;
    const dataIdx = Math.floor(dataLen / 8);
    const dataBit = dataLen % 8;
    buffer[idx] =
      (buffer[idx] & (Bytes[bit] ^ 0xff)) + // set 0
      (dataBit >= bit
        ? (data[dataIdx] & Bytes[dataBit]) << (dataBit - bit)
        : (data[dataIdx] & Bytes[dataBit]) >> (bit - dataBit));
  }

  private buffer: Uint8Array;

  constructor(public width: number, public height: number) {
    this.buffer = new Uint8Array(Math.ceil((this.width * this.height) / 8));
  }

  set(x: number, y: number, width: number, height: number, data: Uint8Array) {
    for (let h = 0; h < height; h += 1) {
      const pY = y + h;
      if (pY > this.height - 1 || pY < 0) {
        continue;
      }
      for (let w = 0; w < width; w += 1) {
        const pX = x + w;
        if (pX > this.width - 1 || pX < 0) {
          continue;
        }
        ByteDisplay.setByPoint(pX, pY, this.width, this.height, this.buffer, w, h, width, height, data);
      }
    }
  }

  toRB(reverse = false) {
    if (reverse) {
      return ByteDisplay.reverse(this.buffer.slice(0));
    }
    return this.buffer.slice(0);
  }

  toRT(reverse = false) {
    const buffer = new Uint8Array(Math.ceil((this.width * this.height) / 8));
    let idx = 0;
    for (let h = this.height - 1; h >= 0; h -= 1) {
      for (let w = 0; w < this.width; w += 1) {
        ByteDisplay.setByPoint(
          idx % this.width,
          Math.floor(idx / this.width),
          this.width,
          this.height,
          buffer,
          w,
          h,
          this.width,
          this.height,
          this.buffer,
        );
        idx += 1;
      }
    }
    if (reverse) {
      ByteDisplay.reverse(buffer);
    }
    return buffer;
  }

  toLB(reverse = false) {
    const buffer = new Uint8Array(Math.ceil((this.width * this.height) / 8));
    let idx = 0;
    for (let h = 0; h < this.height; h += 1) {
      for (let w = this.width - 1; w >= 0; w -= 1) {
        ByteDisplay.setByPoint(
          idx % this.width,
          Math.floor(idx / this.width),
          this.width,
          this.height,
          buffer,
          w,
          h,
          this.width,
          this.height,
          this.buffer,
        );
        idx += 1;
      }
    }
    if (reverse) {
      ByteDisplay.reverse(buffer);
    }
    return buffer;
  }

  toLT(reverse = false) {
    const buffer = new Uint8Array(Math.ceil((this.width * this.height) / 8));
    let idx = 0;
    for (let h = this.height - 1; h >= 0; h -= 1) {
      for (let w = this.width - 1; w >= 0; w -= 1) {
        ByteDisplay.setByPoint(
          idx % this.width,
          Math.floor(idx / this.width),
          this.width,
          this.height,
          buffer,
          w,
          h,
          this.width,
          this.height,
          this.buffer,
        );
        idx += 1;
      }
    }
    if (reverse) {
      ByteDisplay.reverse(buffer);
    }
    return buffer;
  }

  toBR(reverse = false) {
    const buffer = new Uint8Array(Math.ceil((this.width * this.height) / 8));
    let idx = 0;
    for (let w = 0; w < this.width; w += 1) {
      for (let h = 0; h < this.height; h += 1) {
        ByteDisplay.setByPoint(
          idx % this.width,
          Math.floor(idx / this.width),
          this.width,
          this.height,
          buffer,
          w,
          h,
          this.width,
          this.height,
          this.buffer,
        );
        idx += 1;
      }
    }
    if (reverse) {
      ByteDisplay.reverse(buffer);
    }
    return buffer;
  }

  toBL(reverse = false) {
    const buffer = new Uint8Array(Math.ceil((this.width * this.height) / 8));
    let idx = 0;
    for (let w = this.width - 1; w >= 0; w -= 1) {
      for (let h = 0; h < this.height; h += 1) {
        ByteDisplay.setByPoint(
          idx % this.width,
          Math.floor(idx / this.width),
          this.width,
          this.height,
          buffer,
          w,
          h,
          this.width,
          this.height,
          this.buffer,
        );
        idx += 1;
      }
    }
    if (reverse) {
      ByteDisplay.reverse(buffer);
    }
    return buffer;
  }

  toTR(reverse = false) {
    const buffer = new Uint8Array(Math.ceil((this.width * this.height) / 8));
    let idx = 0;
    for (let w = 0; w < this.width; w += 1) {
      for (let h = this.height - 1; h >= 0; h -= 1) {
        ByteDisplay.setByPoint(
          idx % this.width,
          Math.floor(idx / this.width),
          this.width,
          this.height,
          buffer,
          w,
          h,
          this.width,
          this.height,
          this.buffer,
        );
        idx += 1;
      }
    }
    if (reverse) {
      ByteDisplay.reverse(buffer);
    }
    return buffer;
  }

  toTL(reverse = false) {
    const buffer = new Uint8Array(Math.ceil((this.width * this.height) / 8));
    let idx = 0;
    for (let w = this.width - 1; w >= 0; w -= 1) {
      for (let h = this.height - 1; h >= 0; h -= 1) {
        ByteDisplay.setByPoint(
          idx % this.width,
          Math.floor(idx / this.width),
          this.width,
          this.height,
          buffer,
          w,
          h,
          this.width,
          this.height,
          this.buffer,
        );
        idx += 1;
      }
    }
    if (reverse) {
      ByteDisplay.reverse(buffer);
    }
    return buffer;
  }
}
