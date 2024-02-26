
import { Link } from 'react-router-dom'
import './App.css'
import Pokedex from './components/Pokedex/Pokedex'
import CustomRoutes from './routes/CustomRoutes'


function App() {
  

  return (
    <>
      {/* <Pokedex /> */}
      <Link to={'/'}>
        <h1 id="pokedex-heading">Pokedex</h1>
      </Link>
      <CustomRoutes />
      
    </>
  )
}

export default App
