import React from 'react';
import { Navbar } from './components/Navbar/Navbar'
import {Routes, Route} from 'react-router-dom'
import {HomePage } from './pages/HomePage'

const App: React.FC = () => {
  return (
    <div className="container">
      <Navbar data-testid="nav"/>
      <Routes>
        <Route path='/'
        element={<HomePage />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;