import { useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"

export default function Article() {
  const { id } = useParams()
  const url = `http://localhost:3000/articles/${id}`
  const { data:article, isPending, error } = useFetch(url)
  const history = useHistory()

  useEffect(() => {
    setTimeout(() => {
      if(error){
        history.push('/')
      }
    }, 2000)
  },[error, history])
  
  return (
    <div>
      {isPending && <p>Loading....</p>}
      {error && <p>Unable to fetch data</p>}
      {article && <div>
        <h2>{article.title}</h2>
        <p>{article.author}</p>
        <p>{article.body}</p>
      </div>}
    </div>
  )
}
