const { Image, NativeModules } = require('react-native');
const { Buffer } = require('buffer');
const { nanoid } = require('nanoid/non-secure');

type InstantiateCallbackResult = {
  readonly result: number;
  readonly buffer?: ArrayBuffer;
};

type InstantiateParamsCallbackParams = {
  readonly module: string;
  readonly func: string;
  readonly args: readonly string[];
};

type InstantiateParamsCallback = (
  params: InstantiateParamsCallbackParams
) => number | void;

type InstantiateParams = {
  readonly iid: string;
  readonly bufferSource: string;
  readonly stackSizeInBytes: number;
  readonly callback: InstantiateParamsCallback;
};

type InvokeParams = {
  readonly iid: string;
  readonly func: string;
  readonly args: readonly string[];
};

// @ts-expect-error synthesized
const reactNativeWebAssembly: {
  readonly RNWebassembly_instantiate: (
    params: InstantiateParams
  ) => InstantiateCallbackResult;
  readonly RNWebassembly_invoke: (params: InvokeParams) => readonly string[];
} = global;

if (
  typeof reactNativeWebAssembly.RNWebassembly_instantiate !== 'function' &&
  !NativeModules.Webassembly?.install?.()
)
  throw new Error('Unable to bind Webassembly to React Native JSI.');

export type WebassemblyInstance<Exports extends object> = {
  readonly exports: Exports;
};

type WebAssemblyMemoryParams = {
  readonly initial: number;
};

export class Memory {
  readonly __initial: WebAssemblyMemoryParams['initial'] | undefined;

  constructor(params: WebAssemblyMemoryParams) {
    this.__initial = params?.initial;
  }
}

export type WebAssemblyEnv = {
  readonly memory?: Memory;
};

const DEFAULT_STACK_SIZE_IN_BYTES = 8192;

const DEFAULT_MEMORY = new Memory({
  initial: DEFAULT_STACK_SIZE_IN_BYTES,
});

export type Imports = Record<string, Function | ArrayBuffer>;

type ImportsMap = Omit<
  {
    readonly [key: string]: Imports | WebAssemblyEnv;
  },
  'env'
>;

export type WebAssemblyImportObject = ImportsMap & {
  readonly env?: WebAssemblyEnv;
};

type WebAssemblyDefaultExports = {
  readonly memory?: ArrayBuffer;
};

export type WebassemblyInstantiateResult<Exports extends object> = {
  readonly instance: WebassemblyInstance<Exports & WebAssemblyDefaultExports>;
};

const fetchRequireAsBase64 = async (moduleId: number): Promise<string> => {
  console.log('moduleId', moduleId);
  const maybeAssetSource = Image.resolveAssetSource(moduleId);
  console.log('maybeAssetSource', maybeAssetSource);

  const maybeUri = maybeAssetSource?.uri;
  console.log('maybeUri', maybeUri);

  if (typeof maybeUri !== 'string' || !maybeUri.length)
    throw new Error(
      `Expected non-empty string uri, encountered "${String(maybeUri)}".`
    );

  const base64EncodedString = String(
    await new Promise(async (resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(await (await fetch(maybeUri)).blob());
    })
  );

  console.log('base64EncodedString', base64EncodedString);

  const maybeBase64EncodedString = base64EncodedString
    .substring(base64EncodedString.indexOf(','))
    .slice(1);

  console.log('maybeBase64EncodedString', maybeBase64EncodedString);

  if (
    typeof maybeBase64EncodedString !== 'string' ||
    !maybeBase64EncodedString.length
  )
    throw new Error(
      `Expected non-empty string base64EncodedString, encountered "${maybeBase64EncodedString}".`
    );

  return maybeBase64EncodedString;
};

// https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/instantiate
export async function instantiate<Exports extends object>(
  bufferSource: Uint8Array | ArrayBuffer | number,
  maybeImportObject: WebAssemblyImportObject | undefined = undefined
): Promise<WebassemblyInstantiateResult<Exports>> {
  const iid = nanoid();

  console.log('bufferSource: ', bufferSource);
  console.log('maybeImportObject: ', maybeImportObject);
  console.log('iid: ', iid);

  const importObject = maybeImportObject || {};
  console.log('importObject: ', importObject);
  const { env: maybeEnv } = importObject;
  console.log('maybeEnv: ', maybeEnv);

  const memory = maybeEnv?.memory || DEFAULT_MEMORY;
  console.log('memory: ', memory);

  const stackSizeInBytes = memory?.__initial ?? DEFAULT_STACK_SIZE_IN_BYTES;
  console.log('stackSizeInBytes: ', stackSizeInBytes);

  const bufferSourceBase64 =
    typeof bufferSource === 'number'
      ? await fetchRequireAsBase64(bufferSource)
      : Buffer.from(bufferSource).toString('base64');

  console.log('bufferSourceBase64 in instantiate: ', bufferSourceBase64);

  const {
    result: instanceResult,
    buffer: maybeBuffer,
  }: InstantiateCallbackResult =
    reactNativeWebAssembly.RNWebassembly_instantiate({
      iid,
      bufferSource: bufferSourceBase64,
      stackSizeInBytes,
      callback: ({ func, args, module }) => {
        const maybeModule = importObject[module];

        console.log('maybeModule in RNWebassembly_instantiate: ', maybeModule);
        if (!maybeModule)
          throw new Error(
            `[WebAssembly]: Tried to invoke a function belonging to module "${module}", but this was not defined.`
          );

        // @ts-ignore
        const maybeFunction = maybeModule?.[func];

        console.log(
          'maybeFunction in RNWebassembly_instantiate: ',
          maybeFunction
        );

        if (!maybeFunction)
          throw new Error(
            `[WebAssembly]: Tried to invoke a function "${func}" belonging to module "${module}", but it was not defined.`
          );

        return maybeFunction(...args.map(parseFloat));
      },
    });

  console.log('instanceResult: ', instanceResult);
  console.log('maybeBuffer: ', maybeBuffer);

  if (instanceResult !== 0)
    throw new Error(`Failed to instantiate WebAssembly. (${instanceResult})`);

  const exports = new Proxy({} as Exports, {
    get(_, exportName) {
      if (typeof exportName !== 'string')
        throw new Error(`Expected string, encountered ${typeof exportName}.`);

      if (exportName === 'memory') return maybeBuffer;

      return (...args: readonly number[]) => {
        const res = reactNativeWebAssembly.RNWebassembly_invoke({
          iid,
          func: exportName,
          args: args.map((e) => e.toString()),
        });

        if (!res.length) return undefined;

        const num = res.map(parseFloat);

        // TODO: This is incorrect. We need to check if the return type is truly
        //       a scalar or not.
        if (res.length !== 1) return num;

        return num[0];
      };
    },
  });

  console.log('exports: ', exports);

  return { instance: { exports } };
}
