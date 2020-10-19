import React from 'react'

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list'
import { ReactComponent as Eye } from '../../assets/eye.svg'
import swal from '@sweetalert/with-react'

import '@sandstreamdev/react-swipeable-list/dist/styles.css'

const Films = ({ films, deleteItem, watchHandler }) => {
  const deleteHandler = async ({ title }) => {
    const buttonsObj = { buttons: { cancel: 'No', confirm: { text: 'Delete', value: 'confirm' } }}
    const value = await swal(`Are you sure you want delete "${title}"?`, buttonsObj)
    if (value === 'confirm') {
      deleteItem(title)
      swal('Successfully deleted!', '', 'success')
    }
  }

  const mainWatchHandler = async ({ title }, isWatched) => {
    const buttonsObj = { buttons: { cancel: 'No', confirm: { text: 'Yes', value: 'confirm' } }}
    const currentArticle = !isWatched ? 'not' : ''
    const value = await swal(`Mark "${title}" as ${currentArticle} watched?`, buttonsObj)
    if (value === 'confirm') {
      watchHandler(title, isWatched)
      swal(`Film "${title}" marked as ${currentArticle} watched!`, '', 'success')
    }
  }

  const getFilm = ({ title }) => window.open(`https://www.google.com.ua/search?q=${title}&oq=${title}`, '_blank')

  return (
    <div className='films-container'>
      <SwipeableList>
        {films.map((film, id) => (
          <div id={film.title} className='card card-body mt-3 mb-3' key={`${film.title}${id}`}>
            <SwipeableListItem
              swipeRight={{
                content: <div className='deleteContent'>Going to be deleted...</div>,
                action: () => deleteHandler(film)
              }}
            >
            <div className='d-flex align-items-center w100 p10'>
              <div className='d-flex'>
                {film.watched ? (
                  <Eye className='eye' onClick={() => mainWatchHandler(film, false)} />
                ) : (
                  <Eye className='eye-not-watched' onClick={() => mainWatchHandler(film, true)} />
                )}
              </div>
              <div className='label-section' onClick={() => getFilm(film)}>
                <span className='text'>{film.title}</span>
              </div>
            </div>
          </SwipeableListItem>
        </div>
        ))}
      </SwipeableList>
    </div>
  )
}

export default Films
