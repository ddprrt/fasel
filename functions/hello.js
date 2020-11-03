/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
module.exports = function (request, reply) {
  return reply.send("Hellooooooo");
};
