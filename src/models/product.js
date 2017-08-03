import connect from 'can-connect';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import set from 'can-set';
import loader from '@loader';

import dataUrl from "can-connect/data/url/url";
import constructor from "can-connect/constructor/constructor";
import constructorStore from  "can-connect/constructor/store/store";
import connectMap from "can-connect/can/map/map";
import ndjson from "can-connect-ndjson";

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

Product.connection = connect([
	constructor, connectMap, constructorStore,
	dataUrl, ndjson
], {
  url: loader.serviceBaseURL + '/api/product',
	ndjson: loader.serviceBaseURL + '/api/product',
  Map: Product,
  List: Product.List,
  name: 'product',
  algebra
});

export default Product;
