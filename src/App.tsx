import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Accueil, Dashboard, Home, HomeLayout, Login, Role } from './routes/routes'

function App() {

  return (
    <>
          <Routes>
              <Route path="/" element={<HomeLayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path='home' element={<Home/>}/>
                <Route path='roles' element={<Role/>}/>
              </Route>
            <Route path='login' element={<Login/>}/>
            {/* <Route path='login2' element={<Login2/>}/> */}


          </Routes>
        
    </>
  )
}

export default App
