import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard, Filiere, Home, HomeLayout, Login, Niveau, Role } from './routes/routes'

function App() {

  return (
    <>
          <Routes>
              <Route path="/" element={<HomeLayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path='home' element={<Home/>}/>
                <Route path='roles' element={<Role/>}/>
                <Route path='filiere' element={<Filiere/>}/>
                <Route path='niveau' element={<Niveau/>}/>
              </Route>
            <Route path='login' element={<Login/>}/>
            {/* <Route path='login2' element={<Login2/>}/> */}


          </Routes>
        
    </>
  )
}

export default App
