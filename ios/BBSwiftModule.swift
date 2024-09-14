import Foundation
import React
import BBSwift

extension RustVec where T == UInt8 {
  func toArray() -> [UInt8] {
    var array = [UInt8]()
    for index in 0..<self.len() { // Use self.len() instead of self.len
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
  
  func requiresMainQueueSetup() -> Bool {
    // Return `true` if your module initializes any UI components
    return false
  }
  
  @objc
  func pedersenCommit(_ inputs: [NSNumber]) -> [UInt8]? {
    // Convert [NSNumber] to [UInt8]
    let uint8Inputs = inputs.map { UInt8(truncating: $0) }
    
    // Check for empty input if necessary
    guard !uint8Inputs.isEmpty else {
      return nil
    }
    
    // Call the Rust function via SwiftBridge
    let result = uint8Inputs.withUnsafeBufferPointer { bufferPointer in
      pedersen_commit_swift(bufferPointer)
    }
    
    // Convert RustVec<UInt8> to [UInt8]
    return result.toArray()
  }


func pedersenHash(_ inputs: [NSNumber]) -> [UInt8]? {
    let uint8Inputs = inputs.map { UInt8(truncating: $0) }
    guard !uint8Inputs.isEmpty else { return nil }
    let result = uint8Inputs.withUnsafeBufferPointer { bufferPointer in
        pedersen_hash_swift(bufferPointer)
    }
    return result.toArray()
}

@objc
func poseidon2Hash(_ inputs: [NSNumber]) -> [UInt8]? {
    let uint8Inputs = inputs.map { UInt8(truncating: $0) }
    guard !uint8Inputs.isEmpty else { return nil }
    let result = uint8Inputs.withUnsafeBufferPointer { bufferPointer in
        poseidon2_hash_swift(bufferPointer)
    }
    return result.toArray()
}

@objc
func ecdsaComputePublicKey(_ privateKey: [NSNumber]) -> [UInt8]? {
    let uint8PrivateKey = privateKey.map { UInt8(truncating: $0) }
    guard uint8PrivateKey.count == 32 else { return nil } // ECDSA private keys are 32 bytes
    let result = uint8PrivateKey.withUnsafeBufferPointer { bufferPointer in
        ecdsa__compute_public_key_swift(bufferPointer)
    }
    return result.toArray()
}


@objc
func ecdsaConstructSignature(_ message: [NSNumber], _ privateKey: [NSNumber]) -> [UInt8]? {
    let uint8Message = message.map { UInt8(truncating: $0) }
    let uint8PrivateKey = privateKey.map { UInt8(truncating: $0) }
    guard uint8PrivateKey.count == 32 else { return nil }
    let msgLen = UInt(uint8Message.count)
    let result = uint8Message.withUnsafeBufferPointer { messageBuffer in
        uint8PrivateKey.withUnsafeBufferPointer { privateKeyBuffer in
            ecdsa__construct_signature_swift(messageBuffer, msgLen, privateKeyBuffer)
        }
    }
    return result.toArray()
}


@objc
func ecdsaConstructSignature(_ message: [NSNumber], _ privateKey: [NSNumber]) -> [UInt8]? {
    let uint8Message = message.map { UInt8(truncating: $0) }
    let uint8PrivateKey = privateKey.map { UInt8(truncating: $0) }
    guard uint8PrivateKey.count == 32 else { return nil }
    let msgLen = UInt(uint8Message.count)
    let result = uint8Message.withUnsafeBufferPointer { messageBuffer in
        uint8PrivateKey.withUnsafeBufferPointer { privateKeyBuffer in
            ecdsa__construct_signature_swift(messageBuffer, msgLen, privateKeyBuffer)
        }
    }
    return result.toArray()
}


@objc
func ecdsaRecoverPublicKeyFromSignature(_ message: [NSNumber], _ sigR: [NSNumber], _ sigS: [NSNumber], _ sigV: NSNumber) -> [UInt8]? {
    let uint8Message = message.map { UInt8(truncating: $0) }
    let uint8SigR = sigR.map { UInt8(truncating: $0) }
    let uint8SigS = sigS.map { UInt8(truncating: $0) }
    let uint8SigV = UInt8(truncating: sigV)
    guard uint8SigR.count == 32, uint8SigS.count == 32 else { return nil }
    let msgLen = UInt(uint8Message.count)
    let result = uint8Message.withUnsafeBufferPointer { messageBuffer in
        uint8SigR.withUnsafeBufferPointer { sigRBuffer in
            uint8SigS.withUnsafeBufferPointer { sigSBuffer in
                ecdsa__recover_public_key_from_signature_swift(
                    messageBuffer, msgLen, sigRBuffer, sigSBuffer, uint8SigV
                )
            }
        }
    }
    return result.toArray()
}

@objc
func ecdsaVerifySignature(_ message: [NSNumber], _ publicKey: [NSNumber], _ sigR: [NSNumber], _ sigS: [NSNumber], _ sigV: NSNumber) -> Bool {
    let uint8Message = message.map { UInt8(truncating: $0) }
    let uint8PublicKey = publicKey.map { UInt8(truncating: $0) }
    let uint8SigR = sigR.map { UInt8(truncating: $0) }
    let uint8SigS = sigS.map { UInt8(truncating: $0) }
    let uint8SigV = UInt8(truncating: sigV)
    guard uint8PublicKey.count == 64, uint8SigR.count == 32, uint8SigS.count == 32 else { return false }
    let msgLen = UInt(uint8Message.count)
    uint8Message.withUnsafeBufferPointer { messageBuffer in
        uint8PublicKey.withUnsafeBufferPointer { publicKeyBuffer in
            uint8SigR.withUnsafeBufferPointer { sigRBuffer in
                uint8SigS.withUnsafeBufferPointer { sigSBuffer in
                    ecdsa__verify_signature_swift(
                        messageBuffer, msgLen, publicKeyBuffer, sigRBuffer, sigSBuffer, uint8SigV
                    )
                }
            }
        }
    }
    // Assuming the Rust function returns a result or throws an error if verification fails
    // If it doesn't throw, and just returns, you might need to adjust the logic
    return true
}


@objc
func eccGrumpkinMul(_ pointBuf: [NSNumber], _ scalarBuf: [NSNumber]) -> [UInt8]? {
    let uint8PointBuf = pointBuf.map { UInt8(truncating: $0) }
    let uint8ScalarBuf = scalarBuf.map { UInt8(truncating: $0) }
    guard uint8PointBuf.count == 64, uint8ScalarBuf.count == 32 else { return nil }
    let result = uint8PointBuf.withUnsafeBufferPointer { pointBuffer in
        uint8ScalarBuf.withUnsafeBufferPointer { scalarBuffer in
            ecc_grumpkin__mul_swift(pointBuffer, scalarBuffer)
        }
    }
    return result.toArray()
}

@objc
func eccGrumpkinAdd(_ pointABuf: [NSNumber], _ pointBBuf: [NSNumber]) -> [UInt8]? {
    let uint8PointABuf = pointABuf.map { UInt8(truncating: $0) }
    let uint8PointBBuf = pointBBuf.map { UInt8(truncating: $0) }
    guard uint8PointABuf.count == 64, uint8PointBBuf.count == 64 else { return nil }
    let result = uint8PointABuf.withUnsafeBufferPointer { pointABuffer in
        uint8PointBBuf.withUnsafeBufferPointer { pointBBuffer in
            ecc_grumpkin__add_swift(pointABuffer, pointBBuffer)
        }
    }
    return result.toArray()
}


}
