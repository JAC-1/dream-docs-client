import { NextResponse } from 'next/server';

export async function GET() {
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

// // app/api/public-key/route.ts
// import { NextResponse } from 'next/server';
//
// export async function GET() {
//   try {
//     // Fetch the public key from your environment or secure storage
//     const publicKey = process.env.PUBLIC_ENCRYPTION_KEY;
//
//     if (!publicKey) {
//       return NextResponse.json(
//         { error: 'Public key not configured' },
//         { status: 500 }
//       );
//     }
//
//     return NextResponse.json({ publicKey });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch public key' },
//       { status: 500 }
//     );
//   }
// }
