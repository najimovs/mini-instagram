import auth from "./auth/index.ts"
import user from "./user/index.ts"

export default function( fastify ) {

	fastify.register( auth )
	fastify.register( user )
}
