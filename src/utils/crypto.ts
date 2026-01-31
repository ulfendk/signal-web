/**
 * Browser-compatible cryptographic utilities
 * 
 * This module provides browser-compatible implementations of cryptographic
 * operations needed for the Signal protocol, using the Web Crypto API.
 * 
 * Note: This is a simplified implementation for educational/demo purposes.
 * A production implementation would use the full Signal Protocol.
 */

/**
 * Generate an Elliptic Curve key pair (P-256)
 * This is browser-compatible using Web Crypto API
 */
export async function generateKeyPair(): Promise<CryptoKeyPair> {
  return await crypto.subtle.generateKey(
    {
      name: 'ECDH',
      namedCurve: 'P-256', // Using P-256 instead of Curve25519 for browser compatibility
    },
    true, // extractable
    ['deriveKey', 'deriveBits']
  );
}

/**
 * Export a public key to bytes
 */
export async function exportPublicKey(publicKey: CryptoKey): Promise<Uint8Array> {
  const exported = await crypto.subtle.exportKey('raw', publicKey);
  return new Uint8Array(exported);
}

/**
 * Export a private key to bytes
 */
export async function exportPrivateKey(privateKey: CryptoKey): Promise<Uint8Array> {
  const exported = await crypto.subtle.exportKey('pkcs8', privateKey);
  return new Uint8Array(exported);
}

/**
 * Import a public key from bytes
 */
export async function importPublicKey(keyBytes: Uint8Array): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    'raw',
    keyBytes.buffer as ArrayBuffer,
    {
      name: 'ECDH',
      namedCurve: 'P-256',
    },
    true,
    []
  );
}

/**
 * Import a private key from bytes
 */
export async function importPrivateKey(keyBytes: Uint8Array): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    'pkcs8',
    keyBytes.buffer as ArrayBuffer,
    {
      name: 'ECDH',
      namedCurve: 'P-256',
    },
    true,
    ['deriveKey', 'deriveBits']
  );
}

/**
 * Perform ECDH key agreement
 */
export async function deriveSharedSecret(privateKey: CryptoKey, publicKey: CryptoKey): Promise<Uint8Array> {
  const sharedSecret = await crypto.subtle.deriveBits(
    {
      name: 'ECDH',
      public: publicKey,
    },
    privateKey,
    256 // 256 bits
  );
  return new Uint8Array(sharedSecret);
}

/**
 * HKDF key derivation
 * Simplified implementation using HKDF from Web Crypto API
 */
export async function hkdf(
  outputLength: number,
  keyMaterial: Uint8Array,
  label: Uint8Array,
  salt: Uint8Array
): Promise<Uint8Array> {
  // Import the key material
  const inputKey = await crypto.subtle.importKey(
    'raw',
    keyMaterial.buffer as ArrayBuffer,
    { name: 'HKDF' },
    false,
    ['deriveBits']
  );

  // Derive the output key
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: salt.buffer as ArrayBuffer,
      info: label.buffer as ArrayBuffer,
    },
    inputKey,
    outputLength * 8 // Convert bytes to bits
  );

  return new Uint8Array(derivedBits);
}

/**
 * Simple wrapper class for private keys
 */
export class PrivateKey {
  constructor(private key: CryptoKey) {}

  static async generate(): Promise<PrivateKey> {
    const keyPair = await generateKeyPair();
    return new PrivateKey(keyPair.privateKey);
  }

  getPublicKey(): PublicKey {
    // Note: In a real implementation, we'd need to store the public key separately
    // For now, this is a placeholder that will work with the mock implementation
    throw new Error('getPublicKey() requires the public key to be stored separately');
  }

  async agree(publicKey: PublicKey): Promise<Uint8Array> {
    return await deriveSharedSecret(this.key, publicKey.key);
  }

  async serialize(): Promise<Uint8Array> {
    return await exportPrivateKey(this.key);
  }

  getCryptoKey(): CryptoKey {
    return this.key;
  }
}

/**
 * Simple wrapper class for public keys
 */
export class PublicKey {
  constructor(public key: CryptoKey) {}

  static async deserialize(keyBytes: Uint8Array): Promise<PublicKey> {
    const key = await importPublicKey(keyBytes);
    return new PublicKey(key);
  }

  async serialize(): Promise<Uint8Array> {
    return await exportPublicKey(this.key);
  }
}

/**
 * Generate a key pair and return both private and public keys
 */
export async function generateKeyPairWrapper(): Promise<{ privateKey: PrivateKey; publicKey: PublicKey }> {
  const keyPair = await generateKeyPair();
  return {
    privateKey: new PrivateKey(keyPair.privateKey),
    publicKey: new PublicKey(keyPair.publicKey),
  };
}
