const membres = [
  { rang: 1, initiales: 'SC', nom: 'Sophie Chen', score: 4215, badges: 14, challenges: 18, color: 'from-yellow-500 to-orange-400' },
  { rang: 2, initiales: 'MD', nom: 'Marc Dubois', score: 3890, badges: 12, challenges: 15, color: 'from-gray-400 to-gray-300' },
  { rang: 3, initiales: 'FA', nom: 'Fatima Al-Rashid', score: 3000, badges: 10, challenges: 12, color: 'from-orange-600 to-yellow-600' },
  { rang: 4, initiales: 'EM', nom: 'Elyes Eswi', score: 2847, badges: 6, challenges: 12, color: 'from-purple-500 to-cyan-400', isMe: true },
  { rang: 5, initiales: 'LB', nom: 'Lucas Bernard', score: 2650, badges: 8, challenges: 10, color: 'from-blue-500 to-cyan-500' },
  { rang: 6, initiales: 'YT', nom: 'Yuki Tanaka', score: 2440, badges: 7, challenges: 9, color: 'from-pink-500 to-purple-500' },
  { rang: 7, initiales: 'KM', nom: 'Karim Mansour', score: 2180, badges: 5, challenges: 8, color: 'from-green-500 to-teal-400' },
]

const competences = [
  { nom: 'JavaScript / TypeScript', pct: 85, color: 'from-yellow-400 to-orange-400' },
  { nom: 'React & Next.js', pct: 78, color: 'from-cyan-400 to-blue-400' },
  { nom: 'Python', pct: 72, color: 'from-blue-400 to-indigo-400' },
  { nom: 'Git / DevOps', pct: 80, color: 'from-green-400 to-teal-400' },
  { nom: 'Cybersécurité', pct: 55, color: 'from-red-400 to-pink-400' },
  { nom: 'Algorithmique', pct: 65, color: 'from-purple-400 to-pink-400' },
]

const badges = [
  { icon: '🏆', nom: 'Top Scorer', desc: 'Atteindre le top 5', date: 'Avril 2026', unlocked: true },
  { icon: '⚡', nom: 'Speed Demon', desc: 'Challenge en < 24h', date: 'Mars 2026', unlocked: true },
  { icon: '🔥', nom: 'On Fire', desc: '3 challenges consécutifs', date: 'Mars 2026', unlocked: true },
  { icon: '🎯', nom: 'Précision', desc: 'Score parfait sur un quiz', date: 'Fév 2026', unlocked: true },
  { icon: '💡', nom: 'Innovateur', desc: 'Solution remarquée par le jury', date: 'Janv 2026', unlocked: true },
  { icon: '🚀', nom: 'Launcher', desc: 'Soumettre premier challenge', date: 'Oct 2025', unlocked: true },
  { icon: '🔒', nom: 'CTF Master', desc: 'Résoudre 5 challenges CTF', date: null, unlocked: false },
  { icon: '🌐', nom: 'Full-Stack', desc: 'Compléter projet front + back', date: null, unlocked: false },
  { icon: '🤖', nom: 'AI Pioneer', desc: 'Soumettre un projet IA/ML', date: null, unlocked: false },
]

const certifications = [
  { icon: '⭐', nom: 'React Fundamentals', desc: 'Maîtrise des hooks, context et patterns React', score: 94, date: 'Mars 2026', color: 'text-cyan-400' },
  { icon: '🐍', nom: 'Python Advanced', desc: 'POO, décorateurs, générateurs et async', score: 88, date: 'Janv 2026', color: 'text-yellow-400' },
  { icon: '⚙️', nom: 'Git & DevOps', desc: 'Workflow Git, CI/CD, Docker et déploiement', score: 91, date: 'Nov 2025', color: 'text-green-400' },
]

function Leaderboard() {
  const me = membres.find(m => m.isMe)
  const top3 = membres.slice(0, 3)

  return (
    <div className="p-8">

    {/*  LEADERBOARD  */}
      <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
      <p className="text-gray-400 text-sm mt-1 mb-6">
        Classement général des membres Nexus — Juin 2026.
      </p>

      {/* Mon Score */}
      <div className="bg-gradient-to-r from-purple-900/60 to-blue-900/60 border border-purple-500/30 rounded-2xl p-5 mb-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg border-4 border-purple-500/30 relative">
          EM
          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center text-xs font-bold text-white">4</span>
        </div>
        <div className="flex-1">
          <p className="text-white font-bold text-2xl">2 847 <span className="text-green-400 text-sm font-normal">+124 ce mois</span></p>
          <p className="text-gray-400 text-sm">Elyes Eswi — Rang #4 / 128 membres</p>
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Vers le Rang #3 (Fatima — 3000 pts)</span>
              <span className="text-purple-400">153 pts restants</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full" style={{width: '95%'}}></div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 text-center">
          {[{v:'6', l:'Badges'},{v:'12', l:'Challenges'},{v:'8', l:'Événements'}].map((s,i) => (
            <div key={i} className="bg-white/5 rounded-xl px-4 py-2">
              <p className="text-white font-bold">{s.v}</p>
              <p className="text-gray-400 text-xs">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end gap-6 mb-8">
        {[top3[1], top3[0], top3[2]].map((m, i) => {
          const isFirst = i === 1
          return (
            <div key={m.rang} className={`flex flex-col items-center ${isFirst ? 'mb-4' : ''}`}>
              {isFirst && <span className="text-3xl mb-2">👑</span>}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white font-bold text-lg border-4 ${
                isFirst ? 'border-yellow-400 shadow-lg shadow-yellow-400/30' :
                i === 0 ? 'border-gray-400' : 'border-orange-600'
              }`}>
                {m.initiales}
              </div>
              <span className="text-2xl mt-2">{['🥈','🥇','🥉'][i]}</span>
              <p className="text-white font-semibold text-sm mt-1">{m.nom.split(' ')[0]}</p>
              <p className="text-gray-400 text-xs">{m.score} pts</p>
              <div className={`mt-2 rounded-t-xl w-20 ${
                isFirst ? 'h-16 bg-yellow-500/20 border-t-2 border-yellow-400' :
                i === 0 ? 'h-10 bg-gray-500/20 border-t-2 border-gray-400' :
                'h-8 bg-orange-500/20 border-t-2 border-orange-600'
              }`}></div>
            </div>
          )
        })}
      </div>

      {/* Classement Général */}
      <div className="bg-[#13133A] border border-purple-500/20 rounded-2xl overflow-hidden mb-8">
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <h3 className="text-white font-semibold">Classement Général</h3>
          <span className="text-gray-400 text-sm">128 membres</span>
        </div>
        {membres.map(m => (
          <div
            key={m.rang}
            className={`flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 ${
              m.isMe ? 'bg-purple-600/10 border-l-4 border-l-purple-500' : ''
            }`}
          >
            <span className={`w-8 text-sm font-bold ${
              m.rang === 1 ? 'text-yellow-400' :
              m.rang === 2 ? 'text-gray-300' :
              m.rang === 3 ? 'text-orange-400' : 'text-gray-500'
            }`}>
              #{m.rang}
            </span>
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-sm font-bold`}>
              {m.initiales}
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium">
                {m.nom}
                {m.isMe && <span className="ml-2 text-xs text-purple-400 bg-purple-600/20 px-2 py-0.5 rounded-full">moi</span>}
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <div className="text-center">
                <p className="text-white font-bold">{m.score}</p>
                <p className="text-gray-400 text-xs">Score</p>
              </div>
              <div className="text-center">
                <p className="text-cyan-400 font-bold">🏅 {m.badges}</p>
                <p className="text-gray-400 text-xs">Badges</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      
        </div>
      
  )
}

export default Leaderboard