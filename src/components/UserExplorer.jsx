import { useEffect, useState } from 'react'
import { fetchUsers } from '../services/jsonPlaceholder.js'

export function UserExplorer() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchUsers()
        if (!cancelled) {
          setUsers(data)
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : 'No se pudieron cargar los usuarios',
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <p className="user-explorer__status" aria-live="polite">
        Cargando usuarios…
      </p>
    )
  }

  if (error) {
    return (
      <div className="user-explorer__error" role="alert">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="user-explorer">
      <ul className="user-explorer__list">
        {users.map((user) => (
          <li key={user.id} className="user-explorer__item">
            <span className="user-explorer__name">{user.name}</span>
            <span className="user-explorer__meta">{user.email}</span>
            <span className="user-explorer__meta">
              {user.address?.city ?? '—'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
