import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';

const AppViewModel = DefineMap.extend({
  page: "string",
  title: {
    default: 'Dog Things',
    serialize: false
  },
	addCartError: function([,err]){
		console.error("Cart error:", err);
	}
});

route.register("{page}", { page: "home" });

export default AppViewModel;
