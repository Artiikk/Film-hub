import React from 'react'

import { ReactComponent as TrashLogo } from '../../assets/trash-can.svg'
import { ReactComponent as Eye } from '../../assets/eye.svg'
import swal from '@sweetalert/with-react'

const Films = ({ films, getFilm, deleteItem, watchHandler }) => {
  const deleteHandler = async ({ title }) => {
    const buttonsObj = { buttons: { cancel: 'No', confirm: { text: 'Delete', value: 'confirm' } }}
    const value = await swal(`Are you sure you want delete "${title}"?`, buttonsObj)
    if (value === 'confirm') {
      deleteItem(title)
      swal('Successfully deleted!', '', 'success')
    }
  }

  const unwatchedHandler = async ({ title }) => {
    const buttonsObj = { buttons: { cancel: 'No', confirm: { text: 'Yes', value: 'confirm' } }}
    const value = await swal(`Mark "${title}" as not watched?`, buttonsObj)
    if (value === 'confirm') {
      watchHandler(title, false)
      swal(`Film "${title}" marked as not watched!`, '', 'success')
    }
  }

  return (
    <ul className='films-container'>
      {films.map((film, id) => (
        <li id={film.title} key={`${film.title}${id}`} className='card card-body mt-3 mb-3'>
          <ul className='d-flex align-items-center'>
            <li className='d-flex'>
              <TrashLogo className='trash' onClick={() => deleteHandler(film)} />
              {film.watched && <Eye className='eye' onClick={() => unwatchedHandler(film)} />}
            </li>
            <li className='label-section' onClick={() => getFilm(film)}>
              <span className='text'>{film.title}</span>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default Films
