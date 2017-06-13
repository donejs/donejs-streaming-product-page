import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import set from 'can-set';
import superMap from 'can-connect/can/super-map/';
import loader from '@loader';

const Cart = DefineMap.extend({
  seal: false
}, {
  'id': 'any',
	count: "number"
});

const algebra = new set.Algebra(
  set.props.id('id')
);

Cart.List = DefineList.extend({
  '#': Cart
});

const url = loader.serviceBaseURL + '/api/cart';

Cart.connection = superMap({
	url: {
		getData: url,
		createData: url,
		destroyData: url
	},
  Map: Cart,
  List: Cart.List,
  name: 'cart',
  algebra
});

export default Cart;
