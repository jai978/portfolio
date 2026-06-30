'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Wrong password.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-5">
        <h1 className="font-display text-sm tracking-[0.3em] text-[var(--text-secondary)] uppercase mb-8">
          Admin
        </h1>

        {error && (
          <p className="font-body text-sm text-red-400">{error}</p>
        )}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] font-body text-base focus:outline-none focus:border-[var(--accent)]"
        />

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full font-display text-[11px] tracking-[0.25em] uppercase bg-[var(--accent)] text-white py-3 transition-colors duration-200 hover:bg-[var(--accent-dim)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Checking…' : 'Enter'}
        </button>
      </form>
    </div>
  )
}
