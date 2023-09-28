import { URL } from "../../data/constants.js";

async function deleteBook(id) {
	const deleteURL = `${URL}/${id}`

	const options = {
		method: "DELETE",
	}

	try {
		const response = await fetch(deleteURL, options)
		console.log("Successfully deleted book")

	} catch (error) {
		console.log("Delete status failed: ", response)
	}
}

export default deleteBook