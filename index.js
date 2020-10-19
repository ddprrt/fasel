//@ts-check
const fastify = require("fastify").default();
const path = require("path");
const args = process.argv.slice(2);

const port = args[0];
const folder = args[1];

const funcs = {};

fastify.post("/:func", function (request, response) {
	if (
		typeof request.params === "object" &&
		typeof request.params.hasOwnProperty("func")
	) {
		//@ts-ignore
		const { func } = request.params;
		if (!funcs[func]) {
			funcs[func] = require(path.resolve(`${folder}/${func}`));
		}
		return funcs[func](request, response);
	}
	//@ts-ignore
	response.send({ ...request.params, ...request.body });
});

fastify.listen(port, "0.0.0.0", function (err) {
	if (err) {
		console.log(err);
	}
});
