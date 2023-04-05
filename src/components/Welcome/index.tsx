import React, {useContext} from 'react';
import {Link} from 'react-chrome-extension-router';
import {useChromeStorageLocal} from 'use-chrome-storage';
import {AuthContext} from '../../context/auth';
import {generateSecret} from '../../helpers/generate-secret';
import {SignUp} from '../SignUp';
import {Login} from '../Login';
import './welcome.css';
import {type Credentials} from '../../types/credentials';

export const Welcome = () => {
	const id = generateSecret(12);
	const {saveSecret} = useContext(AuthContext);
	const [value] = useChromeStorageLocal<Credentials>('cred');

	return <div className='container'>
		{
			value?.secret === undefined && <>
				<h1>Hello, new user!</h1>
				<p>Your secret is: <b>{id}</b></p>
				<Link
					className='button'
					onClick={() => {
						saveSecret(id);
					}}
					component={SignUp}
				>
                    Next
				</Link>
			</>
		}

		{
			value?.secret !== undefined && <Login />
		}
	</div>;
};
