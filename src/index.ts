import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async function handler(request, reply) {
  return { coffee_machine: "DELONGHI Magnifica S Smart Ecam 250.31.SB" };
});

try {
  await fastify.listen({ port: 8888 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
