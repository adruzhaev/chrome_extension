import React, {createContext, type ReactNode, useState} from 'react';

export type IAuthContext = {
	secret: string;
	saveSecret: (id: string) => void;
};

export const AuthContext = createContext<IAuthContext>({
	secret: '',
	saveSecret: () => undefined,
});

export const AuthContextProvider = (props: {
	children: ReactNode;
}) => {
	const [secret, setSecret] = useState('');

	const saveSecret = (id: string) => {
		setSecret(id);
	};

	return <AuthContext.Provider value={{secret, saveSecret}}>
		{props.children}
	</AuthContext.Provider>;
};
