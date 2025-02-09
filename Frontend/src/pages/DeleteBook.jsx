import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'


const DeleteBook = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const handleDeleteBook = () => {
    setLoading(true)
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        setLoading(false)
        enqueueSnackbar('Book Deleted successfully', { variant: 'success'})
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        enqueueSnackbar('Error', {variant: 'error'})
        console.log(error)
      })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3x1 my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto'>
        <h3 className='text-2x1'>Are Your sure to delete this book?</h3>

        <button 
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          yes,Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook