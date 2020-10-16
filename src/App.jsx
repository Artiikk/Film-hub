import React, { useState, useEffect } from 'react'
import Films from './components/Films'

import swal from '@sweetalert/with-react'
import cinemaBg from './assets/cinema.jpg'
import { ReactComponent as Arrow } from './assets/right-arrow.svg'
import CustomAutocomplete from './components/CustomAutocomplete'
import scrollInto from 'scroll-into-view'
import { AxiosAPI } from './restClient'

import useSound from 'use-sound'
import casinoSound from './sounds/casino.mp3'

import './styles/main.scss'

function App() {
  const [films, setFilms] = useState([])
  const [searchValues, setSearchValues] = useState('')
  const [newFilmValue, setNewFilmValue] = useState('')
  const [showWatched, setShowWatched] = useState(false)
  const [arrowAnimate, setShowArrowAnimate] = useState(false)

  const [playOn, { stop }] = useSound(casinoSound)

  console.log('films', films)
  
  useEffect(() => {
    (async () => {
      const { data } = await AxiosAPI.get('getFilms')
      setFilms(data)
    })()
  }, [])

  const filteredFilms = films.filter(el => el.title.toLowerCase().includes(searchValues.toLocaleLowerCase()))
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
    }
    if (value === 'watched') {
      watchHandler(label, true)
      swal(`Film "${label}" marked as watched!`, '', 'success')
    }
  }

  const getRandomFilm = () => {
    setShowArrowAnimate(true)
    playOn()
    const random = Math.round(Math.random() * films.length)
    const currentTitle = films[random].title
    const currentElement = document.getElementById(currentTitle)
    scrollInto(currentElement, { time: 1800 }, () => {
      setShowArrowAnimate(false)
      stop()
      showModal(currentTitle)
    })
  }

  const getFilm = ({ title }) => showModal(title)

  const addNewFilm = async (e) => {
    e.preventDefault()
    const { data: { data } } = await AxiosAPI.post('addFilm', { title: newFilmValue, watched: false })
    setFilms(prev => [...prev, data])
    setNewFilmValue('')
  }

  const deleteItem = async (title) => {
    const currentFilm = films.find(el => el.title === title)
    await AxiosAPI.post('deleteFilm', { id: currentFilm._id })

    setFilms(prev => {
      const newFilms = [...prev]
      const idx = newFilms.findIndex(el => el.title === title)
      newFilms.splice(idx, 1)
      return newFilms
    })
  }

  const watchHandler = async (title, watched) => {
    const currentFilm = films.find(el => el.title === title)
    await AxiosAPI.post('watchHandler', { id: currentFilm._id, watched })

    setFilms(prev => {
      const newFilms = [...prev]
      const idx = newFilms.findIndex(el => el.title === title)
      newFilms[idx].watched = watched
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
        <Arrow className={`arrow ${arrowAnimate && 'animated-arrow'}`} />
        
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
          watchHandler={watchHandler}
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
