import { useState } from 'react'

const challenges = [
  {
    id: 1,
    type: 'Hackathon',
    title: 'Build a Full-Stack SaaS App',
    description: 'Créez une application SaaS complète avec authentification, base de données, et pipeline CI/CD. Déployez sur Vercel ou Railway.',
    points: 1000,
    difficulte: 5,
    expire: '2026-06-13',
    expireLabel: '13 Juin 2026',
    joined: true,
    submitted: false,
    color: 'from-purple-900 to-blue-900'
  },
  {
    id: 2,
    type: 'Projet',
    title: 'Python Data Scraper',
    description: 'Créez un scraper Python qui extrait des données d\'un site web et les stocke dans une base de données SQLite.',
    points: 500,
    difficulte: 3,
    expire: '2026-06-18',
    expireLabel: '18 Juin 2026',
    joined: false,
    submitted: false,
    color: 'from-blue-900 to-cyan-900'
  },
  {
    id: 3,
    type: 'CTF',
    title: 'Cybersécurité — Find the Flag',
    description: 'Résolvez une série de challenges de sécurité: injection SQL, XSS, et cryptographie basique.',
    points: 750,
    difficulte: 4,
    expire: '2026-06-20',
    expireLabel: '20 Juin 2026',
    joined: false,
    submitted: false,
    color: 'from-red-900 to-purple-900'
  },
  {
    id: 4,
    type: 'Quiz',
    title: 'Quiz JavaScript ES6+',
    description: 'Testez vos connaissances sur les fonctionnalités modernes de JavaScript: Promises, async/await, destructuring.',
    points: 300,
    difficulte: 2,
    expire: '2026-06-25',
    expireLabel: '25 Juin 2026',
    joined: false,
    submitted: false,
    color: 'from-yellow-900 to-orange-900'
  },
]

function DifficulteBar({ level }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <div
          key={i}
          className={`h-2 w-6 rounded-full ${
            i <= level ? 'bg-orange-400' : 'bg-white/10'
          }`}
        />
      ))}
    </div>
  )
}

function SubmitModal({ challenge, onClose, onSubmit }) {
  const [titre, setTitre] = useState('')
  const [desc, setDesc] = useState('')

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#10102E] border border-purple-500/30 rounded-2xl w-full max-w-xl">
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-white font-bold text-lg">📤 Soumettre ma contribution</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
          </div>
          <p className="text-gray-400 text-sm mt-1">{challenge.title}</p>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">
              Titre de votre soumission
            </label>
            <input
              value={titre}
              onChange={e => setTitre(e.target.value)}
              placeholder="Ex: Mon projet SaaS — Elyes"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">
              Description & Lien GitHub
            </label>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Décrivez votre solution, le lien GitHub, les technologies utilisées..."
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>
          <div className="border-2 border-dashed border-white/10 rounded-xl p-4 text-center text-gray-400 text-sm cursor-pointer hover:border-purple-500/50 transition-all">
            📎 Uploader un fichier PDF, ZIP (optionnel)
          </div>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => { onSubmit(challenge.id); onClose() }}
              className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-xl text-sm font-medium"
            >
              📤 Envoyer ma contribution
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white/5 text-gray-400 rounded-xl text-sm"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Challenges() {
  const [state, setState] = useState(
    Object.fromEntries(challenges.map(c => [c.id, { joined: c.joined, submitted: c.submitted }]))
  )
  const [submitFor, setSubmitFor] = useState(null)

  const toggleJoin = (id) => {
    setState(prev => ({ ...prev, [id]: { ...prev[id], joined: !prev[id].joined } }))
  }

  const handleSubmit = (id) => {
    setState(prev => ({ ...prev, [id]: { ...prev[id], submitted: true } }))
  }

  const joinedCount = Object.values(state).filter(s => s.joined).length
  const activeChallenge = challenges.find(c => state[c.id].joined && !state[c.id].submitted)

  return (
    <div className="p-8">

      {/* Submit Modal */}
      {submitFor && (
        <SubmitModal
          challenge={submitFor}
          onClose={() => setSubmitFor(null)}
          onSubmit={handleSubmit}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Challenges</h1>
          <p className="text-gray-400 text-sm mt-1">
            Relevez des défis techniques et gagnez des points.
            <span className="text-cyan-400"> Inscrivez-vous d'abord avant de soumettre.</span>
          </p>
        </div>
        {joinedCount > 0 && (
          <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-full">
            ✓ {joinedCount} challenge{joinedCount > 1 ? 's' : ''} rejoint{joinedCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Challenge Actif Hero */}
      {activeChallenge && (
        <div className={`bg-gradient-to-br ${activeChallenge.color} border border-purple-500/30 rounded-2xl p-6 mb-6`}>
          <div className="flex gap-2 mb-3">
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">⚡ Challenge Actif</span>
            <span className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full">{activeChallenge.type}</span>
          </div>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{activeChallenge.title}</h2>
              <p className="text-gray-300 text-sm mt-2 max-w-lg">{activeChallenge.description}</p>
              <div className="flex items-center gap-4 mt-3">
                <DifficulteBar level={activeChallenge.difficulte} />
                <span className="text-gray-400 text-sm">⏱ Expire le {activeChallenge.expireLabel}</span>
              </div>
            </div>
            <div className="text-right ml-6">
              <p className="text-4xl font-bold text-orange-400">{activeChallenge.points}</p>
              <p className="text-gray-400 text-sm">points à gagner</p>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button
              onClick={() => setSubmitFor(activeChallenge)}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-6 py-3 rounded-xl text-sm font-medium"
            >
              📤 Soumettre ma contribution
            </button>
            <button className="bg-green-500/20 text-green-400 border border-green-500/30 px-5 py-3 rounded-xl text-sm">
              ✓ Inscrit
            </button>
            <button
              onClick={() => toggleJoin(activeChallenge.id)}
              className="bg-red-500/10 text-red-400 border border-red-500/30 px-5 py-3 rounded-xl text-sm"
            >
              Se retirer
            </button>
          </div>
        </div>
      )}

      {/* Mes Challenges */}
      {joinedCount > 0 && (
        <div className="bg-[#13133A] border border-purple-500/20 rounded-2xl p-5 mb-6">
          <h3 className="text-white font-semibold mb-3">Mes Challenges ({joinedCount})</h3>
          {challenges.filter(c => state[c.id].joined).map(c => (
            <div key={c.id} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
              <span className="text-xl">⚡</span>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{c.title}</p>
                <p className="text-gray-400 text-xs">Expire: {c.expireLabel} · {c.points} pts</p>
              </div>
              {state[c.id].submitted ? (
                <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">✓ Soumis</span>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setSubmitFor(c)}
                    className="text-xs bg-purple-600/20 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full"
                  >
                    Soumettre
                  </button>
                  <button
                    onClick={() => toggleJoin(c.id)}
                    className="text-xs bg-red-500/10 text-red-400 px-3 py-1 rounded-full"
                  >
                    Retirer
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tous les Challenges */}
      <h3 className="text-white font-semibold mb-4">Tous les Challenges</h3>
      <div className="flex flex-col gap-3">
        {challenges.map(c => (
          <div key={c.id} className="bg-[#13133A] border border-purple-500/20 rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-xl flex-shrink-0`}>
              {c.type === 'Hackathon' ? '⚡' : c.type === 'Projet' ? '🖥️' : c.type === 'CTF' ? '🔒' : '🎯'}
            </div>
            <div className="flex-1">
              <div className="flex gap-2 mb-1">
                <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded-full">{c.type}</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">+{c.points} pts</span>
                {state[c.id].submitted && (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">✓ Soumis</span>
                )}
              </div>
              <p className="text-white font-medium">{c.title}</p>
              <div className="flex gap-4 mt-1">
                <DifficulteBar level={c.difficulte} />
                <span className="text-gray-400 text-xs">Expire: {c.expireLabel}</span>
              </div>
            </div>
            <div onClick={e => e.stopPropagation()}>
              {state[c.id].joined ? (
                <div className="flex gap-2">
                  {!state[c.id].submitted && (
                    <button
                      onClick={() => setSubmitFor(c)}
                      className="bg-purple-600/20 text-purple-400 border border-purple-500/30 px-4 py-2 rounded-xl text-sm"
                    >
                      Soumettre
                    </button>
                  )}
                  <button
                    onClick={() => toggleJoin(c.id)}
                    className="bg-red-500/10 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl text-sm"
                  >
                    Retirer
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => toggleJoin(c.id)}
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-5 py-2 rounded-xl text-sm font-medium"
                >
                  Participer
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Challenges