import join from "./join.ts"

export default function( fastify ) {

	fastify.post( "/join", join )
}
