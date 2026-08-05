import { useEffect, useState } from 'react'
import API from '../api'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    API.get('/admin/stats')
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err))
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  const cards = [
    { title: 'Registered Users', value: stats?.users || 0, color: 'bg-blue-500', icon: '👥' },
    { title: 'Total Votes', value: stats?.votes || 0, color: 'bg-green-500', icon: '🗳️' },
    { title: 'Election Seats', value: stats?.seats || 0, color: 'bg-purple-500', icon: '🏛️' },
    { title: 'Candidates', value: stats?.candidates || 0, color: 'bg-orange-500', icon: '🎯' },
  ]

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">🗳️ VoteAdmin</h2>

        <nav className="space-y-3">
          <a href="/admin" className="block bg-slate-800 px-4 py-3 rounded-lg hover:bg-slate-700">
            📊 Dashboard
          </a>

          <a href="/vote" className="block px-4 py-3 rounded-lg hover:bg-slate-800">
            🗳️ Voting Page
          </a>

          <a href="/results" className="block px-4 py-3 rounded-lg hover:bg-slate-800">
            📈 Live Results
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
            <p className="text-slate-600 mt-1">
              Welcome back, <span className="font-semibold">{user?.full_name}</span>
            </p>
          </div>

          <button
            onClick={logout}
            className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {cards.map((card) => (
            <div key={card.title} className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.title}</p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-2">{card.value}</h3>
                </div>

                <div className={`${card.color} text-white text-2xl w-14 h-14 rounded-xl flex items-center justify-center shadow`} >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/vote"
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl text-center font-medium transition"
            >
              🗳️ Open Voting Page
            </a>

            <a
              href="/results"
              className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl text-center font-medium transition"
            >
              📈 View Live Results
            </a>

            <button
              onClick={() => alert('Candidate management coming next!')}
              className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl font-medium transition"
            >
              ➕ Manage Candidates
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}