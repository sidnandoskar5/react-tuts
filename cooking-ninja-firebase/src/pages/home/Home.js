// import { useFetch } from '../../hooks/useFetch'
import { projectFirestore } from '../../firebase/config'

import { useEffect, useState } from 'react'
import RecipeList from '../../components/RecipeList'

// styles
import './Home.css'

export default function Home() {
  // Data from Json server
  // const { data, isPending, error } = useFetch('http://localhost:3000/recipes')
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)


  useEffect(() => {
    setIsPending(true)
    const fetchData = projectFirestore
      .collection('recipes')
      .onSnapshot((snapshot) => {
        if(snapshot.empty){
          setError('No recipes to load.')
        }else{
          let results = []
          snapshot.docs.forEach(doc => {
            results.push({id: doc.id, ...doc.data()})
          })
          setData(results)
        }
        setIsPending(false)
      }, (err) => {
          setError(err.message)
          setIsPending(false)
      })

      // To unsubscribe
      return () => fetchData()
  }
  , [])

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
