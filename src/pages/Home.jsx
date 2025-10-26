import React, { useEffect, useState } from 'react'
import { searchMealsByName } from '../services/api'
import MenuList from '../components/MenuList'

// helper para precios aleatorios
function generatePrice() {
  // entre 5 y 25 euros
  return +(Math.random() * 20 + 5).toFixed(2)
}

export default function Home() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    searchMealsByName('')
      .then(data => {
        if (data && data.meals) {
          const normalized = data.meals.map(m => ({
            id: m.idMeal,
            name: m.strMeal,
            category: m.strCategory || 'Varios',
            thumb: m.strMealThumb,
            price: generatePrice()
          }))
          setItems(normalized)
        } else {
          setItems([])
        }
      })
      .catch(err => setError(err.message || 'Error al cargar'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h1>Menú</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <MenuList items={items} />}
    </section>
  )
}
