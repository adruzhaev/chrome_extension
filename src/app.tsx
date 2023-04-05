import React from 'react';
import {Router} from 'react-chrome-extension-router';
import {Welcome} from './components/Welcome';
import {AuthContextProvider} from './context/auth';

export const App = () => <AuthContextProvider>
	<Router>
		<div>
			<Welcome />
		</div>
	</Router>
</AuthContextProvider>;
