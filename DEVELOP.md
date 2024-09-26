## Setup

clone this repository

```shell
git clone git@github.com:porco-rosso-j/aztec-mobile-wallet-dry.git
cd aztec-mobile-wallet-dry
```

move to this branch

```shell
git fetch tags
git checkout main
```

clone submodules

```shell
 git submodule update --init --remote
```

## Sandbox

```shell
cd .aztec
aztec-sandbox
```

## Token Deployment

```shell
cd aztec-contracts
ts-node --experimentalSpecifierResolution=node ./scripts/deployToken.ts --max-old-space-size=16384
```

```shell
cd aztec-contracts
ts-node --experimentalSpecifierResolution=node ./scripts/mintToken.ts --max-old-space-size=16384
```

## Xcode

```shell
cd react-native-app/ios
pod install --repo-update
```

\*in case build fails, re-try after switching to rosseta

```shell
todo
```

### Install BBSwfit

### Build Project

---

errors in deploying token in react native using @aztec/accounts

1. Error: No custom attributes found for contract function constructor. Try rebuilding the contract with the latest nargo version.

2. [TypeError: undefined is not an object (evaluating '\_$$\_REQUIRE(\_dependencyMap[8], "./artifact.js").SchnorrAccountContractArtifact')]

errors in compiling contract
thread 'main' panicked at src/transpile.rs:874:14:
Transpiler doesn't know how to process EcdsaSecp256r1 { hashed_msg: HeapVector { pointer: MemoryAddress(4), size: MemoryAddress(14) }, public_key_x: HeapArray { pointer: MemoryAddress(8), size: 32 }, public_key_y: HeapArray { pointer: MemoryAddress(10), size: 32 }, signature: HeapArray { pointer: MemoryAddress(6), size: 64 }, result: MemoryAddress(3) }
