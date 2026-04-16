const bodyJSONSchema = {
	type: "object",
	required: [
		"email",
		"username",
		"password",
	],
	properties: {
		email: {
			type: "string",
		},
		username: {
			type: "string",
		},
		password: {
			type: "string",
		},
	}
}

export const schema = {
	body: bodyJSONSchema,
}

export function route( req ) {

	const { email, username, password } = req.body

	console.log( email )
	console.log( username )
	console.log( password )

	return {
		login: true,
	}
}
