import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout';
import Pokedex from './components/pokedex';
import MyPokedex from './components/mypokedex';

function App() {

  // const routes = [
  //     {
  //         path: '/',
  //         component: <Main />
  //     }
  // ]

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Pokedex />} />
            <Route path='/mypokedex' element={<MyPokedex />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
