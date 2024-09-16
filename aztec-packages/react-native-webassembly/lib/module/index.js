var _NativeModules$Webass, _NativeModules$Webass2;
const {
  Image,
  NativeModules
} = require('react-native');
const {
  Buffer
} = require('buffer');
const {
  nanoid
} = require('nanoid/non-secure');
// @ts-expect-error synthesized
const reactNativeWebAssembly = global;
if (typeof reactNativeWebAssembly.RNWebassembly_instantiate !== 'function' && !((_NativeModules$Webass = NativeModules.Webassembly) !== null && _NativeModules$Webass !== void 0 && (_NativeModules$Webass2 = _NativeModules$Webass.install) !== null && _NativeModules$Webass2 !== void 0 && _NativeModules$Webass2.call(_NativeModules$Webass))) throw new Error('Unable to bind Webassembly to React Native JSI.');
export class Memory {
  constructor(params) {
    this.__initial = params === null || params === void 0 ? void 0 : params.initial;
  }
}
const DEFAULT_STACK_SIZE_IN_BYTES = 8192;
const DEFAULT_MEMORY = new Memory({
  initial: DEFAULT_STACK_SIZE_IN_BYTES
});
const fetchRequireAsBase64 = async moduleId => {
  const maybeAssetSource = Image.resolveAssetSource(moduleId);
  const maybeUri = maybeAssetSource === null || maybeAssetSource === void 0 ? void 0 : maybeAssetSource.uri;
  if (typeof maybeUri !== 'string' || !maybeUri.length) throw new Error(`Expected non-empty string uri, encountered "${String(maybeUri)}".`);
  const base64EncodedString = String(await new Promise(async (resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(await (await fetch(maybeUri)).blob());
  }));
  const maybeBase64EncodedString = base64EncodedString.substring(base64EncodedString.indexOf(',')).slice(1);
  if (typeof maybeBase64EncodedString !== 'string' || !maybeBase64EncodedString.length) throw new Error(`Expected non-empty string base64EncodedString, encountered "${maybeBase64EncodedString}".`);
  return maybeBase64EncodedString;
};

// https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/instantiate
export async function instantiate(bufferSource) {
  let maybeImportObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  const iid = nanoid();
  const importObject = maybeImportObject || {};
  const {
    env: maybeEnv
  } = importObject;
  const memory = (maybeEnv === null || maybeEnv === void 0 ? void 0 : maybeEnv.memory) || DEFAULT_MEMORY;
  const stackSizeInBytes = (memory === null || memory === void 0 ? void 0 : memory.__initial) ?? DEFAULT_STACK_SIZE_IN_BYTES;
  const bufferSourceBase64 = typeof bufferSource === 'number' ? await fetchRequireAsBase64(bufferSource) : Buffer.from(bufferSource).toString('base64');
  const {
    result: instanceResult,
    buffer: maybeBuffer
  } = reactNativeWebAssembly.RNWebassembly_instantiate({
    iid,
    bufferSource: bufferSourceBase64,
    stackSizeInBytes,
    callback: _ref => {
      let {
        func,
        args,
        module
      } = _ref;
      const maybeModule = importObject[module];
      if (!maybeModule) throw new Error(`[WebAssembly]: Tried to invoke a function belonging to module "${module}", but this was not defined.`);

      // @ts-ignore
      const maybeFunction = maybeModule === null || maybeModule === void 0 ? void 0 : maybeModule[func];
      if (!maybeFunction) throw new Error(`[WebAssembly]: Tried to invoke a function "${func}" belonging to module "${module}", but it was not defined.`);
      return maybeFunction(...args.map(parseFloat));
    }
  });
  if (instanceResult !== 0) throw new Error(`Failed to instantiate WebAssembly. (${instanceResult})`);
  const exports = new Proxy({}, {
    get(_, exportName) {
      if (typeof exportName !== 'string') throw new Error(`Expected string, encountered ${typeof exportName}.`);
      if (exportName === 'memory') return maybeBuffer;
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        const res = reactNativeWebAssembly.RNWebassembly_invoke({
          iid,
          func: exportName,
          args: args.map(e => e.toString())
        });
        if (!res.length) return undefined;
        const num = res.map(parseFloat);

        // TODO: This is incorrect. We need to check if the return type is truly
        //       a scalar or not.
        if (res.length !== 1) return num;
        return num[0];
      };
    }
  });
  return {
    instance: {
      exports
    }
  };
}
//# sourceMappingURL=index.js.map