// PREVIEW MODE: Real Turso client is commented out.
// In production, this connects to the Turso (libSQL) SQLite database used to
// store encrypted file blobs, keyed by document ID.
//
// import { createClient } from '@libsql/client';
//
// export const turso = createClient({
//   url: process.env.TURSO_URL!,
//   authToken: process.env.TURSO_AUTH_TOKEN!,
// });

// Mock client — not used in preview mode; operations are mocked at the operations layer.
export const turso = null as any;
