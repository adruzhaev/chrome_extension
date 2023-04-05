export type Credentials = {
	secret: string | undefined;
	password: string;
	encrypted: string;
	salt: string;
	iv: string;
};
