import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import set from 'can-set';
import superMap from 'can-connect/can/super-map/';
import loader from '@loader';

const Product = DefineMap.extend({
  seal: false
}, {
  'id': 'any'
});

const algebra = new set.Algebra(
  set.props.id('id')
);

Product.List = DefineList.extend({
  '#': Product
});

Product.connection = superMap({
  url: loader.serviceBaseURL + '/api/product',
  Map: Product,
  List: Product.List,
  name: 'product',
  algebra
});

export default Product;
