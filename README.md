
# Dry{Aztec}: Mobile Wallet on Aztec

https://github.com/user-attachments/assets/17cce2bd-515e-4446-9266-5493cce65450

Dry{Aztec} is a mobile wallet on Aztec Network that allows users to control their wallet with Face ID/Fingerprint-based keypair secured by the iPhone’s Secure Enclave. It lets them privately hold, send, and receive assets and interact with privacy-preserving applications.

This wallet is tailored for natively working in the mobile environment. Unlike browser-based Aztec wallets, it executes Barretenberg’s cryptographic computations natively on mobile instead of relying on wasm.

## Core components

### bb_rs
A rust wrapper of Barretenberg  ( its original is implemented in C++ )  
- credit: [Theo](https://github.com/madztheo)    
- link: https://github.com/porco-rosso-j/aztec-packages/tree/aztec-bb/barretenberg/bb_rs  

### BBSwift
A swift module, a bridge between react native and bb_rs.   
- link: https://github.com/porco-rosso-j/bb-swift  
- inspiration: https://github.com/Swoir/Swoirenberg  

### react-native-bb.js
A javascript package for calling methods exposed by BBSwift, a replacement of @aztec/bb.js.  
- link: https://github.com/porco-rosso-j/react-native-bb.js

### yarn-project-async
Modified forks of aztec modules, e.g., aztec.js, circuits.js, and foundation, that enable asynchronous executions across these js libraries.   
- link: https://github.com/porco-rosso-j/yarn-project-async

## Challenges/Limitations

### limited supported methods & PXE Service unsupported
Currently, BBSwift exposes around 10 methods from bb_rs, such as hashing, grumpkin, and ecdsa, which is sufficient to make aztec.js and other aztec libraries work at the basic level, e.g. simulating and sending transactions, on react native environment. But it requires many more methods, esp, acir-related functions, to support proving and run PXE service natively on mobile.

### Incompatibility with aztec modules
Asynchronous version of aztec modules are necessary as interacting with react native’s native modules synchronously is not a recommended way and likely to cause many issues. In this fork, most functions use async/await. 
