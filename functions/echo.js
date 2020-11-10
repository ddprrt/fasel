/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
module.exports = async function (request, reply) {
  const body = request.body || request.query;
  if (body) {
    return reply.send({ _msg: "Hello from Echo", body });
  }
  return reply.status(500).send({
    error: "No msg provided",
  });
};
