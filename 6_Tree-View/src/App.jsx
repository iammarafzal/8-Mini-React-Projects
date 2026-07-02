import './App.css'
import TreeView from './components/TreeView'
import sideMenu from './data/data'
import { Routes, Route} from 'react-router-dom';
import { Home, Profile, Details, Location, EditProfile, Settings, Preferences, Theme } from "./pages/index";

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profile/details' element={<Details/>}/>
        <Route path='/profile/edit' element={<EditProfile/>}/>
        <Route path='/profile/details/location' element={<Location/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/settings/preferences' element={<Preferences/>}/>
        <Route path='/settings/preferences/theme' element={<Theme/>}/>
      </Routes>
      <TreeView menus={sideMenu}/>
    </>
  )
}

export default App
