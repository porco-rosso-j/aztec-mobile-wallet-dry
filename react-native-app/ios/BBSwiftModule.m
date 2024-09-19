//
//  BBSwiftModule.m
//  ReactNativeStarter
//
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE (BBSwiftModule, NSObject)

RCT_EXTERN_METHOD(pedersenCommit
                  : (NSArray<NSNumber *> *)inputs resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(pedersenHash
                  : (NSArray<NSNumber *> *)inputs index
                  : (nonnull NSNumber *)index resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(poseidon2Hash
                  : (NSArray<NSNumber *> *)inputs resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(poseidon2Hash
                  : (NSArray<NSNumber *> *)inputs resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(ecdsaComputePublicKey
                  : (NSArray<NSNumber *> *)privateKey resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(ecdsaConstructSignature
                  : (NSArray<NSNumber *> *)message msgLen
                  : (nonnull NSNumber *)msgLen privateKey
                  : (NSArray<NSNumber *> *)privateKey resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(ecdsaRecoverPublicKeyFromSignature
                  : (NSArray<NSNumber *> *)message msgLen
                  : (nonnull NSNumber *)msgLen sigR
                  : (NSArray<NSNumber *> *)sigR sigS
                  : (NSArray<NSNumber *> *)sigS sigV
                  : (nonnull NSNumber *)sigV resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(ecdsaVerifySignature
                  : (NSArray<NSNumber *> *)message msgLen
                  : (nonnull NSNumber *)msgLen publicKey
                  : (NSArray<NSNumber *> *)publicKey sigR
                  : (NSArray<NSNumber *> *)sigR sigS
                  : (NSArray<NSNumber *> *)sigS sigV
                  : (nonnull NSNumber *)sigV resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(eccGrumpkinMul
                  : (NSArray<NSNumber *> *)pointBuf scalarBuf
                  : (NSArray<NSNumber *> *)scalarBuf resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(eccGrumpkinAdd
                  : (NSArray<NSNumber *> *)pointABuf pointBBuf
                  : (NSArray<NSNumber *> *)pointBBuf resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

@end
