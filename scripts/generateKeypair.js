const DiamSdk = require("diamante-sdk-js");

// Generate a new keypair
const pair = DiamSdk.Keypair.random();

console.log("Public Key:", pair.publicKey());
console.log("Secret Key:", pair.secret());
