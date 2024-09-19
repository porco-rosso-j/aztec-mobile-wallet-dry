import fs from 'fs';

async function precompileWasm() {
  // Read the original Wasm file as a Node.js Buffer
  const wasmBuffer: Buffer = fs.readFileSync('./barretenberg.wasm');
  console.log('wasmBuffer: ', wasmBuffer);

  // Compile the Wasm module from the buffer
  const compiledModule = await WebAssembly.compile(wasmBuffer);
  console.log('Compiled Wasm module: ', compiledModule);

  // Extract the custom sections, returns an ArrayBuffer[]
  const customSections: ArrayBuffer[] = WebAssembly.Module.customSections(
    compiledModule,
    ''
  );
  console.log('customSections: ', customSections);

  // Convert ArrayBuffer[] to a single Node.js Buffer
  const combinedBuffer = Buffer.concat(
    customSections.map(section => Buffer.from(section))
  );
  console.log('combinedBuffer: ', combinedBuffer);

  // Write the combined Buffer to a new .wasm file
  fs.writeFileSync('./barretenberg-compiled.wasm', combinedBuffer);
}

precompileWasm().catch(console.error);
