const express = require('express');
const crypto = require('crypto');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/encrypt', (req, res) => {
	const plaintext = req.body.text;
	const {password} = req.body;

	const salt = crypto.randomBytes(16);
	const key = crypto.scryptSync(password, salt, 32);

	const algorithm = 'aes-256-cbc';
	const iv = crypto.randomBytes(16);

	const cipher = crypto.createCipheriv(algorithm, key, iv);
	let encrypted = cipher.update(plaintext, 'utf8', 'hex');
	encrypted += cipher.final('hex');

	res.json({
		salt: salt.toString('hex'),
		iv: iv.toString('hex'),
		encrypted,
	});
});

app.post('/decrypt', (req, res) => {
	const {encrypted} = req.body;
	const salt = Buffer.from(req.body.salt, 'hex');
	const {password} = req.body;

	const key = crypto.scryptSync(password, salt, 32);

	const algorithm = 'aes-256-cbc';
	const iv = Buffer.from(req.body.iv, 'hex');

	const decipher = crypto.createDecipheriv(algorithm, key, iv);
	let decrypted = decipher.update(encrypted, 'hex', 'utf8');
	decrypted += decipher.final('utf8');

	res.json({
		decrypted,
	});
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
