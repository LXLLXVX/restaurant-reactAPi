import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import Category from './pages/Category.jsx'
import MealDetail from './components/MealDetail.jsx'

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/meals/:id" element={<MealDetail />} />
          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Routes>
      </main>
    </div>
  )
}
