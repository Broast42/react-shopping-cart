import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import ProductContext from './contexts/ProductContext';
import CartContext from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import { statement } from '@babel/template';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		// add the given item to the cart
		const data = [...cart, item];
		setCart(data);
		window.localStorage.setItem('cart', JSON.stringify(data));
	};

	const removeItem = id => {
		const newCart = cart.filter(x => x.id !== id);
		setCart(newCart);
		window.localStorage.setItem('cart', JSON.stringify(newCart));
	}

	
		useEffect(() => {
			
			if(window.localStorage.getItem('cart') !== null){
				const data = JSON.parse(window.localStorage.getItem('cart'));
				setCart(data);
			}
		},[]);
	

	return (
		<ProductContext.Provider value={{ products, addItem }}>
			<CartContext.Provider value={{ cart, removeItem}} >
				<div className="App">
					<Navigation />

					{/* Routes */}
					<Route exact path="/">
						<Products />
					</Route>

					<Route path="/cart">
						<ShoppingCart />
					</Route>
				</div>
			</CartContext.Provider>	
		</ProductContext.Provider>
		
	);
}

export default App;
