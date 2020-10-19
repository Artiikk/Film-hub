import React, { useState, useEffect } from 'react'
import Films from './components/Films'

import cinemaBg from './assets/cinema.jpg'
import { ReactComponent as Arrow } from './assets/right-arrow.svg'
import CustomAutocomplete from './components/CustomAutocomplete'
import scrollInto from 'scroll-into-view'
import { AxiosAPI } from './restClient'
import { Line } from 'rc-progress'

import useSound from 'use-sound'
import casinoSound from './sounds/casino.mp3'

import './styles/main.scss'

function App() {
  const [films, setFilms] = useState([])
  const [searchValues, setSearchValues] = useState('')
  const [newFilmValue, setNewFilmValue] = useState('')
  const [showWatched, setShowWatched] = useState(false)
  const [watchedPercent, setWatchedPercent] = useState('')

  const [playOn, { stop }] = useSound(casinoSound)
  
  useEffect(() => {
    (async () => {
      const { data } = await AxiosAPI.get('getFilms')
      const sortedData = data.sort((a, b) => a.title.localeCompare(b.title))
      setFilms(sortedData)
    })()
  }, [])

  const filteredFilms = films.filter(el => el.title.toLowerCase().includes(searchValues.toLocaleLowerCase()))
  const watchedOnly = filteredFilms.filter(el => Boolean(el.watched))

  const filmsToShow = showWatched ? watchedOnly : filteredFilms

  const calculateWatched = () => {
    const watchedFilms = films.filter(el => Boolean(el.watched))
    return (watchedFilms.length / films.length) * 100
  }

  useEffect(() => {
    const watchPercent = calculateWatched()
    watchPercent && setWatchedPercent(watchPercent.toFixed(1))
  }, [films])

  const getRandomFilm = () => {
    playOn()
    const random = Math.round(Math.random() * films.length)
    const currentTitle = films[random] && films[random].title
    const currentElement = document.getElementById(currentTitle)
    scrollInto(currentElement, { time: 1800 }, () => stop())
  }

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
        <Arrow className='arrow' />
        <div className='watched-percent'>
          {watchedPercent && <Line percent={watchedPercent} className='line' strokeWidth='2' trailWidth='2' strokeColor="#90ee90" />}
          <p>{watchedPercent}{watchedPercent && '%'}</p>
        </div>
        
        <div className='default-items'>
          <div className='d-flex'>
            <CustomAutocomplete
              label='Search for films:'
              filteredItems={filmsToShow}
              value={searchValues}
              onChange={setSearchValues}
            />
            <button onClick={getRandomFilm} className='random-button btn btn-secondary'>Random</button>
          </div>

          <form className='add-new-item' onSubmit={addNewFilm}>
            <input type='text' value={newFilmValue} onChange={(e) => setNewFilmValue(e.target.value)} />
            <button type='submit' onClick={addNewFilm} className='btn btn-primary'>Add new film</button>
          </form>
        </div>
        <button className='btn btn-info button-watched' onClick={() => setShowWatched(prev => !prev)}>
          {showWatched ? 'Show all' : 'Show watched only'}
        </button>
        <Films
          films={filmsToShow}
          deleteItem={deleteItem}
          watchHandler={watchHandler}
        />
      </section>
    </div>
  );
}

export default App;
