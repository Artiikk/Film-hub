import React, { useState } from 'react'
import Films from './components/Films'

import filmData from './data/filmData'
import swal from '@sweetalert/with-react'
import cinemaBg from './assets/cinema.jpg'
// import logo from './assets/film_hub.png'
import CustomAutocomplete from './components/CustomAutocomplete'
import scrollInto from 'scroll-into-view'

import './styles/main.scss'

function App() {
  const [films, setFilms] = useState(filmData)
  const [searchValues, setSearchValues] = useState('')
  const [newFilmValue, setNewFilmValue] = useState('')
  const [showWatched, setShowWatched] = useState(false)

  const filteredFilms = films.filter(el => el.label.toLowerCase().includes(searchValues.toLocaleLowerCase()))
  const watchedOnly = filteredFilms.filter(el => Boolean(el.watched))

  const filmsToShow = showWatched ? watchedOnly : filteredFilms

  const showModal = async (label) => {
    const buttonsObj = {
      buttons: {
        read: { text: 'Mark as watched', value: 'watched' },
        random: { text: 'Go random', value: 'random' },
        watch: { text: 'Go for it!', value: 'watch' }
      }
    }
    
    const value = await swal(label, buttonsObj)
    if (value === 'random') {
      getRandomFilm()
    }
    if (value === 'watch') {
      window.open(`https://www.google.com.ua/search?q=${label}&oq=${label}`, '_blank')
      markAsWatched(label)
      swal(`Film "${label}" marked as watched!`, '', 'success')
    }
    if (value === 'watched') {
      markAsWatched(label)
      swal(`Film "${label}" marked as watched!`, '', 'success')
    }
  }

  const getRandomFilm = () => {
    const random = Math.round(Math.random() * films.length)
    const currentLabel = films[random].label
    const currentElement = document.getElementById(currentLabel)
    scrollInto(currentElement, { time: 1100 }, () => showModal(currentLabel))
  }

  const getFilm = ({ label }) => showModal(label)

  const addNewFilm = (e) => {
    e.preventDefault()
    const newFilm = { label: newFilmValue }
    setFilms(prev => [...prev, newFilm])
    setNewFilmValue('')
  }

  const deleteItem = (label) => {
    setFilms(prev => {
      const newFilms = [...prev]
      const idx = newFilms.findIndex(el => el.label === label)
      newFilms.splice(idx, 1)
      return newFilms
    })
  }

  const markAsUnwatched = (label) => {
    setFilms(prev => {
      const newFilms = [...prev]
      const idx = newFilms.findIndex(el => el.label === label)
      newFilms[idx].watched = false
      return newFilms
    })
  }

  const markAsWatched = (label) => {
    setFilms(prev => {
      const newFilms = [...prev]
      const idx = newFilms.findIndex(el => el.label === label)
      newFilms[idx].watched = true
      return newFilms
    })
  }

  return (
    <div className='main'>
      {/* <div className='overlay'></div> */}
      <header className='App-header'>
        <nav className='row'>
          {/* <div className='ml-auto mr-auto mt-n5'>
            <img src={logo} alt='film-hub' />
          </div> */}
        </nav>
      </header>

      <section className='main-section'>
        <img src={cinemaBg} className='bg-image' alt='' />
        <CustomAutocomplete
          label='Search for films:'
          filteredItems={filmsToShow}
          value={searchValues}
          onChange={setSearchValues}
        />
        <button className="watch-button btn btn-info"  onClick={() => setShowWatched(prev => !prev)}>
          {showWatched ? 'Show all' : 'Show watched'}
        </button>
        <button onClick={getRandomFilm} className='random-button btn btn-primary ml-auto mr-auto'>Random</button>
        <Films
          films={filmsToShow}
          getFilm={getFilm}
          deleteItem={deleteItem}
          markAsUnwatched={markAsUnwatched}
        />

        <form className='add-new-item' onSubmit={addNewFilm}>
          <input type='text' value={newFilmValue} onChange={(e) => setNewFilmValue(e.target.value)} />
          <button type='submit' onClick={addNewFilm} className='btn btn-primary'>Add new film</button>
        </form>
      </section>
    </div>
  );
}

export default App;
