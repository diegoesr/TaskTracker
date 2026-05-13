export const JSON_PLACEHOLDER_BASE =
  'https://jsonplaceholder.typicode.com'

export async function fetchUsers() {
  const res = await fetch(`${JSON_PLACEHOLDER_BASE}/users`)
  if (!res.ok) {
    throw new Error(`No se pudieron cargar los usuarios (${res.status})`)
  }
  return res.json()
}
