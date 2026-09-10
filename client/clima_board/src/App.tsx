import { useEffect } from 'react'
import './App.css'
import { getByName } from './api/api';
import { Route, Routes } from 'react-router';
import Compare from './pages/compare/Compare';
import Dashboard from './pages/dashboard/Dashboard';
import Favorites from './pages/favorites/Favorites';
import Notfound from './pages/notFound/Notfound';
import Protected from './pages/protected/Protected';
import Search from './pages/search/Search';
import Layout from './components/layout/Layout';
import Welcome from './pages/welcome/Welcome';



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Welcome />} />

        <Route element={<Protected />}>

          <Route element={<Layout />}>

            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/search' element={<Search />} />
            <Route path='/compare' element={<Compare />} />
            <Route path='/favorites' element={<Favorites />} />
            
          </Route>

        </Route>

            <Route path='*' element={<Notfound />} />
      </Routes>

    </>
  )
}

export default App
