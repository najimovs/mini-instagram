import { route as followHandler, schema as followSchema } from "./follow.ts"

export default function( fastify ) {

	fastify.post( "/user/follow", { schema: followSchema }, followHandler )
}
