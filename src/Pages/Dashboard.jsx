function StatCard({ icon, label, value, badge }) {
  return (
    <div className="bg-[#13133A] border border-purple-500/20 rounded-2xl p-6">
      <div className="flex justify-between items-start mb-4">
        <span className="text-2xl">{icon}</span>
        {badge && (
          <span className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-gray-400 text-sm mt-1">{label}</p>
    </div>
  )
}


function Dashboard({ onNavigate, darkMode }) {
  const getFormattedDate = () => {
    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const dateStr = today.toLocaleDateString('fr-FR', options);
    return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
   
  const card = darkMode ? '#13133A' : '#E8E4FF'
  const text = darkMode ? 'text-white' : 'text-purple-900'
  const sub = darkMode ? 'text-gray-400' : 'text-purple-600'
  };
  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex flex-col space-y-1">
        <p className="text-gray-400 text-xs font-medium bg-[#1A1A3A] w-fit px-3 py-1 rounded-full">
          {getFormattedDate()}
        </p> </div>
     
      <h1 className="text-4xl font-bold text-white mt-1">Bienvenue,elyes  👋</h1>
      <p className="text-gray-400 mt-1">Voici un aperçu de votre activité sur Nexus.</p>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        <StatCard icon="🏆" label="Score Total" value="2 847" badge="+124 ce mois" />
        <StatCard icon="📈" label="Rank Actuel" value="#4" badge="↑ 2 places" />
        <StatCard icon="⚡" label="Challenges" value="12" badge="3 en cours" />
        <StatCard icon="📅" label="Événements" value="8" badge="2 à venir" />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-4 mt-4">

        {/* Challenge Actif */}
        <div className="col-span-2 bg-gradient-to-br from-purple-900/60 to-blue-900/60 border border-purple-500/30 rounded-2xl p-6">
          <div className="flex gap-2 mb-3">
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">⚡ Challenge Actif</span>
            <span className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full">Hackathon</span>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-white">Build a Full-Stack SaaS App</h3>
              <p className="text-gray-400 text-sm mt-1">Créez une application SaaS complète avec auth, DB et déploiement CI/CD.</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">1000</p>
              <p className="text-gray-400 text-sm">points</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Progression globale</span>
              <span className="text-cyan-400">68%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full" style={{width: '68%'}}></div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <button
               onClick={() => onNavigate('Challenges')}
               className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-5 py-2 rounded-xl text-sm font-medium"
           >
                Continuer →
            </button>
            <span className="text-gray-400 text-sm">⏱ Expire dans 4j 12h 30m</span>
          </div>
        </div>

        {/* Score Global */}
        <div className="bg-[#13133A] border border-purple-500/20 rounded-2xl p-6">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-4">Score Global</p>
          <p className="text-5xl font-bold text-cyan-400">2 847</p>
          <p className="text-gray-400 text-sm mt-2">Rang #4 sur 128 membres</p>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Rang #4</span>
              <span className="text-purple-400">153 pts pour #3</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full" style={{width: '85%'}}></div>
            </div>
          </div>
        </div>

      </div>

      {/* Activité Récente + Prochains Événements */}
      <div className="grid grid-cols-3 gap-4 mt-4">

        {/* Activité */}
        <div className="col-span-2 bg-[#13133A] border border-purple-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold">Activité Récente</h3>
             <button
                onClick={() => onNavigate('Profil')}
                className="text-purple-400 text-sm"
             >
                 Tout voir →
           </button>
          </div>
          {[
            { icon: '⚡', text: 'Challenge "Python Scraper" soumis', sub: 'Score: +250 pts', time: '2h', color: 'text-purple-400' },
            { icon: '📅', text: 'Événement "Workshop IA" rejoint', sub: '15 juin 2026', time: '1j', color: 'text-blue-400' },
            { icon: '📚', text: 'Article "Intro à Docker" lu', sub: 'Catégorie: DevOps', time: '2j', color: 'text-cyan-400' },
            { icon: '🏅', text: 'Badge "Fast Solver" obtenu', sub: 'Complété en < 24h', time: '3j', color: 'text-yellow-400' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
              <span className={`text-lg ${item.color}`}>{item.icon}</span>
              <div className="flex-1">
                <p className="text-white text-sm">{item.text}</p>
                <p className="text-gray-400 text-xs">{item.sub}</p>
              </div>
              <span className="text-gray-500 text-xs">{item.time}</span>
            </div>
          ))}
        </div>

        {/* Prochains Événements */}
        <div className="bg-[#13133A] border border-purple-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold">Prochains Événements</h3>
           <button
                onClick={() => onNavigate('Evenements')}
                className="text-purple-400 text-sm"
           >
                 Tout voir →
           </button>
          </div>
          {[
            { icon: '📅', title: 'Workshop React', date: '15 Juin · Workshop' },
            { icon: '⚡', title: 'Hackathon 48h', date: '22 Juin · Hackathon' },
          ].map((ev, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl mb-2">
              <span className="text-xl">{ev.icon}</span>
              <div>
                <p className="text-white text-sm font-medium">{ev.title}</p>
                <p className="text-gray-400 text-xs">{ev.date}</p>
              </div>
              <span className="ml-auto text-cyan-400">✓</span>
            </div>
          ))}

          {/* Badges Récents */}
          <h3 className="text-white font-semibold mt-6 mb-3">Badges Récents</h3>
          <div className="flex gap-2 flex-wrap">
            {['🏆','⚡','🔥','🎯','💡','🚀'].map((b, i) => (
              <span key={i} className="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-xl flex items-center justify-center text-lg">
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