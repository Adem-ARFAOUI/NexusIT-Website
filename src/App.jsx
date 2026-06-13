import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Profil from './pages/Profil'
import Evenements from './pages/Evenements'
import Challenges from './pages/Challenges'
import Articles from './pages/Article'
import Leaderboard from './pages/Leaderboard'
import Competences from './pages/Competences'

// Modal تأكيد عام
function ConfirmModal({ title, message, confirmText, confirmColor, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#10102E] border border-purple-500/30 rounded-2xl p-8 w-full max-w-md text-center">
        <p className="text-4xl mb-4">{title}</p>
        <h3 className="text-white font-bold text-xl mb-2">{message.split('\n')[0]}</h3>
        <p className="text-gray-400 text-sm mb-8">{message.split('\n')[1]}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-white/5 text-gray-300 hover:bg-white/10 py-3 rounded-xl text-sm transition-all"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 rounded-xl text-sm font-medium text-white transition-all ${confirmColor}`}
          >
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

  // كي يتفسخ الحساب أو Déconnexion
  if (isLoggedOut) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0A0A1F]">
        <div className="text-center">
          <p className="text-6xl mb-4">👋</p>
          <h2 className="text-white text-2xl font-bold mb-2">À bientôt !</h2>
          <p className="text-gray-400">Vous avez été déconnecté avec succès.</p>
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

  const bg = darkMode ? '#0A0A1F' : '#F1F5F9'
  const sidebarBg = darkMode ? '#10102E' : '#EEF2FF'
  const textColor = darkMode ? 'white' : '#1E1B4B'
  const subTextColor = darkMode ? '#94A3B8' : '#6B7280'

  return (
    <div style={{ display: 'flex', height: '100vh', background: bg, color: textColor, overflow: 'hidden' }}>

      {/* Modals */}
      {showLogout && (
        <ConfirmModal
          title="🚪"
          message={`Déconnexion\nÊtes-vous sûr de vouloir vous déconnecter ?`}
          confirmText="Oui, me déconnecter"
          confirmColor="bg-purple-600 hover:bg-purple-700"
          onConfirm={() => { setShowLogout(false); setIsLoggedOut(true) }}
          onCancel={() => setShowLogout(false)}
        />
      )}
      {showDelete && (
        <ConfirmModal
          title="⚠️"
          message={`Supprimer mon compte\nCette action est irréversible. Toutes vos données seront perdues définitivement.`}
          confirmText="Supprimer définitivement"
          confirmColor="bg-red-600 hover:bg-red-700"
          onConfirm={() => { setShowDelete(false); setIsLoggedOut(true) }}
          onCancel={() => setShowDelete(false)}
        />
      )}

      {/* Sidebar */}
      <div style={{ width: '256px', height: '100%', background: sidebarBg, borderRight: '1px solid rgba(124,58,237,0.2)', display: 'flex', flexDirection: 'column', padding: '16px' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', padding: '8px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', fontSize: '18px' }}>N</div>
          <span style={{ fontSize: '20px', fontWeight: 'bold', background: 'linear-gradient(to right, #A78BFA, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Nexus</span>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {[
            { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
            { id: 'profil', icon: '👤', label: 'Mon Profil' },
            { id: 'evenements', icon: '📅', label: 'Événements' },
            { id: 'challenges', icon: '⚡', label: 'Challenges' },
            { id: 'articles', icon: '📚', label: 'Articles' },
            { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
            { id: 'competences', icon: '🎯', label: 'Compétences' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 16px', borderRadius: '12px', border: 'none',
                cursor: 'pointer', textAlign: 'left', fontSize: '14px', fontWeight: '500',
                transition: 'all 0.2s',
                background: activePage === item.id ? 'rgba(124,58,237,0.25)' : 'transparent',
                color: activePage === item.id ? 'white' : subTextColor,
                borderLeft: activePage === item.id ? '4px solid #7C3AED' : '4px solid transparent',
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Dark/Light Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 16px', borderRadius: '12px', border: 'none',
            cursor: 'pointer', marginBottom: '8px',
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(124,58,237,0.1)',
            color: darkMode ? '#94A3B8' : '#7C3AED', fontSize: '14px',
          }}
        >
          <span>{darkMode ? '☀️' : '🌙'}</span>
          <span>{darkMode ? 'Mode Clair' : 'Mode Sombre'}</span>
          <div style={{ marginLeft: 'auto', width: '40px', height: '20px', borderRadius: '10px', background: darkMode ? '#4B5563' : '#7C3AED', position: 'relative', transition: 'all 0.3s' }}>
            <div style={{ position: 'absolute', top: '2px', width: '16px', height: '16px', background: 'white', borderRadius: '50%', transition: 'all 0.3s', left: darkMode ? '2px' : '22px' }}></div>
          </div>
        </button>

        {/* Déconnexion */}
        <button
          onClick={() => setShowLogout(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 16px', borderRadius: '12px', border: 'none',
            cursor: 'pointer', background: 'transparent',
            color: '#F87171', fontSize: '14px',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span>🚪</span>
          <span>Déconnexion</span>
        </button>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activePage === 'dashboard' && <Dashboard onNavigate={setActivePage} darkMode={darkMode} />}
        {activePage === 'profil' && <Profil darkMode={darkMode} onDelete={() => setShowDelete(true)} />}
        {activePage === 'evenements' && <Evenements darkMode={darkMode} />}
        {activePage === 'challenges' && <Challenges darkMode={darkMode} />}
        {activePage === 'articles' && <Articles darkMode={darkMode} />}
        {activePage === 'leaderboard' && <Leaderboard darkMode={darkMode} />}
        {activePage === 'competences' && <Competences darkMode={darkMode} />}
      </div>
    </div>
  )
}

export default App