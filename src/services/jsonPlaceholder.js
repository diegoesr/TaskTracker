export const JSON_PLACEHOLDER_BASE =
  'https://jsonplaceholder.typicode.com'

export async function fetchUsers() {
  const res = await fetch(`${JSON_PLACEHOLDER_BASE}/users`)
  if (!res.ok) {
    throw new Error(`No se pudieron cargar los usuarios (${res.status})`)
  }
  return res.json()
}

export async function fetchPostsByUserId(userId) {
  const params = new URLSearchParams({ userId: String(userId) })
  const res = await fetch(`${JSON_PLACEHOLDER_BASE}/posts?${params}`)
  if (!res.ok) {
    throw new Error(`No se pudieron cargar los posts (${res.status})`)
  }
  return res.json()
}
