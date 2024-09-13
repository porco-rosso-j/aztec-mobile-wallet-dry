import { Fr, Fq, Grumpkin, GrumpkinScalar, Point } from '@aztec/aztec.js';
// import { Fr } from '@aztec/bb.js';

const toUint8Array = (value: Fr | Fq): Uint8Array => {
  return new Uint8Array(value.toBuffer());
};

async function computeGrumpkins() {
  const curve = new Grumpkin();
  console.log('curve gen x(): ', toUint8Array(curve.generator().x));
  console.log('curve gen y(): ', toUint8Array(curve.generator().y));

  const value: GrumpkinScalar = new Fq(
    Buffer.from([
      24, 137, 63, 144, 3, 163, 23, 154, 31, 36, 82, 59, 156, 27, 132, 51, 75,
      95, 230, 238, 96, 136, 200, 140, 7, 69, 145, 219, 14, 102, 20, 56
    ])
  );
  console.log('value: ', toUint8Array(value));

  const product = curve.mul(curve.generator(), value);
  console.log('product x: ', toUint8Array(product.x));
  console.log('product y: ', toUint8Array(product.y));

  const sum = curve.add(curve.generator(), product);
  console.log('sum x: ', toUint8Array(sum.x));
  console.log('sum y: ', toUint8Array(sum.y));

  const points = [curve.generator(), product];
  const concatenatedPoints: Buffer = Buffer.concat(
    points.map(point => point.toBuffer())
  );
  console.log('concatenatedPoints: ', new Uint8Array(concatenatedPoints));
  const pointsByteLength = points.length * Point.SIZE_IN_BYTES * 2;
  console.log('pointsByteLength: ', pointsByteLength);

  const batchProduct = curve.batchMul(points, value);
  console.log('batchProduct 0x: ', toUint8Array(batchProduct[0].x));
  console.log('batchProduct 0y: ', toUint8Array(batchProduct[0].y));
  console.log('batchProduct 1x: ', toUint8Array(batchProduct[1].x));
  console.log('batchProduct 1y: ', toUint8Array(batchProduct[1].y));

  const rand = curve.getRandomFr();
  console.log('rand: ', toUint8Array(rand));

  const value2 = Buffer.from([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 27
  ]);
  const reduced512Buffer = curve.reduce512BufferToFr(value2);

  console.log('reduced512Buffer: ', toUint8Array(reduced512Buffer));
}

computeGrumpkins();
// console.log('grumpkin x: ', toUint8Array(new Grumpkin().generator().x));
// console.log('grumpkin y: ', toUint8Array(new Grumpkin().generator().y));
