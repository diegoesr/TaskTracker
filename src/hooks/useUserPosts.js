import { useEffect, useState } from 'react'
import { fetchPostsByUserId } from '../services/jsonPlaceholder.js'

export function useUserPosts(userId) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (userId == null) {
      return
    }

    let cancelled = false

    async function loadPosts() {
      setLoading(true)
      setError(null)
      setPosts([])
      try {
        const data = await fetchPostsByUserId(userId)
        if (!cancelled) {
          setPosts(data)
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error
              ? e.message
              : 'No se pudieron cargar los posts',
          )
          setPosts([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadPosts()
    return () => {
      cancelled = true
    }
  }, [userId])

  return { posts, loading, error }
}
