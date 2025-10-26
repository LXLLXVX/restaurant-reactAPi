import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { filterMealsByCategory, lookupMealById } from '../services/api'
import MenuList from '../components/MenuList'

function generatePrice() {
  return +(Math.random() * 20 + 5).toFixed(2)
}

export default function Category() {
  const { categoryName } = useParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    // filter.php?c=Category devuelve idMeal, strMeal, strMealThumb (sin categoría completa)
    filterMealsByCategory(categoryName)
      .then(async data => {
        if (!data || !data.meals) {
          setItems([])
          return
        }
        // datos regresan sin categoría, así que mapeamos y (opcional) hacemos lookup para cada id para obtener categoría real
        const brief = data.meals.slice(0, 20) // limitar
        const detailedPromises = brief.map(async b => {
          try {
            const det = await lookupMealById(b.idMeal)
            const detMeal = det.meals?.[0]
            return {
              id: b.idMeal,
              name: b.strMeal,
              category: detMeal?.strCategory || categoryName,
              thumb: b.strMealThumb,
              price: generatePrice()
            }
          } catch {
            return {
              id: b.idMeal,
              name: b.strMeal,
              category: categoryName,
              thumb: b.strMealThumb,
              price: generatePrice()
            }
          }
        })
        const resolved = await Promise.all(detailedPromises)
        setItems(resolved)
      })
      .catch(e => setError('No se pudieron cargar los platos'))
      .finally(() => setLoading(false))
  }, [categoryName])

  return (
    <section>
      <h1>Categoría: {categoryName}</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <MenuList items={items} />}
    </section>
  )
}
