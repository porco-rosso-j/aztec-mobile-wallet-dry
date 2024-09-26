import Foundation
import React
import BBSwift

extension RustVec where T == UInt8 {
  func toArray() -> [UInt8] {
    var array = [UInt8]()
    for index in 0..<self.len() { 
      if let element = self.get(index: UInt(index)) {
        array.append(element)
      }
    }
    return array
  }
}

@objc(BBSwiftModule)
class BBSwiftModule: NSObject {
  override init() {
    super.init()
    print("BBSwiftModule initialized in swift")
  }
  
  static func moduleName() -> String! {
    return "BBSwiftModule"
   }

 @objc
  static func requiresMainQueueSetup() -> Bool {
    // Return `true` if your module initializes any UI components
    return false
  }
  
@objc(pedersenCommit:resolve:reject:)
func pedersenCommit(_ inputs: [NSNumber], resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    // Perform computation in a background thread to avoid blocking the main thread
    DispatchQueue.global(qos: .userInitiated).async {
        // Convert [NSNumber] to [UInt8]
        let uint8Inputs = inputs.map { UInt8(truncating: $0) }
        
        // Check for empty input if necessary
        guard !uint8Inputs.isEmpty else {
            // Resolve with an empty array if the input is empty
            resolve([])
            return
        }

        // Perform your computation using BBSwift
        let resultRustVec: RustVec<UInt8> = uint8Inputs.withUnsafeBufferPointer { bufferPtr in
            return BBSwift.pedersen_commit_swift(bufferPtr)
        }

        // Convert RustVec<UInt8> to [UInt8]
        let result: [UInt8] = resultRustVec.toArray()
        // print("Result array in pedersenCommit: \(result)")

        // Convert [UInt8] to [NSNumber]
        let resultNSNumber = result.map { NSNumber(value: $0) }

        // Return the result in the resolve block
        DispatchQueue.main.async {
            resolve(resultNSNumber)
        }
    }
}

    @objc(pedersenHash:index:resolve:reject:)
    func pedersenHash(_ inputs: [NSNumber],
                      index: NSNumber,
                      resolve: @escaping RCTPromiseResolveBlock,
                      reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.global(qos: .userInitiated).async {
            let uint8Inputs = inputs.map { UInt8(truncating: $0) }

            let uint32Index = UInt32(truncating: index)

            guard !uint8Inputs.isEmpty else {
                resolve([])
                return
            }

            let resultRustVec: RustVec<UInt8> = uint8Inputs.withUnsafeBufferPointer { bufferPtr in
                return BBSwift.pedersen_hash_swift(bufferPtr, uint32Index)
            }

            let result = resultRustVec.toArray()
            // print("Result array in pedersenHash: \(result)")

            let resultNSNumber = result.map { NSNumber(value: $0) }

            DispatchQueue.main.async {
                resolve(resultNSNumber)
            }
        }
    }

    @objc(poseidon2Hash:resolve:reject:)
    func poseidon2Hash(_ inputs: [NSNumber],
                       resolve: @escaping RCTPromiseResolveBlock,
                       reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.global(qos: .userInitiated).async {
            let uint8Inputs = inputs.map { UInt8(truncating: $0) }

            guard !uint8Inputs.isEmpty else {
                resolve([])
                return
            }

            let resultRustVec: RustVec<UInt8> = uint8Inputs.withUnsafeBufferPointer { bufferPtr in
                return BBSwift.poseidon2_hash_swift(bufferPtr)
            }

            let result = resultRustVec.toArray()
            let resultNSNumber = result.map { NSNumber(value: $0) }

            DispatchQueue.main.async {
                resolve(resultNSNumber)
            }
        }
    }

    @objc(ecdsaComputePublicKey:resolve:reject:)
    func ecdsaComputePublicKey(_ privateKey: [NSNumber],
                               resolve: @escaping RCTPromiseResolveBlock,
                               reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.global(qos: .userInitiated).async {
            let uint8PrivateKey = privateKey.map { UInt8(truncating: $0) }

            guard !uint8PrivateKey.isEmpty else {
                resolve([])
                return
            }

            let resultRustVec: RustVec<UInt8> = uint8PrivateKey.withUnsafeBufferPointer { bufferPtr in
                return BBSwift.ecdsa__compute_public_key_swift(bufferPtr)
            }

            let result = resultRustVec.toArray()
            let resultNSNumber = result.map { NSNumber(value: $0) }

            DispatchQueue.main.async {
                resolve(resultNSNumber)
            }
        }
    }

    @objc(ecdsaConstructSignature:msgLen:privateKey:resolve:reject:)
    func ecdsaConstructSignature(_ message: [NSNumber],
                                 msgLen: NSNumber,
                                 privateKey: [NSNumber],
                                 resolve: @escaping RCTPromiseResolveBlock,
                                 reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.global(qos: .userInitiated).async {
            let uint8Message = message.map { UInt8(truncating: $0) }
            let uintMsgLen = UInt(truncating: msgLen)
            let uint8PrivateKey = privateKey.map { UInt8(truncating: $0) }

            guard !uint8Message.isEmpty, !uint8PrivateKey.isEmpty else {
                resolve([])
                return
            }

            let resultRustVec: RustVec<UInt8> = uint8Message.withUnsafeBufferPointer { messageBuffer in
                uint8PrivateKey.withUnsafeBufferPointer { privateKeyBuffer in
                    return BBSwift.ecdsa__construct_signature_swift(messageBuffer, uintMsgLen, privateKeyBuffer)
                }
            }

            let result = resultRustVec.toArray()
            let resultNSNumber = result.map { NSNumber(value: $0) }

            DispatchQueue.main.async {
                resolve(resultNSNumber)
            }
        }
    }

    @objc(ecdsaRecoverPublicKeyFromSignature:msgLen:sigR:sigS:sigV:resolve:reject:)
    func ecdsaRecoverPublicKeyFromSignature(_ message: [NSNumber],
                                            msgLen: NSNumber,
                                            sigR: [NSNumber],
                                            sigS: [NSNumber],
                                            sigV: NSNumber,
                                            resolve: @escaping RCTPromiseResolveBlock,
                                            reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.global(qos: .userInitiated).async {
            let uint8Message = message.map { UInt8(truncating: $0) }
            let uintMsgLen = UInt(truncating: msgLen)
            let uint8SigR = sigR.map { UInt8(truncating: $0) }
            let uint8SigS = sigS.map { UInt8(truncating: $0) }
            let uint8SigV = UInt8(truncating: sigV)

            guard !uint8Message.isEmpty, !uint8SigR.isEmpty, !uint8SigS.isEmpty else {
                resolve([])
                return
            }

            let resultRustVec: RustVec<UInt8> = uint8Message.withUnsafeBufferPointer { messageBuffer in
                uint8SigR.withUnsafeBufferPointer { sigRBuffer in
                    uint8SigS.withUnsafeBufferPointer { sigSBuffer in
                        return BBSwift.ecdsa__recover_public_key_from_signature_swift(messageBuffer, uintMsgLen, sigRBuffer, sigSBuffer, uint8SigV)
                    }
                }
            }

            let result = resultRustVec.toArray()
            let resultNSNumber = result.map { NSNumber(value: $0) }

            DispatchQueue.main.async {
                resolve(resultNSNumber)
            }
        }
    }

    @objc(ecdsaVerifySignature:msgLen:publicKey:sigR:sigS:sigV:resolve:reject:)
    func ecdsaVerifySignature(_ message: [NSNumber],
                              msgLen: NSNumber,
                              publicKey: [NSNumber],
                              sigR: [NSNumber],
                              sigS: [NSNumber],
                              sigV: NSNumber,
                              resolve: @escaping RCTPromiseResolveBlock,
                              reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.global(qos: .userInitiated).async {
            let uint8Message = message.map { UInt8(truncating: $0) }
            let uintMsgLen = UInt(truncating: msgLen)
            let uint8PublicKey = publicKey.map { UInt8(truncating: $0) }
            let uint8SigR = sigR.map { UInt8(truncating: $0) }
            let uint8SigS = sigS.map { UInt8(truncating: $0) }
            let uint8SigV = UInt8(truncating: sigV)

            guard !uint8Message.isEmpty, !uint8PublicKey.isEmpty, !uint8SigR.isEmpty, !uint8SigS.isEmpty else {
                resolve(false)
                return
            }

            do {
                try uint8Message.withUnsafeBufferPointer { messageBuffer in
                    try uint8PublicKey.withUnsafeBufferPointer { publicKeyBuffer in
                        try uint8SigR.withUnsafeBufferPointer { sigRBuffer in
                            try uint8SigS.withUnsafeBufferPointer { sigSBuffer in
                                BBSwift.ecdsa__verify_signature_swift(messageBuffer, uintMsgLen, publicKeyBuffer, sigRBuffer, sigSBuffer, uint8SigV)
                            }
                        }
                    }
                }
                DispatchQueue.main.async {
                    resolve(true)
                }
            } catch {
                DispatchQueue.main.async {
                    reject("ECDSA_VERIFY_ERROR", error.localizedDescription, error)
                }
            }
        }
    }

    @objc(eccGrumpkinMul:scalarBuf:resolve:reject:)
    func eccGrumpkinMul(_ pointBuf: [NSNumber],
                        scalarBuf: [NSNumber],
                        resolve: @escaping RCTPromiseResolveBlock,
                        reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.global(qos: .userInitiated).async {
            let uint8PointBuf = pointBuf.map { UInt8(truncating: $0) }
            let uint8ScalarBuf = scalarBuf.map { UInt8(truncating: $0) }

            guard !uint8PointBuf.isEmpty, !uint8ScalarBuf.isEmpty else {
                resolve([])
                return
            }

            let resultRustVec: RustVec<UInt8> = uint8PointBuf.withUnsafeBufferPointer { pointBuffer in
                uint8ScalarBuf.withUnsafeBufferPointer { scalarBuffer in
                    return BBSwift.ecc_grumpkin__mul_swift(pointBuffer, scalarBuffer)
                }
            }

            let result = resultRustVec.toArray()
            let resultNSNumber = result.map { NSNumber(value: $0) }

            DispatchQueue.main.async {
                resolve(resultNSNumber)
            }
        }
    }

    @objc(eccGrumpkinAdd:pointBBuf:resolve:reject:)
    func eccGrumpkinAdd(_ pointABuf: [NSNumber],
                        pointBBuf: [NSNumber],
                        resolve: @escaping RCTPromiseResolveBlock,
                        reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.global(qos: .userInitiated).async {
            let uint8PointABuf = pointABuf.map { UInt8(truncating: $0) }
            let uint8PointBBuf = pointBBuf.map { UInt8(truncating: $0) }

            guard !uint8PointABuf.isEmpty, !uint8PointBBuf.isEmpty else {
                resolve([])
                return
            }

            let resultRustVec: RustVec<UInt8> = uint8PointABuf.withUnsafeBufferPointer { pointABuffer in
                uint8PointBBuf.withUnsafeBufferPointer { pointBBuffer in
                    return BBSwift.ecc_grumpkin__add_swift(pointABuffer, pointBBuffer)
                }
            }

            let result = resultRustVec.toArray()
            let resultNSNumber = result.map { NSNumber(value: $0) }

            DispatchQueue.main.async {
                resolve(resultNSNumber)
            }
        }
    }
}
