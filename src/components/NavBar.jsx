import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listCategories } from '../services/api'

export default function NavBar() {
  const [cats, setCats] = useState([])
  const [err, setErr] = useState(null)

  useEffect(() => {
    listCategories()
      .then(data => {
        if (data && data.meals) setCats(data.meals.slice(0, 8))
      })
      .catch(e => setErr('No se pudieron cargar categorías'))
  }, [])

  return (
    <header className="nav">
      <div className="nav-inner container">
        <Link to="/" className="brand">Mi Restaurante</Link>
        <nav className="nav-links">
          <Link to="/">Inicio</Link>
          {err && <span className="small error">{err}</span>}
          {cats.map((c) => (
            <Link key={c.strCategory} to={`/category/${encodeURIComponent(c.strCategory)}`}>
              {c.strCategory}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
