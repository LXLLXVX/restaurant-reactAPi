import React from 'react'
import { Link } from 'react-router-dom'

export default function MenuItem({ meal }) {
  return (
    <article className="card">
      <Link to={`/meals/${meal.id}`}>
        <img src={meal.thumb} alt={meal.name} className="thumb" />
      </Link>
      <div className="card-body">
        <h3 className="meal-name">{meal.name}</h3>
        <p className="category">{meal.category}</p>
        <p className="price">€{meal.price.toFixed(2)}</p>
        <Link className="btn" to={`/meals/${meal.id}`}>Ver detalle</Link>
      </div>
    </article>
  )
}
