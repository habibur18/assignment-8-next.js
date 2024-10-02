export async function GET() {
  return new Response("Hello, Next.js!", {
    status: 200,
  });
}

// import crypto from "crypto";

// // Generate 64-bit (8 bytes) secrets
// const ACCESS_TOKEN_SECRET = crypto.randomBytes(32).toString("hex");
// const REFRESH_TOKEN_SECRET = crypto.randomBytes(32).toString("hex");

// console.log("Access Token Secret:", ACCESS_TOKEN_SECRET);
// console.log("Refresh Token Secret:", REFRESH_TOKEN_SECRET);
