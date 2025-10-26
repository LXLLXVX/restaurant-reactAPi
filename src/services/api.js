const BASE = 'https://www.themealdb.com/api/json/v1/1'

export async function searchMealsByName(q = '') {
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(q)}`)
  if (!res.ok) throw new Error('Error al obtener platos')
  return res.json()
}

export async function filterMealsByCategory(category) {
  const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`)
  if (!res.ok) throw new Error('Error al filtrar por categoría')
  return res.json()
}

export async function lookupMealById(id) {
  const res = await fetch(`${BASE}/lookup.php?i=${encodeURIComponent(id)}`)
  if (!res.ok) throw new Error('Error al obtener detalle')
  return res.json()
}

export async function listCategories() {
  const res = await fetch(`${BASE}/list.php?c=list`)
  if (!res.ok) throw new Error('Error al listar categorías')
  return res.json()
}
