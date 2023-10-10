

function getNewId(bookList) {
	let bookIDs = []
	bookList.map(({ id }) => {
		const numberID = Number(id)
		bookIDs.push(numberID)
	})

	let highestID = 0;

	// Loopa igenom arrayen
	for (let i = 0; i < bookList.length; i++) {
		// Jämför det aktuella elementet med den högsta siffran hittills
		if (bookIDs[i] > highestID) {
			// Om det aktuella elementet är större, uppdatera den högsta siffran
			highestID = bookIDs[i];
		}
		// console.log(bookIDs[i]);
	}

	// Nu kommer 'highestNumber' att innehålla den högsta siffran i arrayen

	return String(highestID + 1)
}

export default getNewId