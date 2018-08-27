var http = require("http");
var URL = require("url").URL;
var records = require("./db.json");

function getList(req, res) {
	var wait = 200;
	var list = records.slice().map(rec => JSON.stringify(rec));
	var len = list.reduce((size, cur) => { size += Buffer.byteLength(cur); return size; }, 0);

	function next() {
		var cur = list.shift();
		if(!cur) {
			res.end();
			return;
		}

		var str = cur + "\n";
		res.write(str);
		setTimeout(next, wait);
	}

	res.writeHead(200, {
		"Content-Type": "application/x-ndjson",
		"Content-Length": len.toString()
	});
	setTimeout(next, wait);
}

function get(req, res) {
	res.writeHead(200, {
		"Content-Type": "application/json"
	});
	res.end(JSON.stringify({}));
}

function cart(req, res){
	res.writeHead(200, {
		"Content-Type": "application/json"
	});

	var data = {
		count: 15
	}

	setTimeout(function(){
		res.end(JSON.stringify(data));
	}, 500);
}

function handler(req, res){
	var url = new URL(req.url, "http://localhost:8084");
	switch(url.pathname) {
		case "/":
			var fs = require("fs");
			fs.createReadStream(__dirname + "/../ndjson.html").pipe(res);
			break;
		case "/product":
			return getList(req, res);
		case "/cart":
			return cart(req, res);
		default:
			return get(req, res);
	}
}

http.createServer(handler).listen(8084);
