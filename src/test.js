import F from 'funcunit';
import QUnit from 'steal-qunit';

import 'donejs-streaming-product-page/models/test';

import 'donejs-streaming-product-page/app-cart/app-cart-test';

import 'donejs-streaming-product-page/product-list/product-list-test';

F.attach(QUnit);

QUnit.module('donejs-streaming-product-page functional smoke test', {
  beforeEach() {
    F.open('./development.html');
  }
});

QUnit.test('donejs-streaming-product-page main page shows up', function() {
  F('title').text('donejs-streaming-product-page', 'Title is set');
});
