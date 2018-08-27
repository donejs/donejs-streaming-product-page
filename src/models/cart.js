import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import realTimeRestModel from "can-realtime-rest-model";
import loader from '@loader';

const Cart = DefineMap.extend({
  seal: false
}, {
  'id': {
		type: 'any',
		identity: true
	},
	count: "number"
});

Cart.List = DefineList.extend({
  '#': Cart
});

const url = loader.serviceBaseURL + '/api/cart';

Cart.connection = realTimeRestModel({
	url: {
		getData: url,
		createData: url,
		destroyData: url
	},
  Map: Cart,
  List: Cart.List,
  name: 'cart'
});

export default Cart;
