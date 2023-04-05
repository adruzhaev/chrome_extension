import React, {type ChangeEvent, useContext, useState} from 'react';
import {useChromeStorageLocal} from 'use-chrome-storage';
import {type Credentials} from '../../types/credentials';
import {goTo} from 'react-chrome-extension-router';
import {Account} from '../Account';
import axios from 'axios';
import {AuthContext} from '../../context/auth';
import {AppRoute, HOST} from '../../constants/routes';
import './Login.css';

export const Login = () => {
	const [login, setLogin] = useState('');
	const [signInError, setSignInError] = useState('');
	const {saveSecret} = useContext(AuthContext);
	const [value, setValue, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal<Credentials>('cred');

	const onClick = async () => {
		try {
			const request = await axios.post<{decrypted: string}>(`${HOST}${AppRoute.Decrypt}`, {
				encrypted: value!.encrypted,
				salt: value!.salt,
				iv: value!.iv,
				password: login,
			});

			saveSecret(request.data.decrypted);
			goTo(Account);
		} catch (err) {
			setSignInError('Wrong password');
		}
	};

	const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setLogin(evt.target.value);
	};

	return <div>
		<h2>Please login.</h2>

		<div className='login-container'>
			<input type='password' className='input' value={login} onChange={onChange} />

			<button className='button' onClick={async () => isInitialStateResolved && onClick()}>
                Sign in
			</button>
		</div>

		{signInError && <p>{signInError}</p>}
	</div>;
};
