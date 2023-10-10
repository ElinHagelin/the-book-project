import { useEffect, useRef, useState } from 'react'
import getBooks from './utils/ajax/getBooks.js'
import getNewId from './utils/getNewId.js'
import addBook from './utils/ajax/addBook.js'
import deleteBook from './utils/ajax/deleteBook.js'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [bookList, setBookList] = useState([])
  const [titleInput, setTitleInput] = useState('')
  const [authorInput, setAuthorInput] = useState('')
  const [bookID, setBookID] = useState(null)
  const [newBook, setNewBook] = useState(null)

  const modal = useRef(null)


  useEffect(() => {
    async function getAllBooks() {
      const books = await getBooks()
      setBookList(books)
    }
    getAllBooks()
  }, [count])


  function openModal(mode, id) {
    if (mode === 'new') {
      setNewBook(true)
    } else if (mode === 'edit') {
      setNewBook(false)
    }
    setBookID(id)
    modal.current.showModal()
  }

  function closeModal() {
    setBookID(null)
    setTitleInput('')
    setAuthorInput('')
    modal.current.close()
  }

  async function saveBook() {

    await addBook(bookID, titleInput, authorInput)
    setBookID(null)
    setTitleInput('')
    setAuthorInput('')
    setCount(count + 1)
    modal.current.close()
  }

  async function removeBook(id) {
    await deleteBook(id)
    setCount(count + 1)
  }

  const newId = getNewId(bookList)


  return (
    <>
      <img className='bookmark' src='../public/images/pngwing.com (2).png' alt='bokmärke'></img>

      <div className='main'>
        <div className='heading'>
          <h1>Boklistan</h1>
          <img className='book-divider' src="../public/images/43075.jpg" alt="bok-avdelare" />
        </div>

        {bookList.length > 0 ? (
          <ul>
            {bookList.map(({ id, title, author }) => (
              <li key={id} className='book-container'>

                <div className='book-info'>
                  <h2>{title}</h2>
                  <h3>{author}</h3>
                </div>

                <div className='book-buttons'>
                  <button className='button edit-button' onClick={() => openModal('edit', id)}>
                    <img src='../public/images/—Pngtree—black quill feather pen with_5157648.png' alt='ändra' className='button-icon edit-icon'></img></button>

                  <button className='button delete-button' onClick={() => removeBook(id)}>
                    <img src='../public/images/trash-can.png' alt='ta bort' className='button-icon delete-icon'></img>
                  </button>
                </div>

              </li>
            ))}
          </ul>

        )
          : (
            <p>Boklistan är tom</p>
          )}
        <button className='button add-button' onClick={() => openModal('new', newId)}>Lägg till en bok</button>

      </div>



      <dialog
        className='modal'
        ref={modal}
        onClick={e => {
          const dialogDimensions = modal.current.getBoundingClientRect();
          if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
          ) {
            modal.current.close();
          }
        }}>

        <div className='modal-content'>
          <h4>{newBook ? 'Lägg till en ny bok i listan' : 'Ändra boken i listan'}</h4>

          <label htmlFor="title-input">Boktitel</label>
          <input type="text" id='title-input' value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
          <label htmlFor="author-input">Författare</label>
          <input type="text" id='author-input' value={authorInput} onChange={(e) => setAuthorInput(e.target.value)} />

          <div className='button-div'>
            <button onClick={() => saveBook()}>Spara</button>
            <button onClick={() => closeModal()}>Stäng</button>
          </div>

        </div>
      </dialog>


    </>
  )

}

export default App
