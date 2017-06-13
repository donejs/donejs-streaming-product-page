import QUnit from 'steal-qunit';
import { ViewModel } from './product-list';

// ViewModel unit tests
QUnit.module('donejs-streaming-product-page/product-list');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the product-list component');
});
