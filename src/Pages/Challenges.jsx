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

function DifficulteBar({ level, darkMode }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <div
          key={i}
          className={`h-2 w-6 rounded-full ${
            i <= level ? 'bg-orange-400' : darkMode ? 'bg-white/10' : 'bg-slate-200'
          }`}
        />
      ))}
    </div>
  )
}

function AlertModal({ message, onClose, darkMode }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className={`rounded-2xl p-6 w-full max-w-sm text-center border ${darkMode ? 'bg-[#10102E] border-red-500/30' : 'bg-white border-red-300'}`}>
        <p className="text-4xl mb-3">⚠️</p>
        <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-purple-600 text-white py-3 rounded-xl text-sm font-medium"
        >
          Compris
        </button>
      </div>
    </div>
  )
}

function SubmitModal({ challenge, existingSubmission, onClose, onSubmit, darkMode }) {
  const [titre, setTitre] = useState(existingSubmission?.titre || '')
  const [desc, setDesc] = useState(existingSubmission?.desc || '')
  const [fileName, setFileName] = useState(existingSubmission?.fileName || '')
  const isEditing = !!existingSubmission

  const inputBg = darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
  const text = darkMode ? 'text-white' : 'text-slate-900'
  const sub = darkMode ? 'text-gray-400' : 'text-slate-500'

  const handleFileClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.pdf,.zip'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) setFileName(file.name)
    }
    input.click()
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-2xl w-full max-w-xl border ${darkMode ? 'bg-[#10102E] border-purple-500/30' : 'bg-white border-purple-200'}`}>
        <div className={`p-6 border-b ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
          <div className="flex justify-between items-center">
            <h2 className={`font-bold text-lg ${text}`}>
              {isEditing ? '✏️ Modifier ma contribution' : '📤 Soumettre ma contribution'}
            </h2>
            <button onClick={onClose} className={`text-xl ${darkMode ? 'text-gray-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>✕</button>
          </div>
          <p className={`text-sm mt-1 ${sub}`}>{challenge.title}</p>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div>
            <label className={`text-xs uppercase tracking-wider mb-2 block ${sub}`}>
              Titre de votre soumission
            </label>
            <input
              value={titre}
              onChange={e => setTitre(e.target.value)}
              placeholder="Ex: Mon projet SaaS — Elyes"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 ${inputBg}`}
            />
          </div>
          <div>
            <label className={`text-xs uppercase tracking-wider mb-2 block ${sub}`}>
              Description & Lien GitHub
            </label>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Décrivez votre solution, le lien GitHub, les technologies utilisées..."
              rows={4}
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 resize-none ${inputBg}`}
            />
          </div>
          <div
            onClick={handleFileClick}
            className={`border-2 border-dashed rounded-xl p-4 text-center text-sm cursor-pointer hover:border-purple-500/50 transition-all ${darkMode ? 'border-white/10 text-gray-400' : 'border-slate-300 text-slate-500'}`}
          >
            {fileName ? (
              <span className="text-cyan-500">📎 {fileName} — cliquer pour changer</span>
            ) : (
              <span>📎 Uploader un fichier PDF, ZIP (optionnel)</span>
            )}
          </div>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => { onSubmit(challenge.id, { titre, desc, fileName }); onClose() }}
              className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-xl text-sm font-medium"
            >
              {isEditing ? '💾 Mettre à jour ma contribution' : '📤 Envoyer ma contribution'}
            </button>
            <button
              onClick={onClose}
              className={`px-6 py-3 rounded-xl text-sm ${darkMode ? 'bg-white/5 text-gray-400' : 'bg-slate-100 text-slate-500'}`}
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Challenges({ darkMode }) {
  const [state, setState] = useState(
    Object.fromEntries(challenges.map(c => [c.id, { joined: c.joined, submitted: c.submitted, submission: null }]))
  )
  const [submitFor, setSubmitFor] = useState(null)
  const [alertMsg, setAlertMsg] = useState(null)

  const text = darkMode ? 'text-white' : 'text-slate-900'
  const sub = darkMode ? 'text-gray-400' : 'text-slate-500'
  const card = darkMode ? 'bg-[#13133A] border-purple-500/20' : 'bg-white border-purple-200 shadow-sm'

  // Retirer — bloqué si déjà soumis
  const toggleJoin = (id) => {
    if (state[id].joined && state[id].submitted) {
      setAlertMsg("Vous ne pouvez pas vous retirer : vous avez déjà soumis une contribution pour ce challenge. Vous pouvez la modifier à la place.")
      return
    }
    setState(prev => ({ ...prev, [id]: { ...prev[id], joined: !prev[id].joined } }))
  }

  const handleSubmit = (id, submission) => {
    setState(prev => ({ ...prev, [id]: { ...prev[id], submitted: true, submission } }))
  }

  const joinedCount = Object.values(state).filter(s => s.joined).length
  const activeChallenge = challenges.find(c => state[c.id].joined && !state[c.id].submitted)

  return (
    <div className="p-8">

      {submitFor && (
        <SubmitModal
          challenge={submitFor}
          existingSubmission={state[submitFor.id].submission}
          onClose={() => setSubmitFor(null)}
          onSubmit={handleSubmit}
          darkMode={darkMode}
        />
      )}

      {alertMsg && (
        <AlertModal message={alertMsg} onClose={() => setAlertMsg(null)} darkMode={darkMode} />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div></div>
        {joinedCount > 0 && (
          <span className="text-xs bg-green-500/20 text-green-500 border border-green-500/30 px-3 sm:px-4 py-2 rounded-full flex-shrink-0">
            ✓ {joinedCount} challenge{joinedCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Challenge Actif Hero */}
      {activeChallenge && (
        <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 border ${darkMode ? `bg-gradient-to-br ${activeChallenge.color} border-purple-500/30` : 'bg-gradient-to-br from-purple-100 to-blue-100 border-purple-200'}`}>
          <div className="flex gap-2 mb-3 flex-wrap">
            <span className="text-xs bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full">⚡ Challenge Actif</span>
            <span className="text-xs bg-orange-500/20 text-orange-500 px-3 py-1 rounded-full">{activeChallenge.type}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <h2 className={`text-xl sm:text-2xl font-bold ${text}`}>{activeChallenge.title}</h2>
              <p className={`text-xs sm:text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>{activeChallenge.description}</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-3">
                <DifficulteBar level={activeChallenge.difficulte} darkMode={darkMode} />
                <span className={`text-xs sm:text-sm whitespace-nowrap ${sub}`}>⏱ Expire le {activeChallenge.expireLabel}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-3xl sm:text-4xl font-bold text-orange-500">{activeChallenge.points}</p>
              <p className={`text-xs sm:text-sm ${sub}`}>points</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-5">
            <button
              onClick={() => setSubmitFor(activeChallenge)}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium"
            >
              📤 Soumettre
            </button>
            <button className="bg-green-500/20 text-green-500 border border-green-500/30 px-4 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm">
              ✓ Inscrit
            </button>
            <button
              onClick={() => toggleJoin(activeChallenge.id)}
              className="bg-red-500/10 text-red-500 border border-red-500/30 px-4 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm"
            >
              Retirer
            </button>
          </div>
        </div>
      )}

      {/* Mes Challenges */}
      {joinedCount > 0 && (
        <div className={`rounded-2xl p-5 mb-6 border ${card}`}>
          <h3 className={`font-semibold mb-3 ${text}`}>Mes Challenges ({joinedCount})</h3>
          {challenges.filter(c => state[c.id].joined).map(c => (
            <div key={c.id} className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 border-b last:border-0 ${darkMode ? 'border-white/5' : 'border-slate-200'}`}>
              <span className="text-xl">⚡</span>
              <div className="flex-1">
                <p className={`text-sm font-medium ${text}`}>{c.title}</p>
                <p className={`text-xs ${sub}`}>Expire: {c.expireLabel} · {c.points} pts</p>
              </div>
              {state[c.id].submitted ? (
                <div className="flex gap-2 items-center">
                  <span className="text-xs bg-green-500/20 text-green-500 px-3 py-1 rounded-full">✓ Soumis</span>
                  <button
                    onClick={() => setSubmitFor(c)}
                    className="text-xs bg-purple-600/20 text-purple-500 border border-purple-500/30 px-3 py-1 rounded-full"
                  >
                    Modifier
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setSubmitFor(c)}
                    className="text-xs bg-purple-600/20 text-purple-500 border border-purple-500/30 px-3 py-1 rounded-full"
                  >
                    Soumettre
                  </button>
                  <button
                    onClick={() => toggleJoin(c.id)}
                    className="text-xs bg-red-500/10 text-red-500 px-3 py-1 rounded-full"
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
      <h3 className={`font-semibold text-lg sm:text-xl mb-3 sm:mb-4 ${text}`}>Tous les Challenges</h3>
      <div className="flex flex-col gap-2 sm:gap-3">
        {challenges.map(c => (
          <div key={c.id} className={`rounded-lg sm:rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 border ${card}`}>
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-base sm:text-xl flex-shrink-0`}>
              {c.type === 'Hackathon' ? '⚡' : c.type === 'Projet' ? '🖥️' : c.type === 'CTF' ? '🔒' : '🎯'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex gap-1 sm:gap-2 mb-1 flex-wrap">
                <span className="text-xs bg-purple-600/20 text-purple-500 px-2 py-0.5 rounded-full">{c.type}</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-500 px-2 py-0.5 rounded-full">+{c.points} pts</span>
                {state[c.id].submitted && (
                  <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">✓ Soumis</span>
                )}
              </div>
              <p className={`font-medium text-sm truncate ${text}`}>{c.title}</p>
              <div className="flex flex-wrap gap-2 sm:gap-4 mt-1 items-center">
                <DifficulteBar level={c.difficulte} darkMode={darkMode} />
                <span className={`text-xs whitespace-nowrap ${sub}`}>Expire: {c.expireLabel}</span>
              </div>
            </div>
            <div onClick={e => e.stopPropagation()} className="w-full sm:w-auto flex-shrink-0 self-end sm:self-auto">
              {state[c.id].joined ? (
                <div className="flex gap-1 sm:gap-2">
                  {state[c.id].submitted ? (
                    <button
                      onClick={() => setSubmitFor(c)}
                      className="flex-1 sm:flex-none bg-purple-600/20 text-purple-500 border border-purple-500/30 px-2 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm"
                    >
                      Modifier
                    </button>
                  ) : (
                    <button
                      onClick={() => setSubmitFor(c)}
                      className="flex-1 sm:flex-none bg-purple-600/20 text-purple-500 border border-purple-500/30 px-2 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm"
                    >
                      Soumettre
                    </button>
                  )}
                  <button
                    onClick={() => toggleJoin(c.id)}
                    className="flex-1 sm:flex-none bg-red-500/10 text-red-500 border border-red-500/30 px-2 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm"
                  >
                    Retirer
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => toggleJoin(c.id)}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-3 sm:px-5 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium"
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