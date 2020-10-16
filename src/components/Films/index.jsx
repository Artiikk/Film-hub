import React from 'react'

import { ReactComponent as TrashLogo } from '../../assets/trash-can.svg'
import { ReactComponent as Eye } from '../../assets/eye.svg'
import swal from '@sweetalert/with-react'

const Films = ({ films, getFilm, deleteItem, markAsUnwatched }) => {
  const deleteHandler = async ({ label }) => {
    const buttonsObj = { buttons: { cancel: 'No', confirm: { text: 'Delete', value: 'confirm' } }}
    const value = await swal(`Are you sure you want delete "${label}"?`, buttonsObj)
    if (value === 'confirm') {
      deleteItem(label)
      swal('Successfully deleted!', '', 'success')
    }
  }

  const unwatchedHandler = async ({ label }) => {
    const buttonsObj = { buttons: { cancel: 'No', confirm: { text: 'Yes', value: 'confirm' } }}
    const value = await swal(`Mark "${label}" as not watched?`, buttonsObj)
    if (value === 'confirm') {
      markAsUnwatched(label)
      swal(`Film "${label}" marked as not watched!`, '', 'success')
    }
  }

  return (
    <ul className='films-container'>
      {films.map(film => (
        <li id={film.label} key={film.label} className='card card-body mt-3 mb-3'>
          <ul className='d-flex align-items-center'>
            <li className='d-flex'>
              <TrashLogo className='trash' onClick={() => deleteHandler(film)} />
              {film.watched && <Eye className='eye' onClick={() => unwatchedHandler(film)} />}
            </li>
            <li className='label-section' onClick={() => getFilm(film)}>
              <span className='text'>{film.label}</span>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default Films
