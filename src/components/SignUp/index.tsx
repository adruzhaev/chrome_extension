import React, {type ChangeEvent, useContext, useState} from 'react';
import {AuthContext} from '../../context/auth';
import {useChromeStorageLocal} from 'use-chrome-storage';
import {Link} from 'react-chrome-extension-router';
import {Login} from '../Login';
import {type Credentials} from '../../types/credentials';
import axios from 'axios';
import {AppRoute, HOST} from '../../constants/routes';
import './sign-up.css';

export const SignUp = () => {
	const [password, setPassword] = useState({
		first: '',
		confirm: '',
	});

	const {secret} = useContext(AuthContext);
	const [_, setValue] = useChromeStorageLocal<Credentials>('cred');

	const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setPassword({...password, [evt.target.name]: evt.target.value});
	};

	const onLoginClick = async () => {
		const request = await axios.post<{salt: string; iv: string; encrypted: string}>(`${HOST}${AppRoute.Encrypt}`, {
			text: secret,
			password: password.confirm,
		});

		setValue({password: password.confirm, secret: request.data.encrypted, salt: request.data.salt, iv: request.data.iv, encrypted: request.data.encrypted});
	};

	const isDisabled = password.first !== '' && password.confirm !== ''
        && password.first === password.confirm;

	return <div className='container'>
		<p>Provide and confirm your password.</p>

		<form className='form'>
			<input
				className='input'
				type='password'
				name='first'
				value={password.first}
				onChange={onPasswordChange}
			/>
			<input
				className='input'
				type='password'
				name='confirm'
				value={password.confirm}
				onChange={onPasswordChange}
			/>
		</form>

		{isDisabled && <Link className='link' onClick={onLoginClick} component={Login}>Next</Link>}
	</div>;
};
