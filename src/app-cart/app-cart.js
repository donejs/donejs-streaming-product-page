import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './app-cart.less';
import view from './app-cart.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the app-cart component'
  }
});

export default Component.extend({
  tag: 'app-cart',
  ViewModel,
  view
});
