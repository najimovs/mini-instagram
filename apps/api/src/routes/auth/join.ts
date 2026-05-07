import { query } from "../../db.ts"

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

export async function route( req, res ) {

	let { email, username, password } = req.body

	username = username.toLowerCase()
	email = email.toLowerCase()

	const usernamePattern = /^(?=.{5,40}$)[a-z]+(_[a-z]+)*(_[0-9]+|[0-9]*)$/
	const emailPattern = /^(?=.{1,254}$)[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,255}\.[a-zA-Z]{2,}$/
	const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]).{8,64}$/

	if ( !usernamePattern.test( username ) ) {

		return res.status( 400 ).send( { code: "API_AUTH_USERNAME_INVALID" } )
	}

	if ( !emailPattern.test( email ) ) {

		return res.status( 400 ).send( { code: "API_AUTH_EMAIL_INVALID" } )
	}

	if ( !passwordPattern.test( password ) ) {

		return res.status( 400 ).send( { code: "API_AUTH_PASSWORD_INVALID" } )
	}

	const checkUsername = await query( `
		select email from users where username = $1
	`, username )

	if ( checkUsername.length > 0 ) {

		return res.status( 400 ).send( { code: "API_AUTH_USERNAME_EXISTS" } )
	}

	const checkEmail = await query( `
		select email from users where email = $1
	`, email )

	if ( checkEmail.length > 0 ) {

		return res.status( 400 ).send( { code: "API_AUTH_EMAIL_EXISTS" } )
	}

	await query(
		`insert into users (username, password, email ) values ($1, $2, $3)`,
		username, password, email
	)

	return {
		code: "API_AUTH_OK",
	}
}
