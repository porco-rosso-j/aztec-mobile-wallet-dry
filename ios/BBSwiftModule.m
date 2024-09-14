// BBSwiftModule.m

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE (BBSwiftModule, NSObject)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(pedersenCommit
                                       : (NSArray<NSNumber *> *)inputs)

RCT_EXTERN_METHOD(pedersenHash : (NSArray<NSNumber *> *)inputs)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(poseidon2Hash
                                       : (NSArray<NSNumber *> *)inputs)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(ecdsaComputePublicKey
                                       : (NSArray<NSNumber *> *)privateKey)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(ecdsaConstructSignature
                                       : (NSArray<NSNumber *> *)message
                                       : (NSArray<NSNumber *> *)privateKey)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(ecdsaRecoverPublicKeyFromSignature
                                       : (NSArray<NSNumber *> *)message
                                       : (NSArray<NSNumber *> *)sigR
                                       : (NSArray<NSNumber *> *)sigS
                                       : (nonnull NSNumber *)sigV)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(ecdsaVerifySignature
                                       : (NSArray<NSNumber *> *)message
                                       : (NSArray<NSNumber *> *)publicKey
                                       : (NSArray<NSNumber *> *)sigR
                                       : (NSArray<NSNumber *> *)sigS
                                       : (nonnull NSNumber *)sigV)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(eccGrumpkinMul
                                       : (NSArray<NSNumber *> *)pointBuf
                                       : (NSArray<NSNumber *> *)scalarBuf)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(eccGrumpkinAdd
                                       : (NSArray<NSNumber *> *)pointABuf
                                       : (NSArray<NSNumber *> *)pointBBuf)

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

@end
