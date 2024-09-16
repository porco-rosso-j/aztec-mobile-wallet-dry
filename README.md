
# Dry{Aztec}: Mobile Wallet on Aztec

// demo video here

Dry{Aztec} is a mobile wallet on Aztec Network that allows users to control wallet with Face ID/Fingerprint tapping into iphone’s Secure Enclave. It enables them to privately hold, send, and receive assets and interact with privacy-preserving applications. 

This wallet is tailored for natively working in mobile environment. Unlike browser-based aztec wallets, it executes barretenberg’s cryptographic computations natively on mobile instead of relying on wasm.  

## Core components

### bb_rs
A rust wrapper of barretenberg  ( its original is implemented in C++ )
credit: Theo & …

### BBSwift
A swift module, a bridge between react native and bb_rs. 

### react-native-bb.js
A javascript package for calling methods exposed by BBSwift, a replacement of @aztec/bb.js.

### yarn-project-async
Modified forks of aztec modules, e.g. aztec.js, circuits.js, and foundation, that enables asynchronous executions across these js libraries. 

## Challenges/Limitations

### limited supported methods & PXE Service unsupported
Currently, BBSwift exposes around 10 methods from bb_rs, such as hashing, grumpkin, and ecdsa, which is sufficient to make aztec.js and other aztec libraries work at the basic level, e.g. simulating and sending transactions, on react native environment. But it requires many more methods, esp, acir-related functions, to support proving and run PXE service natively on mobile.

### Incompatibility with aztec modules
Asynchronous version of aztec modules are necessary as interacting with react native’s native modules synchronously is not a recommended way and likely to cause many issues. In this fork, most functions use async/await. 

### limited iOS support ( + android not implemented )
Even the demo uses xcode’s simulator instead of real iPhone, as @porco has iPhone 13, this app only supports >14 iOS. Android should also be supported.
