# Dog Things

**Dog Things** is a [DoneJS](https://donejs.com/) application that allows users to view dog products like leashes and bones, and to add items to their cart. This application shows off the advantages of [streamable](https://www.bitovi.com/streamable) web applications and how DoneJS facilitates building them.

This readme walks through getting the project set up locally, and the features used to build the app.

![app screen shot](https://user-images.githubusercontent.com/361671/29073940-8914c422-7c1b-11e7-8449-e35efb2727bb.png)

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

## Running tests

Tests can be run with

```
donejs test
```

## Development mode

Development mode can be started with

```
donejs develop
```

## Build and production mode

To build the application into a production bundle run

```
donejs build
```

In Unix environment the production application can be started like this:

```
NODE_ENV=production npm start
```
