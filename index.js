//@ts-check
const fastify = require("fastify").default();
const path = require("path");
const fs = require("fs");
const args = process.argv.slice(2);

const folder = args[0] || process.env["FUNC_DIR"] || "functions";
const port = args[1] || process.env["FASEL_PORT"] || 3000;
const funcs = {};

fastify.post("/:func", handler);
fastify.get("/:func", handler);

fastify.listen(port, "0.0.0.0", function (err) {
  console.log("Running");
  if (err) {
    console.log(err);
  }
});

/** @typedef {import("fastify").FastifyRequest} FastifyRequest */
/** @typedef {import("fastify").FastifyReply} FastifyReply */

/**
 * @param {FastifyRequest} request
 * @param {FastifyReply} response
 */
function handler(request, response) {
  if (
    typeof request.params === "object" &&
    typeof request.params.hasOwnProperty("func")
  ) {
    //@ts-ignore
    const { func } = request.params;
    if (!funcs[func]) {
      try {
        funcs[func] = require(path.resolve(`${folder}/${func}.js`));
      } catch (e) {
        return response.status(404).send({
          msg: "function not found",
          error: e,
        });
      }
    }
    return funcs[func](request, response);
  }
  //@ts-ignore
  response.send({ ...request.params, ...request.body });
}
