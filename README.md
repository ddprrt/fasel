# fasel

An experimental Node.js server to execute JS files function-style. Based on `fastify`, not intended for production use.

## Start

```
node index.js <path to functions> <port>
```

By default `<path to functions>` maps to the local `functions` directory. `<port>` maps to 3000.


## Docker

The `Dockerfile` exposes port 3000 (default port).

```
docker run -p 8080:3000 -d <your username>/fasel
```
