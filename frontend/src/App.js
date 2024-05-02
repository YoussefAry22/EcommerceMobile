import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { setupIonicReact } from '@ionic/react';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect } from 'react';
import { fetchData } from './data/fetcher';
import CategoryProducts from './pages/CategoryProducts';
import Product from './pages/Product';
import FavouriteProducts from './pages/FavouriteProducts';
import CartProducts from './pages/CartProducts';
import SignIn from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import Profile from './pages/Profile';
import SignInAdmin from './pages/SignInAdmin';
import Dashboard from './pages/Dashboard';

setupIonicReact({});

const App = () => {

	useEffect(() => {

		fetchData();
	}, []);

	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<Switch>
						<Route path="/" exact={true}>
							<Redirect to="/home" />
						</Route>
						<Route path="/home" exact={true}>
							<Home />
						</Route>

						<Route path="/favourites" exact>
							<FavouriteProducts />
						</Route>

						<Route path="/cart" exact>
							<CartProducts />
						</Route>

						<Route path="/category/:slug" exact>
							<CategoryProducts />
						</Route>

						<Route path="/category/:slug/:id" exact>
							<Product />
						</Route>

						{/* Admin Routage */}
						<Route path="/signinasadmin" exact>
							<SignInAdmin />
						</Route>
						<Route path="/dashboard" exact>
							<Dashboard />
						</Route>


						{/* ///// */}
						<Route path="/signin" exact>
							<SignIn />
						</Route>
						<Route path="/signup" exact>
							<SignUpPage />
						</Route>
						<Route path="/profile" exact>
							<Profile />
						</Route>
					</Switch>
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	);
}

export default App;