# Development

This demo app works for both xCode's ios simulator with TouchID and iPhone with FaceID, but it is not recommended to run it on the iphone unless you run a remote PXE server. For more details on how to run this app on iPhone, please refer to [iPhone Development](#iphone-development).

The react-native app is located at `./react-native-app` folder, and others are submodules used by this app.

## Prerequisites

- [xcode](https://developer.apple.com/xcode/) latest version for building / debugging app on ios simulator
- [docker](https://docs.docker.com/get-docker/) for running sandbox

## Setup

clone this repository

```shell
git clone git@github.com:porco-rosso-j/aztec-mobile-wallet-dry.git
cd aztec-mobile-wallet-dry
```

clone submodules

```shell
 git submodule update --init --remote
```

## Build React Native App

```shell
cd react-native-app
yarn
```

## Sandbox

install and run sandbox with version 0.46.1

```shell
cd .aztec
export VERSION=0.46.1 aztec-up
aztec-sandbox
```

## Xcode

if you are unfamiliar with xcode, please refer to [the official doc](https://developer.apple.com/documentation/xcode) to learn more about how to install, build, and run the app.

### Open the Project

Open the xcode, click `Open Existing Project` and open the `./react-native-app/ios` folder.

### Install BBSwfit on xCode

Refer to the [Xcode's official doc](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app) to add BBSwift to your project.

BBSwift is located at the root `./BBSwift` of this repo.

### Build Pods

```shell
cd react-native-app/ios
pod install --repo-update
```

### Build Project

Select `My Mac (Designed for iPhone)` as the `Device Target`. And click the Build button at the top left corner of your xcode project. It takes a few minutes to build the project.

### After successfull build

You can do the following and it's recommended to do them in the order listed below:

- Log in
- Faucet to deploy and mint tokens
- Refresh to reflect the updated token balance ( optional )
- Send
- Refresh again

## Troubleshooting

1. `BBSwift not found` in building on xcode, although it's already added to the project dependencies
   close and re-launch xcode app. it may need to do this every time (after) you run `pod install`.

2. M1 mac specific errors in building on xcode
   if you are using M1 chip and facing unknown errors, you may better switch to rosetta 2 emulation mode. [Switch to rostta](https://www.godo.dev/tutorials/macos-x86_64-shell-from-arm64/)

   ```shell
   arch -x86_64 zsh // switch to rosetta 2 emulation mode
   pod install --repo-update
   ```

3. `verification == true` error at signing
   secp256r1 signature generation through secure enclave API is still a bit unstable. try couple of times.

4. `artifact doesn't match` error at runtime
   try rebuilding the project on xcode.

## iPhone Development

First, you need to self-host PXE server in a way that this app running on your iPhone can access it. it can be done by using your own server, ngrok, github codespaces, or any other way.

Second, you should build your project on xcode targeting your iPhone. Note that your iPhone's ios version should be 14.0 or higher.
