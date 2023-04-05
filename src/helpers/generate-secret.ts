export const generateSecret = (idLength: number) => {
	let id = '';
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < idLength; i++) {
		id += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return id;
};
