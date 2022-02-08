
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Recipe from './pages/recipe/Recipe'
import Search from './pages/search/Search'
import { useTheme } from './hooks/useTheme';

// Style
import './App.css'
import ThemeSelector from './Components/ThemeSelector';

function App() {
  const { mode, changeMode } = useTheme()
  return (
    <div className={`APP ${mode}`} onDoubleClick={() => changeMode(mode === 'dark' ? 'light' : 'dark')}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/recipe/:id">
            <Recipe />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
