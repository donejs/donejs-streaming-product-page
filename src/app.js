import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';

const AppViewModel = DefineMap.extend({
  page: "string",
  title: {
    value: 'donejs-streaming-product-page',
    serialize: false
  }
});

route(":page", { page: "home" });

export default AppViewModel;
