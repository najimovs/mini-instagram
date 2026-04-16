import Fastify from "fastify"

const fastify = Fastify( {
	logger: true,
} )

const PORT = parseInt( process.env.VITE_API_PORT ) || 3_100

fastify.get( "/", () => {

	return {
		message: "OK",
	}
} )

try {

	await fastify.listen( { port: PORT } )

	fastify.log.info( `API ready at: ${ PORT }` )

} catch ( err ) {

	fastify.log.error( err )

	process.exit( 1 )
}
