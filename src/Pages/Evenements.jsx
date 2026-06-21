import { useState } from 'react'

const events = [
  {
    id: 1,
    type: 'Hackathon',
    title: 'Hackathon 48h — Build & Ship',
    date: '2026-06-22',
    dateLabel: '22 Juin 2026',
    lieu: 'Salle des Workshops, Campus B',
    places: 47,
    maxPlaces: 60,
    points: 1000,
    description: 'Construisez une application complète en 48h avec votre équipe. Le thème sera révélé au début de l\'événement. Technologies libres.',
    plan: [
      'Jour 1 — 09h: Ouverture et révélation du thème',
      'Jour 1 — 10h: Début du développement',
      'Jour 2 — 18h: Soumission des projets',
      'Jour 2 — 19h: Présentations et jury',
      'Jour 2 — 20h: Remise des prix'
    ],
    image: '🖥️',
    joined: false
  },
  {
    id: 2,
    type: 'Workshop',
    title: 'Workshop React Avancé',
    date: '2026-06-15',
    dateLabel: '15 Juin 2026',
    lieu: 'Amphi A3 — Bâtiment Principal',
    places: 28,
    maxPlaces: 30,
    points: 300,
    description: 'Maîtrisez les hooks avancés, le Context API, React Query et les patterns de performance. Niveau intermédiaire requis.',
    plan: [
      '09h — useCallback, useMemo, useRef',
      '11h — Context API et state management',
      '13h — Pause déjeuner',
      '14h — React Query et data fetching',
      '16h — Projet pratique en groupe'
    ],
    image: '⚛️',
    joined: true
  },
  {
    id: 3,
    type: 'Conférence',
    title: 'Conférence IA & Machine Learning',
    date: '2026-05-28',
    dateLabel: '28 Mai 2026',
    lieu: 'Amphithéâtre Central',
    places: 120,
    maxPlaces: 150,
    points: 200,
    description: 'Découvrez les dernières avancées en IA : LLMs, Vision par ordinateur, et applications pratiques dans l\'industrie.',
    plan: [
      '10h — Introduction aux LLMs',
      '11h — Computer Vision en 2026',
      '14h — Table ronde avec des experts',
      '16h — Session Q&A'
    ],
    image: '🤖',
    joined: true
  },
  {
    id: 4,
    type: 'Quiz',
    title: 'Quiz Dev Trivia Challenge',
    date: '2026-05-03',
    dateLabel: '3 Mai 2026',
    lieu: 'En ligne — Discord Nexus',
    places: 45,
    maxPlaces: 50,
    points: 150,
    description: 'Quiz en ligne sur les fondamentaux du développement: algorithmes, web, sécurité et culture dev. 30 questions en 45 minutes.',
    plan: [
      'Round 1 — Algorithmes et structures de données',
      'Round 2 — Web et protocoles',
      'Round 3 — Sécurité informatique',
      'Round 4 — Culture dev et histoire'
    ],
    image: '🎯',
    joined: false
  },
]

function EventModal({ ev, onClose, joined, onToggle, darkMode }) {
  const pct = Math.round((ev.places / ev.maxPlaces) * 100)
  const text = darkMode ? 'text-white' : 'text-slate-900'
  const sub = darkMode ? 'text-gray-400' : 'text-slate-500'

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border ${darkMode ? 'bg-[#10102E] border-purple-500/30' : 'bg-white border-purple-200'}`}>

        {/* Header */}
        <div className={`p-6 rounded-t-2xl relative ${darkMode ? 'bg-gradient-to-r from-purple-900 to-blue-900' : 'bg-gradient-to-r from-purple-100 to-blue-100'}`}>
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 text-2xl ${darkMode ? 'text-gray-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
          >
            ✕
          </button>
          <div className="flex gap-2 mb-3">
            <span className="text-xs bg-purple-600/80 text-white px-3 py-1 rounded-full">{ev.type}</span>
            <span className="text-xs bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full">+{ev.points} pts</span>
          </div>
          <h2 className={`text-2xl font-bold ${text}`}>{ev.title}</h2>
          <div className={`flex flex-wrap gap-4 mt-3 text-sm ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>
            <span>📅 {ev.dateLabel}</span>
            <span>📍 {ev.lieu}</span>
            <span>👥 {ev.places}/{ev.maxPlaces} places</span>
          </div>
          <div className="mt-3">
            <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-white/10' : 'bg-purple-200'}`}>
              <div
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full"
                style={{width: `${pct}%`}}
              ></div>
            </div>
            <p className={`text-xs mt-1 ${sub}`}>{ev.maxPlaces - ev.places} places restantes</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <h3 className={`font-semibold mb-2 ${text}`}>📋 Description</h3>
          <p className={`text-sm leading-relaxed mb-6 ${sub}`}>{ev.description}</p>

          <h3 className={`font-semibold mb-3 ${text}`}>🗓 Programme</h3>
          <div className="flex flex-col gap-2 mb-6">
            {ev.plan.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-xs text-purple-500 flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>{step}</p>
              </div>
            ))}
          </div>

          <h3 className={`font-semibold mb-2 ${text}`}>📍 Lieu</h3>
          <div className={`rounded-xl p-4 mb-6 ${darkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>{ev.lieu}</p>
          </div>

          <div className="flex gap-3">
            {joined ? (
              <>
                <div className="flex-1 bg-green-500/10 border border-green-500/30 text-green-500 py-3 rounded-xl text-sm text-center font-medium">
                  ✓ Vous êtes inscrit
                </div>
                <button
                  onClick={() => { onToggle(ev.id); onClose() }}
                  className="px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/30 rounded-xl text-sm"
                >
                  Se retirer
                </button>
              </>
            ) : (
              <button
                onClick={() => { onToggle(ev.id); onClose() }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-xl text-sm font-medium"
              >
                Participer à cet événement →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Evenements({ darkMode }) {
  const [filter, setFilter] = useState('Tous')
  const [joined, setJoined] = useState({ 1: false, 2: true, 3: true, 4: false })
  const [selected, setSelected] = useState(null)

  const today = new Date()
  const text = darkMode ? 'text-white' : 'text-slate-900'
  const sub = darkMode ? 'text-gray-400' : 'text-slate-500'
  const card = darkMode ? 'bg-[#13133A] border-purple-500/20' : 'bg-white border-purple-200 shadow-sm'

  const filtered = events.filter(ev => {
    const evDate = new Date(ev.date)
    if (filter === 'À venir') return evDate >= today
    if (filter === 'Passés') return evDate < today
    if (filter.startsWith('Mes')) return joined[ev.id]
    return true
  })

  const joinedCount = Object.values(joined).filter(Boolean).length

  const toggleJoin = (id) => {
    setJoined(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="p-8">

      {selected && (
        <EventModal
          ev={selected}
          onClose={() => setSelected(null)}
          joined={joined[selected.id]}
          onToggle={toggleJoin}
          darkMode={darkMode}
        />
      )}

      {/* Hero */}
      <div className={`rounded-2xl p-6 mb-6 border ${darkMode ? 'bg-gradient-to-r from-purple-900/60 to-blue-900/60 border-purple-500/20' : 'bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200'}`}>
        <p className="text-cyan-500 text-xs uppercase tracking-wider mb-1">Prochain Événement</p>
        <h2 className={`text-2xl font-bold ${text}`}>Hackathon 48h — Build & Ship</h2>
        <div className={`flex flex-wrap gap-4 mt-2 text-sm ${sub}`}>
          <span>📅 22 Juin 2026</span>
          <span>📍 Salle des Workshops</span>
          <span>👥 47/60</span>
        </div>
        <div className="flex gap-3 mt-4">
          {['12','08','34'].map((v, i) => (
            <div key={i} className={`rounded-xl px-4 py-2 text-center ${darkMode ? 'bg-white/10' : 'bg-white/70'}`}>
              <p className={`font-bold text-xl ${text}`}>{v}</p>
              <p className={`text-xs ${sub}`}>{['Jours','Heures','Min'][i]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['Tous', 'À venir', 'Passés', `Mes participations (${joinedCount})`].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm transition-all ${
              filter === f
                ? 'bg-cyan-500 text-white'
                : darkMode ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className={`text-center py-20 ${sub}`}>
          <p className="text-4xl mb-4">📭</p>
          <p>Aucun événement dans cette catégorie</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(ev => {
            const pct = Math.round((ev.places / ev.maxPlaces) * 100)
            const isPast = new Date(ev.date) < today
            return (
              <div
                key={ev.id}
                className={`rounded-2xl overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all hover:scale-[1.01] border ${card}`}
                onClick={() => setSelected(ev)}
              >
                <div className={`h-40 flex items-center justify-center text-6xl relative ${darkMode ? 'bg-gradient-to-br from-purple-900 to-blue-900' : 'bg-gradient-to-br from-purple-200 to-blue-200'}`}>
                  {ev.image}
                  <span className="absolute top-3 left-3 text-xs bg-purple-600/80 text-white px-3 py-1 rounded-full">
                    {ev.type}
                  </span>
                  {isPast && (
                    <span className="absolute top-3 right-3 text-xs bg-gray-600/80 text-gray-200 px-3 py-1 rounded-full">
                      Passé
                    </span>
                  )}
                  {joined[ev.id] && !isPast && (
                    <span className="absolute top-3 right-3 text-xs bg-cyan-500/80 text-white px-3 py-1 rounded-full">
                      ✓ Inscrit
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className={`font-bold ${text}`}>{ev.title}</h3>
                  <div className={`flex flex-col gap-1 mt-2 text-sm ${sub}`}>
                    <span>📅 {ev.dateLabel}</span>
                    <span>📍 {ev.lieu}</span>
                    <span>👥 {ev.places}/{ev.maxPlaces}</span>
                  </div>
                  <div className={`w-full rounded-full h-1.5 mt-3 ${darkMode ? 'bg-white/10' : 'bg-purple-200'}`}>
                    <div
                      className="bg-gradient-to-r from-purple-500 to-cyan-400 h-1.5 rounded-full"
                      style={{width: `${pct}%`}}
                    ></div>
                  </div>
                  <div className="flex gap-2 mt-4" onClick={e => e.stopPropagation()}>
                    {joined[ev.id] ? (
                      <>
                        <div className="flex-1 bg-green-500/10 text-green-500 border border-green-500/30 py-2 rounded-xl text-sm text-center">
                          ✓ Inscrit
                        </div>
                        <button
                          onClick={() => toggleJoin(ev.id)}
                          className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/30 rounded-xl text-sm"
                        >
                          Retirer
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => toggleJoin(ev.id)}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-2 rounded-xl text-sm font-medium"
                      >
                        Participer →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Evenements