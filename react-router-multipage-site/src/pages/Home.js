import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export default function Home() {
  const {data:articles, isPending, error} = useFetch('http://localhost:3000/articles')
  return <div>
        <h2>Home</h2>
        {isPending && <p>Loading articles...</p>}
        {error && <p> {error} </p>}
        <ul>
          {articles && articles.map((article) => {
            return (<li key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.author}</p>
              <Link to={`/article/${article.id}`}>Read More</Link>
            </li>)
          })}
        </ul>
  </div>;
}
