const crypto = require('crypto');

// Generate random secret key
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Secret key:', secretKey);
