import QUnit from 'steal-qunit';
import { ViewModel } from './app-cart';

// ViewModel unit tests
QUnit.module('donejs-streaming-product-page/app-cart');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the app-cart component');
});
