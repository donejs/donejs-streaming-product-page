import fixture from 'can-fixture';
import Product from '../product';

const store = fixture.store([{
  id: 0,
  name: "Bone"
}, {
  id: 1,
  name: "Food"
}], Product.connection.algebra);

fixture('/api/product/{id}', store);

export default store;
