import connect from 'can-connect';
import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import loader from '@loader';

import dataUrl from "can-connect/data/url/url";
import constructor from "can-connect/constructor/constructor";
import constructorStore from  "can-connect/constructor/store/store";
import connectMap from "can-connect/can/map/map";
import ndjson from "can-connect-ndjson";

const Product = DefineMap.extend({
  seal: false
}, {
  'id': {
		type: 'any',
		identity: true
	}
});

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
  name: 'product'
});

export default Product;
