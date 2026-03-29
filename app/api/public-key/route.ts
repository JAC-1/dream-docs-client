import { NextResponse } from 'next/server';

// In production, this route serves the server's RSA public key to the client.
// The client uses it to encrypt the AES symmetric key before sending it to /api/encrypt,
// ensuring only the server (which holds the private key) can decrypt uploaded files.
export async function GET() {
  // PREVIEW MODE: return early — the CryptoClient short-circuits before needing a real key.
  if (process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true') {
    return NextResponse.json({ publicKey: 'preview-mode' });
  }

  try {
    const publicKey = process.env.PUBLIC_ENCRYPTION_KEY!;
    if (!publicKey) {
      return NextResponse.json(
        {
          error: 'Public Key not configured',
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ publicKey });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch public key' },
      { status: 500 }
    );
  }
}
