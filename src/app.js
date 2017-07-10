import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';

const AppViewModel = DefineMap.extend({
  page: "string",
  title: {
    value: 'Dog Stuff',
    serialize: false
  },
	addCartError: function([,err]){
		console.error("Cart error:", err);
	}
});

route("{page}", { page: "home" });

export default AppViewModel;
