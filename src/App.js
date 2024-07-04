import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import UploadCV from './Pages/UploadCV';
import MainPage from './Pages/MainPage';
import Dashboard from './Pages/Dashboard';
import Profile from "./Pages/Profile";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/uploadCV" element={<UploadCV/>}/>
            <Route path='/main' element={<MainPage/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/profile' element={<Profile/>}/>

        </Routes>
    );
}

export default App;
