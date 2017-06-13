var http = require("http");

var records = [
	{ id: 1, name: "Bone" },
	{ id: 2, name: "Food" }
];

function getList(req, res) {
	var wait = 200;
	var list = records.slice();
	function next() {
		var cur = list.shift();
		if(!cur) {
			res.end();
			return;
		}

		var str = JSON.stringify(cur) + "\n";
		res.write(str);
		setTimeout(next, wait);
	}

	res.writeHead(200, {
		"Content-Type": "application/json"
	});
	setTimeout(next, wait);
}

function get(req, res) {

}

function handler(req, res){
	switch(req.url) {
		case "/api/products":
			return getList(req, res);
		default:
			return get(req, res);
	}
}

http.createServer(handler).listen(8084);
