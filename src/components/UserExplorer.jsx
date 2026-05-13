import { useMemo, useState } from 'react'
import { useUserPosts } from '../hooks/useUserPosts.js'
import { useUsers } from '../hooks/useUsers.js'

export function UserExplorer() {
  const { users, loading, error } = useUsers()
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  const {
    posts,
    loading: postsLoading,
    error: postsError,
  } = useUserPosts(selectedUser?.id)

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) {
      return users
    }
    return users.filter((u) => u.name.toLowerCase().includes(q))
  }, [users, search])

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
      <div className="user-explorer__search">
        <label className="user-explorer__search-label" htmlFor="user-search">
          Buscar por nombre
        </label>
        <input
          id="user-search"
          className="user-explorer__search-input"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Escribe para filtrar…"
          autoComplete="off"
        />
      </div>

      <div className="user-explorer__layout">
        <div className="user-explorer__list-wrap">
          {filteredUsers.length === 0 ? (
            <p className="user-explorer__empty">
              Ningún usuario coincide con la búsqueda.
            </p>
          ) : (
            <ul className="user-explorer__list">
              {filteredUsers.map((user) => {
                const isSelected = selectedUser?.id === user.id
                return (
                  <li key={user.id} className="user-explorer__list-item">
                    <button
                      type="button"
                      className={
                        isSelected
                          ? 'user-explorer__item user-explorer__item--selected'
                          : 'user-explorer__item'
                      }
                      onClick={() => setSelectedUser(user)}
                      aria-pressed={isSelected}
                    >
                      <span className="user-explorer__name">{user.name}</span>
                      <span className="user-explorer__meta">{user.email}</span>
                      <span className="user-explorer__meta">
                        {user.address?.city ?? '—'}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div
          className="user-explorer__detail"
          aria-live={selectedUser ? 'polite' : undefined}
        >
          {!selectedUser ? (
            <p className="user-explorer__detail-placeholder">
              Selecciona un usuario para ver su ficha y publicaciones.
            </p>
          ) : (
            <>
              <h3 className="user-explorer__detail-title">
                {selectedUser.name}
              </h3>
              <dl className="user-explorer__dl">
                <dt>Usuario</dt>
                <dd>@{selectedUser.username}</dd>
                <dt>Email</dt>
                <dd>{selectedUser.email}</dd>
                <dt>Teléfono</dt>
                <dd>{selectedUser.phone}</dd>
                <dt>Web</dt>
                <dd>
                  <a
                    href={
                      String(selectedUser.website).startsWith('http')
                        ? selectedUser.website
                        : `https://${selectedUser.website}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {selectedUser.website}
                  </a>
                </dd>
                <dt>Dirección</dt>
                <dd>
                  {selectedUser.address?.street}, {selectedUser.address?.suite}
                  <br />
                  {selectedUser.address?.city} {selectedUser.address?.zipcode}
                  {selectedUser.address?.geo && (
                    <>
                      <br />
                      <span className="user-explorer__muted">
                        ({selectedUser.address.geo.lat},{' '}
                        {selectedUser.address.geo.lng})
                      </span>
                    </>
                  )}
                </dd>
                <dt>Empresa</dt>
                <dd>
                  <strong>{selectedUser.company?.name}</strong>
                  <br />
                  <span className="user-explorer__muted">
                    {selectedUser.company?.catchPhrase}
                  </span>
                  <br />
                  <span className="user-explorer__muted">
                    {selectedUser.company?.bs}
                  </span>
                </dd>
              </dl>

              <h4 className="user-explorer__posts-heading">Posts</h4>
              {postsLoading && (
                <p className="user-explorer__status" aria-live="polite">
                  Cargando posts…
                </p>
              )}
              {!postsLoading && postsError && (
                <div
                  className="user-explorer__error user-explorer__error--compact"
                  role="alert"
                >
                  <p>{postsError}</p>
                </div>
              )}
              {!postsLoading && !postsError && posts.length > 0 && (
                <ul className="user-explorer__posts">
                  {posts.map((post) => (
                    <li key={post.id} className="user-explorer__post">
                      <span className="user-explorer__post-title">
                        {post.title}
                      </span>
                      <p className="user-explorer__post-body">{post.body}</p>
                    </li>
                  ))}
                </ul>
              )}
              {!postsLoading && !postsError && posts.length === 0 && (
                <p className="user-explorer__muted">
                  Este usuario no tiene posts.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
