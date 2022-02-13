import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { projectFirestore } from '../firebase/config'

import Trash from '../assets/delete_icon.svg'
import Fav from '../assets/fav.svg'
import FavFill from '../assets/fav-fill.svg'

// styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {
  const { mode } = useTheme()

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>
  }

  const deleteRecipe = (id) => {
    projectFirestore.collection('recipes').doc(id).delete()
  }

  const likeRecipe = (id) => {
    projectFirestore.collection('recipes').doc(id).update({
      like: true
    })
  }

  const disLikeRecipe = (id) => {
    projectFirestore.collection('recipes').doc(id).update({
      like: false
    })
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <div className='card-icons'>
            {!recipe.like && <img 
              className='trash'
              src={Fav} 
              alt="like" 
              onClick={(e) => likeRecipe(recipe.id) }/>}
            {recipe.like && <img 
              className='trash'
              src={FavFill} 
              alt="dislike" 
              onClick={(e) => disLikeRecipe(recipe.id) }/>}
            <img 
              className='trash'
              src={Trash} 
              alt="delete" 
              onClick={(e) => deleteRecipe(recipe.id) }/>
          </div>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  )
}
