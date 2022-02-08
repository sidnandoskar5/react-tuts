import RecipeList from '../../Components/RecipeList'
import  {useFetch}  from '../../hooks/useFetch'

import './Home.css'

export default function Home() {
  const {data:recipes, error, isPending} = useFetch('http://localhost:3000/recipes')
  
  return <div className="home">
  {error && <p className="error">{error}</p>}
  {isPending && <p className="loading">Loading...</p>}
  <RecipeList recipes={recipes} />
</div>
}
