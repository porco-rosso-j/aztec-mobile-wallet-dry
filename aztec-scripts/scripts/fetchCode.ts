import { decode } from 'base64-arraybuffer';

// Annoyingly the wasm declares if it's memory is shared or not. So now we need two wasms if we want to be
// able to fallback on "non shared memory" situations.
export async function fetchCode(_str: string) {
  const res = {
    ok: true,
    url: _str
  };

  if (!res.ok) {
    throw new Error('Failed to fetch wasm file.');
  }

  // Check if the URL is a base64-encoded data URL
  const url = res.url;
  const dataPrefix = 'data:application/wasm;base64,';

  if (url.startsWith(dataPrefix)) {
    console.log('decoding...');
    const base64Data = url.slice(dataPrefix.length); // Extract base64 part
    console.log('base64Data: ', base64Data);
    const binaryString = await atob(base64Data); // Decode base64 to binary string
    console.log('binaryString: ', binaryString);
    // Convert binary string to ArrayBuffer
    const len = binaryString.length;
    console.log('len: ', len);
    const bytes = new Uint8Array(8266428);
    console.log('bytes: ', bytes);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    console.log('bytes after: ', bytes);
    console.log('final buffer: ', bytes.buffer);
  } else {
    console.log('not data url');
  }
}

async function atob(encodedString: string) {
  const buffer = Buffer.from(encodedString, 'base64').toString('binary');
  console.log('buffer in atob: ', buffer);
  return buffer;
}

export async function fetchCode2(_str: string) {
  const res = {
    ok: true,
    url: _str
  };

  if (!res.ok) {
    throw new Error('Failed to fetch wasm file.');
  }

  const url = res.url;
  const dataPrefix = 'data:application/wasm;base64,';

  return decode(url.slice(dataPrefix.length));
}

const wasmStr =
  'data:application/wasm;base64,AGFzbQEAAAABsoWAgABUYAF/AGADf39/AX9gAn9/AX9gAX8Bf2ADf39/AGACf38AYAR/f39/AGAFf39/f38AYAN/f38BfmACf38BfWACf38BfGAEf39/fwF/YAZ/f39/f38Bf2AFf39+f38';

console.log('ret: ', fetchCode2(wasmStr));
