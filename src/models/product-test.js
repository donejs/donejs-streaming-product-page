import QUnit from 'steal-qunit';
import Product from './product';

QUnit.module('models/product');

QUnit.test('getList', function(){
  stop();
  Product.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.item(0).description, 'First item');
    start();
  });
});
