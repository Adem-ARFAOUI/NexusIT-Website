const membres = [
  { rang: 1, initiales: 'SC', nom: 'Sophie Chen', score: 4215, badges: 14, challenges: 18, color: 'from-yellow-500 to-orange-400' },
  { rang: 2, initiales: 'MD', nom: 'Marc Dubois', score: 3890, badges: 12, challenges: 15, color: 'from-gray-400 to-gray-300' },
  { rang: 3, initiales: 'FA', nom: 'Fatima Al-Rashid', score: 3000, badges: 10, challenges: 12, color: 'from-orange-600 to-yellow-600' },
  { rang: 4, initiales: 'EM', nom: 'Elyes Eswi', score: 2847, badges: 6, challenges: 12, color: 'from-purple-500 to-cyan-400', isMe: true },
  { rang: 5, initiales: 'LB', nom: 'Lucas Bernard', score: 2650, badges: 8, challenges: 10, color: 'from-blue-500 to-cyan-500' },
  { rang: 6, initiales: 'YT', nom: 'Yuki Tanaka', score: 2440, badges: 7, challenges: 9, color: 'from-pink-500 to-purple-500' },
  { rang: 7, initiales: 'KM', nom: 'Karim Mansour', score: 2180, badges: 5, challenges: 8, color: 'from-green-500 to-teal-400' },
]

function Leaderboard({ darkMode }) {
  const me = membres.find(m => m.isMe)
  const top3 = membres.slice(0, 3)

  const text = darkMode ? 'text-white' : 'text-slate-900'
  const sub = darkMode ? 'text-gray-400' : 'text-slate-500'
  const card = darkMode ? 'bg-[#13133A] border-purple-500/20' : 'bg-white border-purple-200 shadow-sm'

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Mon Score */}
      <div className={`rounded-xl sm:rounded-2xl p-3 sm:p-5 mb-6 border ${darkMode ? 'bg-gradient-to-r from-purple-900/60 to-blue-900/60 border-purple-500/30' : 'bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200'}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm sm:text-base relative flex-shrink-0">
            EM
            <span className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-cyan-500 rounded-full flex items-center justify-center text-xs font-bold text-white">4</span>
          </div>
          <div className="flex-1">
            <p className={`font-bold text-lg sm:text-xl ${text}`}>2 847 <span className="text-green-500 text-xs sm:text-sm font-normal">+124</span></p>
            <p className={`text-xs sm:text-sm ${sub}`}>Elyes Eswi — Rang #4</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
          {[{v:'6',l:'Badges'},{v:'12',l:'Défis'},{v:'8',l:'Événements'}].map((s,i) => (
            <div key={i} className={`rounded-lg sm:rounded-xl px-2 sm:px-3 py-2 text-center ${darkMode ? 'bg-white/5' : 'bg-white/70'}`}>
              <p className={`font-bold text-sm sm:text-base ${text}`}>{s.v}</p>
              <p className={`text-xs ${sub}`}>{s.l}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className={`truncate ${sub}`}>Vers Rang #3</span>
            <span className="text-purple-500 whitespace-nowrap ml-2">153 pts</span>
          </div>
          <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-white/10' : 'bg-purple-200'}`}>
            <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full" style={{width:'95%'}}></div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-8">
        <h3 className={`font-semibold text-center mb-4 ${text}`}>🏆 Top 3</h3>

        {/* Desktop podium */}
        <div className="hidden md:flex justify-center items-end gap-6">
          {[top3[1], top3[0], top3[2]].map((m, i) => {
            const isFirst = i === 1
            return (
              <div key={m.rang} className={`flex flex-col items-center ${isFirst ? 'mb-4' : ''}`}>
                {isFirst && <span className="text-3xl mb-2">👑</span>}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white font-bold text-lg border-4 ${isFirst ? 'border-yellow-400 shadow-lg shadow-yellow-400/30' : i === 0 ? 'border-gray-400' : 'border-orange-600'}`}>
                  {m.initiales}
                </div>
                <span className="text-2xl mt-2">{['🥈','🥇','🥉'][i]}</span>
                <p className={`font-semibold text-sm mt-1 ${text}`}>{m.nom.split(' ')[0]}</p>
                <p className={`text-xs ${sub}`}>{m.score} pts</p>
                <div className={`mt-2 rounded-t-xl w-20 ${isFirst ? 'h-16 bg-yellow-500/20 border-t-2 border-yellow-400' : i === 0 ? 'h-10 bg-gray-500/20 border-t-2 border-gray-400' : 'h-8 bg-orange-500/20 border-t-2 border-orange-600'}`}></div>
              </div>
            )
          })}
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-2 md:hidden">
          {top3.map((m, i) => (
            <div key={m.rang} className={`flex items-center gap-4 p-4 rounded-2xl border ${
              i === 0 ? (darkMode ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-yellow-50 border-yellow-300') :
              i === 1 ? (darkMode ? 'bg-gray-500/10 border-gray-500/30' : 'bg-slate-50 border-slate-300') :
              (darkMode ? 'bg-orange-500/10 border-orange-500/30' : 'bg-orange-50 border-orange-300')
            }`}>
              <span className="text-2xl">{['🥇','🥈','🥉'][i]}</span>
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>{m.initiales}</div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${text}`}>{m.nom}</p>
                <p className={`text-xs ${sub}`}>{m.score} pts</p>
              </div>
              <span className={`text-lg font-bold ${i === 0 ? 'text-yellow-500' : i === 1 ? (darkMode ? 'text-gray-300' : 'text-slate-500') : 'text-orange-500'}`}>#{i+1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Classement Général */}
      <div className={`rounded-xl sm:rounded-2xl overflow-hidden mb-8 border ${card}`}>
        <div className={`flex justify-between items-center p-3 sm:p-5 border-b ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
          <h3 className={`font-semibold text-sm sm:text-base ${text}`}>Classement Général</h3>
          <span className={`text-xs sm:text-sm ${sub}`}>128 membres</span>
        </div>
        {membres.map(m => (
          <div
            key={m.rang}
            className={`flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4 border-b last:border-0 ${darkMode ? 'border-white/5' : 'border-slate-200'} ${
              m.isMe ? (darkMode ? 'bg-purple-600/10 border-l-4 border-l-purple-500' : 'bg-purple-50 border-l-4 border-l-purple-500') : ''
            }`}
          >
            <span className={`w-6 text-xs sm:text-sm font-bold flex-shrink-0 ${
              m.rang === 1 ? 'text-yellow-500' :
              m.rang === 2 ? (darkMode ? 'text-gray-300' : 'text-slate-500') :
              m.rang === 3 ? 'text-orange-500' : (darkMode ? 'text-gray-500' : 'text-slate-400')
            }`}>
              #{m.rang}
            </span>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0`}>
              {m.initiales}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs sm:text-sm font-medium truncate ${text}`}>
                {m.nom}
                {m.isMe && <span className="ml-2 text-xs text-purple-500 bg-purple-600/20 px-2 py-0.5 rounded-full">moi</span>}
              </p>
            </div>
            <div className="hidden sm:flex gap-4 sm:gap-6 text-xs sm:text-sm flex-shrink-0">
              <div className="text-center">
                <p className={`font-bold ${text}`}>{m.score}</p>
                <p className={`text-xs ${sub}`}>Score</p>
              </div>
              <div className="text-center">
                <p className="text-cyan-500 font-bold">🏅 {m.badges}</p>
                <p className={`text-xs ${sub}`}>Badges</p>
              </div>
            </div>
            <div className="sm:hidden text-center text-xs flex-shrink-0">
              <p className={`font-bold ${text}`}>{m.score}</p>
              <p className="text-cyan-500">🏅{m.badges}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Leaderboard