import fixture from 'can-fixture';
import Cart from '../cart';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}], Cart.connection.algebra);

fixture('/api/cart/{id}', store);

export default store;
