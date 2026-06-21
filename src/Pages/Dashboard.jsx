function StatCard({ icon, label, value, badge, darkMode }) {
  return (
    <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-[#13133A] border-purple-500/20' : 'bg-white border-purple-200 shadow-sm'}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-2xl">{icon}</span>
        {badge && (
          <span className="text-xs text-cyan-500 bg-cyan-400/10 px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{value}</p>
      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{label}</p>
    </div>
  )
}

function Dashboard({ onNavigate, darkMode }) {
  const getFormattedDate = () => {
    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const dateStr = today.toLocaleDateString('fr-FR', options);
    return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
  };

  const text = darkMode ? 'text-white' : 'text-slate-900'
  const sub = darkMode ? 'text-gray-400' : 'text-slate-500'
  const card = darkMode ? 'bg-[#13133A] border-purple-500/20' : 'bg-white border-purple-200 shadow-sm'

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex flex-col space-y-1">
        <p className={`text-xs font-medium w-fit px-3 py-1 rounded-full ${darkMode ? 'text-gray-400 bg-[#1A1A3A]' : 'text-slate-500 bg-purple-100'}`}>
          {getFormattedDate()}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        <StatCard icon="🏆" label="Score Total" value="2 847" badge="+124 ce mois" darkMode={darkMode} />
        <StatCard icon="📈" label="Rank Actuel" value="#4" badge="↑ 2 places" darkMode={darkMode} />
        <StatCard icon="⚡" label="Challenges" value="12" badge="3 en cours" darkMode={darkMode} />
        <StatCard icon="📅" label="Événements" value="8" badge="2 à venir" darkMode={darkMode} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">

        {/* Challenge Actif */}
        <div className={`lg:col-span-2 rounded-2xl p-6 border ${darkMode ? 'bg-gradient-to-br from-purple-900/60 to-blue-900/60 border-purple-500/30' : 'bg-gradient-to-br from-purple-100 to-cyan-100 border-purple-200'}`}>
          <div className="flex gap-2 mb-3">
            <span className="text-xs bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full">⚡ Challenge Actif</span>
            <span className="text-xs bg-orange-500/20 text-orange-500 px-3 py-1 rounded-full">Hackathon</span>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`text-xl font-bold ${text}`}>Build a Full-Stack SaaS App</h3>
              <p className={`text-sm mt-1 ${sub}`}>Créez une application SaaS complète avec auth, DB et déploiement CI/CD.</p>
            </div>
            <div className="text-right">
              <p className={`text-3xl font-bold ${text}`}>1000</p>
              <p className={`text-sm ${sub}`}>points</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className={sub}>Progression globale</span>
              <span className="text-cyan-500">68%</span>
            </div>
            <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-white/10' : 'bg-purple-200'}`}>
              <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full" style={{width: '68%'}}></div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <button
               onClick={() => onNavigate('challenges')}
               className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-5 py-2 rounded-xl text-sm font-medium"
           >
                Continuer →
            </button>
            <span className={`text-sm ${sub}`}>⏱ Expire dans 4j 12h 30m</span>
          </div>
        </div>

        {/* Score Global */}
        <div className={`rounded-2xl p-6 border ${card}`}>
          <p className={`text-xs uppercase tracking-wider mb-4 ${sub}`}>Score Global</p>
          <p className="text-5xl font-bold text-cyan-500">2 847</p>
          <p className={`text-sm mt-2 ${sub}`}>Rang #4 sur 128 membres</p>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className={sub}>Rang #4</span>
              <span className="text-purple-500">153 pts pour #3</span>
            </div>
            <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-white/10' : 'bg-purple-200'}`}>
              <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full" style={{width: '85%'}}></div>
            </div>
          </div>
        </div>

      </div>

      {/* Activité Récente + Prochains Événements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">

        {/* Activité */}
        <div className={`lg:col-span-2 rounded-2xl p-6 border ${card}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`font-semibold ${text}`}>Activité Récente</h3>
             <button
                onClick={() => onNavigate('profil')}
                className="text-purple-500 text-sm whitespace-nowrap ml-2"
             >
                 Tout voir →
           </button>
          </div>
          {[
            { icon: '⚡', text: 'Challenge "Python Scraper" soumis', sub: 'Score: +250 pts', time: '2h', color: 'text-purple-500' },
            { icon: '📅', text: 'Événement "Workshop IA" rejoint', sub: '15 juin 2026', time: '1j', color: 'text-blue-500' },
            { icon: '📚', text: 'Article "Intro à Docker" lu', sub: 'Catégorie: DevOps', time: '2j', color: 'text-cyan-500' },
            { icon: '🏅', text: 'Badge "Fast Solver" obtenu', sub: 'Complété en < 24h', time: '3j', color: 'text-yellow-500' },
          ].map((item, i) => (
            <div key={i} className={`flex items-start gap-3 py-3 border-b last:border-0 ${darkMode ? 'border-white/5' : 'border-slate-200'}`}>
              <span className={`text-lg ${item.color}`}>{item.icon}</span>
              <div className="flex-1">
                <p className={`text-sm ${text}`}>{item.text}</p>
                <p className={`text-xs ${sub}`}>{item.sub}</p>
              </div>
              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>{item.time}</span>
            </div>
          ))}
        </div>

        {/* Prochains Événements */}
        <div className={`rounded-2xl p-6 border ${card}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`font-semibold ${text}`}>Prochains Événements</h3>
           <button
                onClick={() => onNavigate('evenements')}
                className="text-purple-500 text-sm"
           >
                 Tout voir →
           </button>
          </div>
          {[
            { icon: '📅', title: 'Workshop React', date: '15 Juin · Workshop' },
            { icon: '⚡', title: 'Hackathon 48h', date: '22 Juin · Hackathon' },
          ].map((ev, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl mb-2 ${darkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
              <span className="text-xl">{ev.icon}</span>
              <div>
                <p className={`text-sm font-medium ${text}`}>{ev.title}</p>
                <p className={`text-xs ${sub}`}>{ev.date}</p>
              </div>
              <span className="ml-auto text-cyan-500">✓</span>
            </div>
          ))}

          {/* Badges Récents */}
          <h3 className={`font-semibold mt-6 mb-3 ${text}`}>Badges Récents</h3>
          <div className="flex gap-2 flex-wrap">
            {['🏆','⚡','🔥','🎯','💡','🚀'].map((b, i) => (
              <span key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border ${darkMode ? 'bg-purple-600/20 border-purple-500/30' : 'bg-purple-100 border-purple-200'}`}>
                {b}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard