import React from 'react';
import logo from './logo.svg';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import './App.css';
import NavBar from './components/NavBar'
import FolderList from './components/List'
import Autocomplete from './components/Autocomplete'

function App() {
  return (
    <div className="App">
      

    <NavBar></NavBar>

    <Autocomplete></Autocomplete>

    <FolderList></FolderList>


    </div>
  );
}

export default App;
