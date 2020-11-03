//@ts-check
const fastify = require("fastify").default();
const path = require("path");
const args = process.argv.slice(2);

const port = args[0];
const folder = args[1];

const funcs = {};

fastify.post("/:func", handler());
fastify.get("/:func", handler());

fastify.listen(port, "0.0.0.0", function (err) {
  if (err) {
    console.log(err);
  }
});
function handler() {
  return function (request, response) {
    if (
      typeof request.params === "object" &&
      typeof request.params.hasOwnProperty("func")
    ) {
      //@ts-ignore
      const { func } = request.params;
      if (!funcs[func]) {
        try {
          funcs[func] = require(path.resolve(`${folder}/${func}`));
        } catch (e) {
          response.status(404).send({
            msg: "function not found",
          });
        }
      }
      return funcs[func](request, response);
    }
    //@ts-ignore
    response.send({ ...request.params, ...request.body });
  };
}
