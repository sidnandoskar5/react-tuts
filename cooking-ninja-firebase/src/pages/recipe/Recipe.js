// import { useFetch } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { projectFirestore } from '../../firebase/config'

import Trash from '../../assets/delete_icon.svg'
import Fav from '../../assets/fav.svg'
import FavFill from '../../assets/fav-fill.svg'


// styles
import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()
  const { mode } = useTheme()

  // Data from Json server
  // const url = 'http://localhost:3000/recipes/' + id
  // const { error, isPending, data: recipe } = useFetch(url)
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsPending(true)
    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
      if(doc.exists){
        setRecipe(doc.data())
      }else{
        setError('Recipe does not exist.')
      }
      setIsPending(false)
    },(err) => {
      setError(err.message)
      setIsPending(false)
    })

    return () => unsub()
  } 
  ,[id])

  const deleteRecipe = () => {
    projectFirestore.collection('recipes').doc(id).delete()
  }

  const likeRecipe = () => {
    projectFirestore.collection('recipes').doc(id).update({
      like: true
    })
  }

  const disLikeRecipe = () => {
    projectFirestore.collection('recipes').doc(id).update({
      like: false
    })
  }

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {!error && recipe && (
        <>
          <div className='card-icons'>
            {!recipe.like && <img 
              className='trash'
              src={Fav} 
              alt="like" 
              onClick={(e) => likeRecipe() }/>}
            {recipe.like && <img 
              className='trash'
              src={FavFill} 
              alt="dislike" 
              onClick={(e) => disLikeRecipe() }/>}
            <img 
              className='trash'
              src={Trash} 
              alt="delete" 
              onClick={(e) => deleteRecipe(recipe.id) }/>
        </div>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  )
}