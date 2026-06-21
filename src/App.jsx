import { useState } from 'react'
import Dashboard from './Pages/Dashboard'
import Profil from './Pages/Profil'
import Evenements from './Pages/Evenements'
import Challenges from './Pages/Challenges'
import Articles from './Pages/Article'
import Leaderboard from './Pages/Leaderboard'
import Competences from './Pages/Competences'


function ConfirmModal({ title, message, confirmText, confirmColor, onConfirm, onCancel, darkMode }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-2xl p-8 w-full max-w-md text-center border ${darkMode ? 'bg-[#10102E] border-purple-500/30' : 'bg-white border-purple-200'}`}>
        <p className="text-5xl mb-4">{title}</p>
        <h3 className={`font-bold text-xl mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{message.split('\n')[0]}</h3>
        <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{message.split('\n')[1]}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className={`flex-1 py-3 rounded-xl text-sm ${darkMode ? 'bg-white/5 text-gray-300' : 'bg-slate-100 text-slate-600'}`}>
            Annuler
          </button>
          <button onClick={onConfirm} className={`flex-1 py-3 rounded-xl text-sm font-medium text-white ${confirmColor}`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [darkMode, setDarkMode] = useState(true)
  const [showLogout, setShowLogout] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [isLoggedOut, setIsLoggedOut] = useState(false)

  if (isLoggedOut) {
    return (
      <div className={`flex items-center justify-center h-screen ${darkMode ? 'bg-[#0A0A1F]' : 'bg-slate-100'}`}>
        <div className="text-center">
          <p className="text-6xl mb-4">👋</p>
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>À bientôt !</h2>
          <p className={darkMode ? 'text-gray-400' : 'text-slate-500'}>Vous avez été déconnecté avec succès.</p>
          <button
            onClick={() => setIsLoggedOut(false)}
            className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl text-sm"
          >
            Se reconnecter
          </button>
        </div>
      </div>
    )
  }

  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'profil', icon: '👤', label: 'Mon Profil' },
    { id: 'evenements', icon: '📅', label: 'Événements' },
    { id: 'challenges', icon: '⚡', label: 'Challenges' },
    { id: 'article', icon: '📚', label: 'Article' },
    { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
    { id: 'competences', icon: '🎯', label: 'Compétences' },
  ]

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-[#0A0A1F]' : 'bg-slate-100'}`}>

      {/* Modals */}
      {showLogout && (
        <ConfirmModal
          title="🚪"
          message={"Déconnexion\nÊtes-vous sûr de vouloir vous déconnecter ?"}
          confirmText="Oui, me déconnecter"
          confirmColor="bg-purple-600"
          onConfirm={() => { setShowLogout(false); setIsLoggedOut(true) }}
          onCancel={() => setShowLogout(false)}
          darkMode={darkMode}
        />
      )}
      {showDelete && (
        <ConfirmModal
          title="⚠️"
          message={"Supprimer mon compte\nCette action est irréversible. Toutes vos données seront perdues."}
          confirmText="Supprimer définitivement"
          confirmColor="bg-red-600"
          onConfirm={() => { setShowDelete(false); setIsLoggedOut(true) }}
          onCancel={() => setShowDelete(false)}
          darkMode={darkMode}
        />
      )}

      {/* ── SIDEBAR desktop ── */}
      <aside className={`hidden lg:flex flex-col w-64 flex-shrink-0 p-4 border-r ${darkMode ? 'bg-[#10102E] border-purple-500/20' : 'bg-white border-purple-200'}`}>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-400 flex items-center justify-center font-bold text-white text-lg">N</div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Nexus</span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all border-l-4 ${
                activePage === item.id
                  ? 'bg-purple-600/25 text-purple-700 border-purple-500'
                  : `border-transparent ${darkMode ? 'text-gray-400 hover:bg-purple-600/10 hover:text-white' : 'text-slate-600 hover:bg-purple-50 hover:text-purple-700'}`
              } ${activePage === item.id && darkMode ? 'text-white' : ''}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Dark / Light toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm mb-2 transition-all ${darkMode ? 'text-gray-400 hover:bg-white/5' : 'text-slate-600 hover:bg-purple-50'}`}
        >
          <span>{darkMode ? '☀️' : '🌙'}</span>
          <span>{darkMode ? 'Mode Clair' : 'Mode Sombre'}</span>
          <div className={`ml-auto w-10 h-5 rounded-full relative transition-all ${darkMode ? 'bg-gray-600' : 'bg-purple-600'}`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? 'left-0.5' : 'left-5'}`}></div>
          </div>
        </button>

        {/* Déconnexion */}
        <button
          onClick={() => setShowLogout(true)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-500/10 transition-all"
        >
          <span>🚪</span>
          <span>Déconnexion</span>
        </button>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className={`flex-1 overflow-y-auto pb-20 lg:pb-0 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        {activePage === 'dashboard'    && <Dashboard onNavigate={setActivePage} darkMode={darkMode} />}
        {activePage === 'profil'       && <Profil darkMode={darkMode} onDelete={() => setShowDelete(true)} setDarkMode={setDarkMode} onLogout={() => setShowLogout(true)} />}
        {activePage === 'evenements'   && <Evenements darkMode={darkMode} />}
        {activePage === 'challenges'   && <Challenges darkMode={darkMode} />}
        {activePage === 'article'      && <Articles darkMode={darkMode} />}
        {activePage === 'leaderboard'  && <Leaderboard darkMode={darkMode} />}
        {activePage === 'competences'  && <Competences darkMode={darkMode} />}
      </main>

      {/* ── BOTTOM NAV mobile/tablet ── */}
      <nav className={`lg:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center py-2 z-40 border-t ${darkMode ? 'bg-[#10102E] border-purple-500/20' : 'bg-white border-purple-200'}`}>
        {[
          { id: 'dashboard',   icon: '🏠' },
          { id: 'evenements',  icon: '📅' },
          { id: 'challenges',  icon: '⚡' },
          { id: 'article',     icon: '📚' },
          { id: 'leaderboard', icon: '🏆' },
          { id: 'competences', icon: '🎯' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className="flex flex-col items-center gap-0.5 px-3 py-1"
            style={{ opacity: activePage === item.id ? 1 : 0.4, transform: activePage === item.id ? 'scale(1.2)' : 'scale(1)', transition: 'all 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '22px' }}>{item.icon}</span>
          </button>
        ))}
        <button
          onClick={() => setActivePage('profil')}
          className="flex flex-col items-center gap-0.5 px-3 py-1"
          style={{ opacity: ['profil','competences'].includes(activePage) ? 1 : 0.4, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '22px' }}>👤</span>
        </button>
      </nav>

    </div>
  )
}

export default App