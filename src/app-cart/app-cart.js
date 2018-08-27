import Component from 'can-component';
import DefineMap from 'can-define/map/map';
import './app-cart.less';
import view from './app-cart.stache';
import Cart from '../models/cart';

export const ViewModel = DefineMap.extend({
	get cartPromise() {
		return Cart.get({});
	},

	cart: {
		get: function(lastSet, resolve){
			this.cartPromise.then(resolve);
		}
	},

	count: {
		type: "number",
		default: 0,
		get: function(lastSet, resolve){
			var cart = this.cart;
			if(cart) {
				resolve(cart.count);
			}
		}
	}
});

export default Component.extend({
  tag: 'app-cart',
  ViewModel,
  view
});
