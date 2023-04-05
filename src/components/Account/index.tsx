import React, {useContext} from 'react';
import {useChromeStorageLocal} from 'use-chrome-storage';
import {Welcome} from '../Welcome';
import {generateSecret} from '../../helpers/generate-secret';
import {Link} from 'react-chrome-extension-router';
import {Login} from '../Login';
import {AuthContext} from '../../context/auth';
import {type Credentials} from '../../types/credentials';
import axios from 'axios';
import {HOST, AppRoute} from '../../constants/routes';
import './Account.css';

export const Account = () => {
	const {secret, saveSecret} = useContext(AuthContext);
	const [value, setValue, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal<Credentials>('cred');

	const onDeleteClick = () => {
		setValue({
			password: '',
			secret: undefined,
			encrypted: '',
			salt: '',
			iv: '',
		});
	};

	const regenerateSecret = async () => {
		const id = generateSecret(12);
		saveSecret(id);

		const request = await axios.post<{salt: string; iv: string; encrypted: string}>(`${HOST}${AppRoute.Encrypt}`, {
			text: id,
			password: value!.password,
		});

		setValue({
			...value,
			secret:
        request.data.encrypted,
			salt: request.data.salt,
			iv: request.data.iv,
			encrypted: request.data.encrypted,
		} as Credentials);
	};

	return <div className='container'>
		{isInitialStateResolved && <p>Your secret is <b>{secret}</b></p>}

		<button className='button' onClick={regenerateSecret}>
            Regenerate secret
		</button>

		<Link className='link' component={Login}>
            Logout
		</Link>

		<Link className='link' component={Welcome} onClick={onDeleteClick}>
            Reset extension
		</Link>
	</div>;
};
