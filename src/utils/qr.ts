/** QR versión 6-L, UTF-8 (ECI 26), máscara 0. Hasta 130 bytes UTF-8. */
export function qrMatrix(text: string): boolean[][] {
  const bytes = Array.from(new TextEncoder().encode(text));
  if (bytes.length > 130) throw new Error("El texto QR excede 130 bytes.");
  const bits: number[] = [];
  const put = (n: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) bits.push((n >>> i) & 1);
  };
  put(7, 4);
  put(26, 8);
  put(4, 4);
  put(bytes.length, 8);
  bytes.forEach((b) => put(b, 8));
  put(0, Math.min(4, 1088 - bits.length));
  while (bits.length % 8) bits.push(0);
  const data: number[] = [];
  for (let i = 0; i < bits.length; i += 8)
    data.push(bits.slice(i, i + 8).reduce((n, b) => (n << 1) | b, 0));
  let pad = 0;
  while (data.length < 136) data.push(pad++ % 2 ? 0x11 : 0xec);
  function mul(a: number, b: number) {
    let r = 0;
    for (let i = 7; i >= 0; i--) {
      r = (r << 1) ^ ((r >>> 7) * 0x11d);
      r ^= ((b >>> i) & 1) * a;
    }
    return r;
  }
  const divisor = Array(18).fill(0);
  divisor[17] = 1;
  let root = 1;
  for (let i = 0; i < 18; i++) {
    for (let j = 0; j < 18; j++) {
      divisor[j] = mul(divisor[j], root);
      if (j + 1 < 18) divisor[j] ^= divisor[j + 1];
    }
    root = mul(root, 2);
  }
  function remainder(block: number[]) {
    const result = Array(18).fill(0);
    for (const b of block) {
      const factor = b ^ result.shift()!;
      result.push(0);
      for (let i = 0; i < 18; i++) result[i] ^= mul(divisor[i], factor);
    }
    return result;
  }
  const blocks = [data.slice(0, 68), data.slice(68)];
  const ecc = blocks.map(remainder);
  const codewords: number[] = [];
  for (let i = 0; i < 68; i++)
    for (const block of blocks) codewords.push(block[i]);
  for (let i = 0; i < 18; i++)
    for (const block of ecc) codewords.push(block[i]);
  const size = 41,
    matrix = Array.from({ length: size }, () => Array(size).fill(false)),
    reserved = matrix.map((row) => row.map(() => false));
  function set(x: number, y: number, dark: boolean) {
    if (x >= 0 && y >= 0 && x < size && y < size) {
      matrix[y][x] = dark;
      reserved[y][x] = true;
    }
  }
  function finder(cx: number, cy: number) {
    for (let dy = -4; dy <= 4; dy++)
      for (let dx = -4; dx <= 4; dx++) {
        const dist = Math.max(Math.abs(dx), Math.abs(dy));
        set(cx + dx, cy + dy, dist !== 2 && dist !== 4);
      }
  }
  for (let i = 0; i < size; i++) {
    set(6, i, i % 2 === 0);
    set(i, 6, i % 2 === 0);
  }
  finder(3, 3);
  finder(size - 4, 3);
  finder(3, size - 4);
  for (let y = -2; y <= 2; y++)
    for (let x = -2; x <= 2; x++)
      set(34 + x, 34 + y, Math.max(Math.abs(x), Math.abs(y)) !== 1);
  const fmt = 0x77c4;
  const bit = (i: number) => ((fmt >>> i) & 1) !== 0;
  for (let i = 0; i <= 5; i++) set(8, i, bit(i));
  set(8, 7, bit(6));
  set(8, 8, bit(7));
  set(7, 8, bit(8));
  for (let i = 9; i < 15; i++) set(14 - i, 8, bit(i));
  for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(i));
  for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(i));
  set(8, size - 8, true);
  let index = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vertical = 0; vertical < size; vertical++) {
      const y = ((right + 1) & 2) === 0 ? size - 1 - vertical : vertical;
      for (let j = 0; j < 2; j++) {
        const x = right - j;
        if (!reserved[y][x]) {
          let dark =
            index < codewords.length * 8
              ? ((codewords[index >>> 3] >>> (7 - (index & 7))) & 1) !== 0
              : false;
          index++;
          if ((x + y) % 2 === 0) dark = !dark;
          matrix[y][x] = dark;
        }
      }
    }
  }
  return matrix;
}
