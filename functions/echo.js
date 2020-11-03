/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
module.exports = function (request, reply) {
  if (request.body) {
    return reply.send({ _msg: "Hello from Echo", ...request.body });
  }
  return reply.status(500).send({
    error: "No msg provided",
  });
};
