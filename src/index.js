var ndjsonStream = require("can-ndjson-stream");
var isNode = require("detect-node");
require("./styles.less");
require("./product-list/product-list.less");

// Export for Node usage
module.exports = function(request){
	renderApp(request, document);
};

function productItem(product) {
	var li = document.createElement("li");
	li.innerHTML = `
    <aside>
      <img class="product-image" src="${product.image}" />
    </aside>

    <div class="product-info">
      <header>
        <h1>${product.name}</h1>
      </header>
    </div>
	`;
	return li;
}

function renderApp(request, document) {
	var ctn = document.createTextNode.bind(document);
	document.title = "Dog Stuff";

	document.body.innerHTML = `
    <header>
      <div class="header-left">
        <h1>Dog Stuff</h1>
      </div>
      <div class="header-right">
        <div id="cart"></div>
      </div>
    </header>

    <main>
      <section class="product-page">
        <aside class="sideoptions">
          <h1>Categories</h1>
          <ul>
          <li>Bones</li>
          <li>Food brands</li>
          </ul>
        </aside>
        <div class="product-list">
          <ul id="products" class="list-of-products">
          </ul>
        </div>
      </section>
    </main>

    <script src="./node_modules/steal/steal.js"></script>
	`;

	async function listProducts() {
		let productsList = document.getElementById("products");
		let response = await fetch("/api/product");

		let stream = ndjsonStream(response.body);
		let reader = stream.getReader();
		let result = await reader.read();

		while(!result.done) {
			let product = result.value;
			productsList.appendChild(
				productItem(product)
			);

			result = await reader.read();
		}
	}

	async function getCart() {
		let response = await fetch("/api/cart");
		let cart = await response.json();
		console.log("got cart");
		document.getElementById("cart").appendChild(ctn(cart.count));
	}

	Promise.all([
		getCart(),
		listProducts()
	]).catch(err => {
		console.error(err);
	});
}

if(!isNode) {
	var doc = document.implementation.createHTMLDocument();
	renderApp({url:location.href}, doc);

	// Handoff for reattachment
	doneSsrAttach(doc);
}
