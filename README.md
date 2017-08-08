# Dog Things

**Dog Things** is a [DoneJS](https://donejs.com/) application that allows users to view dog products like leashes and bones, and to add items to their cart. This application shows off the advantages of [streamable](https://www.bitovi.com/streamable) web applications and how DoneJS facilitates building them.

This readme walks through getting the project set up locally, and the features used to build the app.

![app screen shot](https://user-images.githubusercontent.com/361671/29074136-2dff5cc2-7c1c-11e7-929a-1c77b19fda91.png)

## Setting up

To get *Dog Things* set up locally, first clone the repository:

```
git clone git@github.com:donejs/donejs-streaming-product-page.git
```

And then install the dependencies with [npm](https://www.npmjs.com/).

```
cd donejs-streaming-product-page
npm install
```

### SSL

This application uses [HTTP/2](https://http2.github.io/) to provide the fastest possible rendering. HTTP/2 requires SSL, so to debug the application locally you'll need to first create a [self-signed certificate](https://en.wikipedia.org/wiki/Self-signed_certificate).

To create the certificate and private key use the `openssl` command like so:

```shell
openssl req  -nodes -new -x509  -keyout server.key -out server.cert
```

This will create a `server.key` and `server.cert` file in the local directory. Since you don't want to include these in version control, move them somewhere else in the file system. I keep a directory for these certificates so that I can reuse them when working locally.

```
mkdir -p ~/.localhost-ssl
mv server.key server.cert ~/.localhost-ssl
```

### Turning on incremental rendering

Now that you have a certificate you can use for development, update the `debug` script in your package.json:

```json
{
  "scripts": {
    "develop": "done-serve --develop --port 8080 --proxy http://localhost:8084 --key ~/.localhost-ssl/server.key --cert ~/.localhost-ssl/server.cert --strategy incremental"
  }
}
```

This app uses a locally hosted API. In your scripts also add this:

```json
{
  "scripts": {
	  ...
    "api": "node api/server.js"
  }
}
```

First start the API server in one terminal window:

```shell
donejs api
```

And in another terminal window start the server:

```shell
donejs develop
```

And open the page in the browser at `https://localhost:8080`. The first time you open the page you will get a security error because the certificate is not signed by a CA the browser recognizes. Since you are using this for local development you can ignore this error, it will only happen the first time.

In Chrome first click on the link that says *ADVANCED*:

![security advanced](https://user-images.githubusercontent.com/361671/29075035-37a59f5e-7c1f-11e7-90d1-6103f4c92687.png)

And then click on the link saying *Proceed to localhost (advanced)*:

![proceed to localhost](https://user-images.githubusercontent.com/361671/29075140-8e611922-7c1f-11e7-9a87-3c134324579b.png)

Which should load up the app.

## Features

This demo application shows off some of the streaming capabilities of DoneJS. DoneJS utilizes HTTP/2 and the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to stream data from the server.

### Incremental rendering

*Incremental rendering* is a term we have come up with to describe a new streaming technique we've invented as part of DoneJS. Since *most* applications are made up of various dynamic parts, waiting for everything to load before rendering will result in a poor experience for your users. With the incremental rendering strategy DoneJS can provide many of the benefits of server-side rendering without forcing your users to wait on the slowest part.

When you load this example app you'll see this to start:

![app one thing loaded](https://user-images.githubusercontent.com/361671/29080326-7cc767a8-7c2d-11e7-8ab9-1508dcbce274.png)

Notice that the cart has **0** by it. This is because the cart is still being loaded on the server. Meanwhile 1 product has already loaded.

When implementing a traditional HTML streaming approach you would have to wait on the cart to load before streaming out any other content below it. Because incremental rendering isn't biased in favor of top-down loading, *the fastest parts of your app load first*.

This mirrors what happens in the real world, where often times something like a product listing will load fast from the database, and user profile things (that tend to be at the top of the page, like the cart) my require more complex database queries.

Waiting a second or so longer and you should see this now:

![more stuff loaded](https://user-images.githubusercontent.com/361671/29080696-76bd691a-7c2e-11e7-9781-6b4e3942a2f2.png)

The numbers demonstrate the loading order. First 2 product items load, then the cart, and finally more products.
