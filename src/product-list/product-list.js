import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './product-list.less';
import Product from '../models/product';
import view from './product-list.stache';

export const ViewModel = DefineMap.extend({
  products: {
    Type: Product,
    get: function(lastSet, resolve){
      this.productsPromise.then(resolve);
    }
  },
  message: {
    value: 'This is the product-list component'
  },
  get productsPromise() {
    return Product.getList({});
  }
});

export default Component.extend({
  tag: 'product-list',
  ViewModel,
  view
});
