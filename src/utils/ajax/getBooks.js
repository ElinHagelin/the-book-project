import { URL } from "../../data/constants.js";

async function getBooks() {
	try {
		const response = await fetch(URL)
		const data = await response.json()
		// console.log('data i getBooks är: ', data);
		return data
	} catch (error) {
		console.log('error: ', error);
		return
	}
}


export default getBooks