import { useEffect } from "react"
import { useHistory, useLocation, useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"

export default function Article() {

  const { id } = useParams()
  const url = `http://localhost:3000/articles/${id}`
  const {data:article, isPending, error} = useFetch(url)
  const history = useHistory()
  
  const queryString = useLocation().search
  const queryParam = new URLSearchParams(queryString)
  const name = queryParam.get('name')
  const age = queryParam.get('age')

  useEffect(() => {
    if(error){
      setTimeout(() => {
        // history.goBack()
        history.push('/')
      }, 2000)
    }

  },[error, history])
  
  return (
    <div>
      {name && name} {age && age}
      {isPending && <p>Loading article...</p>}
      {error && <p>{error}</p>}
      {article && <article>
        <h2>{article.title}</h2>
        <p>{article.author}</p>
        <p>{article.body}</p>
      </article>}
    </div>
  )
}
