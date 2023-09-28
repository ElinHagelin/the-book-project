import { URL } from "../../data/constants.js";

async function addBook(id, title, author) {
	const body = {
		id: id,
		title: title,
		author: author
	}

	const options = {
		method: 'PUT',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}

	try {
		const response = await fetch(URL, options)
		console.log('Successfully uploaded book');

	} catch (error) {
		console.log('Error: ', error);
	}
}

export default addBook