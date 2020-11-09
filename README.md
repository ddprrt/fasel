# fasel

An experimental Node.js server to execute JS files function-style. Based on `fastify`, not intended for production use.

## Start

```
node index.js <path to functions> <port>
```

By default `<path to functions>` maps to the local `functions` directory. `<port>` maps to 3000.

Instead of `<path to functions>` you can also use an environment variable `FUNC_DIR`.

Instead of `<port>` you can also use an environment variable `FASEL_PORT`.

## Docker

The `Dockerfile` exposes port 3000 (default port).

```
docker run -p 8080:3000 -d <your username>/fasel
```

With mountable functions:

```
docker run -p 8080:3000 -v <absolute path to your functions>:/func -e FUNC_DIR=/func -d <your username>/fasel 
```
