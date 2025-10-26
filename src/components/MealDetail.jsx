import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { lookupMealById } from '../services/api'

export default function MealDetail() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    lookupMealById(id)
      .then(data => {
        if (data && data.meals && data.meals.length > 0) {
          const m = data.meals[0]
          setMeal({
            id: m.idMeal,
            name: m.strMeal,
            category: m.strCategory,
            thumb: m.strMealThumb,
            instructions: m.strInstructions,
            area: m.strArea,
            // precio inventado también
            price: +(Math.random() * 20 + 5).toFixed(2)
          })
        } else {
          setError('Plato no encontrado')
        }
      })
      .catch(() => setError('Error al cargar detalle'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <article className="detail">
      <img src={meal.thumb} alt={meal.name} className="detail-thumb" />
      <div className="detail-body">
        <h2>{meal.name}</h2>
        <p className="category">{meal.category} — {meal.area}</p>
        <p className="price">Precio: €{meal.price.toFixed(2)}</p>
        <h3>Preparación</h3>
        <p>{meal.instructions}</p>
      </div>
    </article>
  )
}
