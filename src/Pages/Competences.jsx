import React from 'react';

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
 
function Compétences() {
  return (
    <div className="space-y-8 text-white w-full">
      {/* ══════════════ COMPÉTENCES ══════════════ */}
      <h1 className="text-3xl font-bold text-white mt-10">Compétences</h1>
      <p className="text-gray-400 text-sm mt-1 mb-6">
        Vos badges, certifications et niveaux de compétence techniques.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: '🏅', v: '6/9', l: 'Badges Obtenus' },
          { icon: '📜', v: '3', l: 'Certifications' },
          { icon: '📊', v: '6', l: 'Compétences Tracées' },
        ].map((s, i) => (
          <div key={i} className="bg-[#13133A] border border-purple-500/20 rounded-2xl p-5 flex items-center gap-4">
            <span className="text-3xl">{s.icon}</span>
            <div>
              <p className="text-white font-bold text-2xl">{s.v}</p>
              <p className="text-gray-400 text-sm">{s.l}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">

        {/* Badges */}
        <div className="bg-[#13133A] border border-purple-500/20 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold">Badges & Récompenses</h3>
            <span className="text-xs bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full">6/9 obtenus</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((b, i) => (
              <div
                key={i}
                className={`rounded-2xl p-3 text-center border ${
                  b.unlocked
                    ? 'bg-purple-600/10 border-purple-500/30'
                    : 'bg-white/3 border-white/5 opacity-40'
                }`}
              >
                <div className={`text-3xl mb-1 ${!b.unlocked ? 'grayscale' : ''}`}>
                  {b.unlocked ? b.icon : '🔒'}
                </div>
                <p className={`text-xs font-semibold ${b.unlocked ? 'text-white' : 'text-gray-500'}`}>
                  {b.nom}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">{b.desc}</p>
                {b.unlocked && b.date && (
                  <p className="text-purple-400 text-xs mt-1">{b.date}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications + Niveaux */}
        <div className="flex flex-col gap-4">

          {/* Certifications */}
          <div className="bg-[#13133A] border border-purple-500/20 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">Certifications</h3>
              <button className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full">
                📥 Tout exporter
              </button>
            </div>
            {certifications.map((c, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{c.icon}</span>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">{c.nom}</p>
                    <p className="text-gray-400 text-xs">{c.desc}</p>
                    <div className="flex justify-between text-xs mt-1">
                      <span className={c.color}>Score: {c.score}/100</span>
                      <span className="text-gray-500">Obtenu le {c.date}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 mt-1">
                      <div
                        className={`bg-gradient-to-r ${
                          i === 0 ? 'from-cyan-500 to-blue-400' :
                          i === 1 ? 'from-yellow-500 to-orange-400' :
                          'from-green-500 to-teal-400'
                        } h-1.5 rounded-full`}
                        style={{width: `${c.score}%`}}
                      ></div>
                    </div>
                    <button className="mt-2 text-xs text-cyan-400 hover:underline">
                      📥 Télécharger le certificat PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Niveaux de Compétence */}
          <div className="bg-[#13133A] border border-purple-500/20 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-4">Niveaux de Compétence</h3>
            {competences.map((c, i) => (
              <div key={i} className="mb-3 last:mb-0">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{c.nom}</span>
                  <span className="text-white font-bold">{c.pct}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${c.color} h-2 rounded-full transition-all`}
                    style={{width: `${c.pct}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compétences;