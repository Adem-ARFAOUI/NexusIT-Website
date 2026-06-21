import { useState } from 'react'

function Profil({ darkMode, onDelete, setDarkMode, onLogout }) {
  const [activeTab, setActiveTab] = useState('info')
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    nom: 'jridi',
    prenom: 'Elyes',
    email: 'elyes@nexus-club.io',
    filiere: 'Business Intelligence — 2ème année',
    github: 'github.com/elyes'
  })

  const text = darkMode ? 'text-white' : 'text-slate-900'
  const sub = darkMode ? 'text-gray-400' : 'text-slate-500'
  const card = darkMode ? 'bg-[#13133A] border-purple-500/20' : 'bg-white border-purple-200 shadow-sm'
  const inputBg = darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
  const tabInactive = darkMode ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'

  return (
    <div className="p-8">

      {/* Hero Banner */}
      <div className={`rounded-2xl p-6 mb-6 relative overflow-hidden ${darkMode ? 'bg-gradient-to-r from-purple-900 to-cyan-900' : 'bg-gradient-to-r from-purple-100 to-cyan-100'}`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,#7C3AED,transparent)]"></div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white border-4 border-white/20 shadow-lg shadow-purple-500/30 flex-shrink-0">
            EJ
          </div>
          <div className="flex-1">
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>Membre depuis Septembre 2024</p>
            <h2 className={`text-2xl sm:text-3xl font-bold ${text}`}>Elyes jridi</h2>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="text-xs bg-green-500/20 text-green-500 px-3 py-1 rounded-full">● Membre Actif</span>
              <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-slate-500'}`}>Rang #4 / 128</span>
            </div>
          </div>
          <div className="sm:ml-auto sm:text-right">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Score Global</p>
            <p className="text-3xl sm:text-4xl font-bold text-cyan-500">2 847</p>
            <p className="text-green-500 text-sm">+124 ce mois</p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { label: 'Score Total', value: '2 847' },
          { label: 'Challenges Complétés', value: '12' },
          { label: 'Événements Rejoints', value: '8' },
          { label: 'Rang', value: '#4', color: 'text-yellow-500' },
        ].map((s, i) => (
          <div key={i} className={`rounded-xl p-4 text-center border ${card}`}>
            <p className={`text-2xl font-bold ${s.color || 'text-cyan-500'}`}>{s.value}</p>
            <p className={`text-sm mt-1 ${sub}`}>{s.label}</p>
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
              activeTab === tab ? 'bg-purple-600 text-white' : tabInactive
            }`}
          >
            {tab === 'info' ? '👤 Informations' : '📋 Historique d\'Activité'}
          </button>
        ))}
      </div>

      {/* Tab: Informations */}
      {activeTab === 'info' && (
        <div className={`rounded-2xl p-6 border ${card}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`font-semibold text-lg ${text}`}>Informations Personnelles</h3>
            <button
              onClick={() => setEditing(!editing)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${darkMode ? 'bg-white/5 hover:bg-purple-600/20 text-gray-300 hover:text-white' : 'bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-700'}`}
            >
              ✏️ {editing ? 'Annuler' : 'Modifier'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'NOM', key: 'nom' },
              { label: 'PRÉNOM', key: 'prenom' },
              { label: 'EMAIL', key: 'email' },
              { label: 'FILIÈRE', key: 'filiere' },
              { label: 'GITHUB', key: 'github' },
            ].map(field => (
              <div key={field.key} className={field.key === 'email' || field.key === 'filiere' ? 'sm:col-span-2' : ''}>
                <label className={`text-xs uppercase tracking-wider mb-2 block ${sub}`}>{field.label}</label>
                <input
                  value={form[field.key]}
                  onChange={e => setForm({...form, [field.key]: e.target.value})}
                  disabled={!editing}
                  className={`w-full border rounded-xl px-4 py-3 text-sm disabled:opacity-70 focus:outline-none focus:border-purple-500 ${inputBg}`}
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
            <h4 className="text-red-500 font-semibold mb-1">Zone Dangereuse</h4>
            <p className={`text-sm mb-3 ${sub}`}>La suppression de votre compte est irréversible.</p>
           <button
               onClick={onDelete}
               className="flex items-center gap-2 bg-red-500/10 text-red-500 border border-red-500/30 px-4 py-2 rounded-xl text-sm hover:bg-red-500/20 transition-all"
          >
             🗑 Supprimer mon compte
            </button>
          </div>
        </div>
      )}

      {/* Tab: Historique */}
      {activeTab === 'historique' && (
        <div className={`rounded-2xl p-6 border ${card}`}>
          <h3 className={`font-semibold text-lg mb-4 ${text}`}>Historique d'Activité</h3>
          
          {[
            { icon: '⚡', color: 'bg-purple-500/20 text-purple-500', title: 'Challenge "Build Full-Stack SaaS" — Soumis', badge: '+1000 pts', date: '9 Juin 2026' },
            { icon: '📅', color: 'bg-blue-500/20 text-blue-500', title: 'Workshop React Avancé — Rejoint', badge: 'Inscrit', date: '8 Juin 2026' },
            { icon: '🏅', color: 'bg-yellow-500/20 text-yellow-500', title: 'Badge "Top Scorer" — Obtenu', badge: 'Débloqué', date: '7 Juin 2026' },
            { icon: '⚡', color: 'bg-purple-500/20 text-purple-500', title: 'Challenge "Python Data Scraper" — Soumis', badge: '+500 pts', date: '5 Juin 2026' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 py-4 border-b last:border-0 ${darkMode ? 'border-white/5' : 'border-slate-200'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${text}`}>{item.title}</p>
                <p className={`text-xs mt-1 ${sub}`}>⏱ {item.date}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full flex-shrink-0 ${darkMode ? 'bg-white/5 text-gray-300' : 'bg-slate-100 text-slate-600'}`}>{item.badge}</span>
            </div>
          ))}
        </div>
      )}
       {/* Paramètres — مهم بالخصوص لـ mobile/tablet اللي ما فيهمش sidebar */}
      <div className={`rounded-2xl p-6 border mt-6 ${card} lg:hidden`}>
        <h3 className={`font-semibold text-lg mb-4 ${text}`}>Paramètres</h3>

        {/* Mode Sombre/Clair toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm mb-2 transition-all ${darkMode ? 'text-gray-300 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100'} lg:hidden`}
        >
          <span>{darkMode ? '☀️' : '🌙'}</span>
          <span>{darkMode ? 'Mode Clair' : 'Mode Sombre'}</span>
          <div className={`ml-auto w-10 h-5 rounded-full relative transition-all ${darkMode ? 'bg-gray-600' : 'bg-purple-600'}`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? 'left-0.5' : 'left-5'}`}></div>
          </div>
        </button>

        {/* Déconnexion */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-500/10 transition-all lg:hidden"
        >
          <span>🚪</span>
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  )
}

    

export default Profil