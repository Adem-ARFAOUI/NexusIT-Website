import { useState } from 'react'

function Profil({ darkMode, onDelete }) {
  const [activeTab, setActiveTab] = useState('info')
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    nom: 'Eswi',
    prenom: 'Elyes',
    email: 'elyes@nexus-club.io',
    filiere: 'Business Intelligence — 2ème année',
    github: 'github.com/elyes'
  })

  return (
    <div className="p-8">

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-cyan-900 rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,#7C3AED,transparent)]"></div>
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-3xl font-bold text-white border-4 border-white/20 shadow-lg shadow-purple-500/30">
            EM
          </div>
          <div>
            <p className="text-gray-300 text-sm">Membre depuis Septembre 2024</p>
            <h2 className="text-3xl font-bold text-white">Elyes Eswi</h2>
            <div className="flex gap-3 mt-1">
              <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">● Membre Actif</span>
              <span className="text-xs text-gray-300">Rang #4 / 128</span>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-gray-400 text-sm">Score Global</p>
            <p className="text-4xl font-bold text-cyan-400">2 847</p>
            <p className="text-green-400 text-sm">+124 ce mois</p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Score Total', value: '2 847' },
          { label: 'Challenges Complétés', value: '12' },
          { label: 'Événements Rejoints', value: '8' },
          { label: 'Rang', value: '#4', color: 'text-yellow-400' },
        ].map((s, i) => (
          <div key={i} className="bg-[#13133A] border border-purple-500/20 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color || 'text-cyan-400'}`}>{s.value}</p>
            <p className="text-gray-400 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {['info', 'historique'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'info' ? '👤 Informations' : '📋 Historique d\'Activité'}
          </button>
        ))}
      </div>

      {/* Tab: Informations */}
      {activeTab === 'info' && (
        <div className="bg-[#13133A] border border-purple-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-semibold text-lg">Informations Personnelles</h3>
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center gap-2 bg-white/5 hover:bg-purple-600/20 text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm transition-all"
            >
              ✏️ {editing ? 'Annuler' : 'Modifier'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'NOM', key: 'nom' },
              { label: 'PRÉNOM', key: 'prenom' },
              { label: 'EMAIL', key: 'email' },
              { label: 'FILIÈRE', key: 'filiere' },
              { label: 'GITHUB', key: 'github' },
            ].map(field => (
              <div key={field.key} className={field.key === 'email' || field.key === 'filiere' ? 'col-span-2' : ''}>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">{field.label}</label>
                <input
                  value={form[field.key]}
                  onChange={e => setForm({...form, [field.key]: e.target.value})}
                  disabled={!editing}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm disabled:opacity-70 focus:outline-none focus:border-purple-500"
                />
              </div>
            ))}
          </div>

          {editing && (
            <button
              onClick={() => setEditing(false)}
              className="mt-6 bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-6 py-3 rounded-xl text-sm font-medium"
            >
              Sauvegarder les modifications
            </button>
          )}

          {/* Zone Dangereuse */}
          <div className="mt-8 border border-red-500/30 rounded-xl p-4">
            <h4 className="text-red-400 font-semibold mb-1">Zone Dangereuse</h4>
            <p className="text-gray-400 text-sm mb-3">La suppression de votre compte est irréversible.</p>
           <button
               onClick={onDelete}
               className="flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl text-sm hover:bg-red-500/20 transition-all"
          >
             🗑 Supprimer mon compte
            </button>
          </div>
        </div>
      )}

      {/* Tab: Historique */}
      {activeTab === 'historique' && (
        <div className="bg-[#13133A] border border-purple-500/20 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Historique d'Activité</h3>
          <div className="flex gap-2 mb-6">
            {['Tout', 'Challenges', 'Événements', 'Badges'].map(f => (
              <button key={f} className="px-4 py-2 rounded-xl text-sm bg-white/5 text-gray-400 hover:text-white transition-all">
                {f}
              </button>
            ))}
          </div>
          {[
            { icon: '⚡', color: 'bg-purple-500/20 text-purple-400', title: 'Challenge "Build Full-Stack SaaS" — Soumis', badge: '+1000 pts', date: '9 Juin 2026' },
            { icon: '📅', color: 'bg-blue-500/20 text-blue-400', title: 'Workshop React Avancé — Rejoint', badge: 'Inscrit', date: '8 Juin 2026' },
            { icon: '🏅', color: 'bg-yellow-500/20 text-yellow-400', title: 'Badge "Top Scorer" — Obtenu', badge: 'Débloqué', date: '7 Juin 2026' },
            { icon: '⚡', color: 'bg-purple-500/20 text-purple-400', title: 'Challenge "Python Data Scraper" — Soumis', badge: '+500 pts', date: '5 Juin 2026' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{item.title}</p>
                <p className="text-gray-400 text-xs mt-1">⏱ {item.date}</p>
              </div>
              <span className="text-xs bg-white/5 text-gray-300 px-3 py-1 rounded-full">{item.badge}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Profil