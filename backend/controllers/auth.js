const https = require('https');
const { jwtVerify, importJWK } = require('jose');

const CLIENT_ID = '475371833305-s13of6hvbgfnp18u7fn9gotn7pgurrlc.apps.googleusercontent.com';
const GOOGLE_ISSUERS = [
    'https://accounts.google.com',
    'accounts.google.com'
];
const GOOGLE_JWKS_URL = 'https://www.googleapis.com/oauth2/v3/certs';

let googleCerts = null;

// Fetch Google's public keys for verifying JWT signatures using https
async function fetchGoogleCerts() {
    return new Promise((resolve, reject) => {
        https.get(GOOGLE_JWKS_URL, (res) => {
            let data = '';

            // A chunk of data has been received.
            res.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received.
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    googleCerts = json.keys.reduce((acc, key) => {
                        acc[key.kid] = key;
                        return acc;
                    }, {});
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Middleware to verify the Google ID Token
async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const idToken = authHeader.split(' ')[1];

    // Fetch certs if not already fetched
    if (!googleCerts) {
        try {
            await fetchGoogleCerts();
        } catch (error) {
            console.error('Failed to fetch Google certs:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    try {
        const { payload } = await jwtVerify(idToken, async (header) => {
            const jwk = googleCerts[header.kid];
            if (!jwk) {
                throw new Error('Invalid Token');
            }
            return importJWK(jwk, 'RS256');
        }, {
            audience: CLIENT_ID,
            issuer: GOOGLE_ISSUERS
        });

        req.user = {
            id: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture
        };

        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = {
    verifyToken
};
