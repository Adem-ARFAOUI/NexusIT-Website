import { useState } from 'react'

const articles = [
  {
    id: 1,
    category: 'React',
    categoryColor: 'bg-cyan-500/20 text-cyan-400',
    title: 'Maîtriser React Hooks en Profondeur',
    description: 'Un guide complet sur useState, useEffect, useCallback, useMemo et les hooks personnalisés.',
    author: 'Admin Nexus',
    date: '5 Juin 2026',
    readTime: '8 min',
    hasPdf: false,
    image: '⚛️',
    content: `Les React Hooks ont révolutionné la façon dont nous écrivons des composants fonctionnels.

**useEffect** — s'exécute après chaque rendu et remplace componentDidMount.

**useCallback** — mémoïse une fonction pour éviter les re-rendus inutiles.

**useMemo** — mémoïse une valeur calculée coûteuse.

**useRef** — accède directement au DOM ou garde une valeur sans re-rendu.

Ces hooks permettent de créer des applications React performantes et maintenables.`
  },
  {
    id: 2,
    category: 'Cybersécurité',
    categoryColor: 'bg-red-500/20 text-red-400',
    title: 'Sécuriser une API REST — OWASP Top 10',
    description: 'Découvrez les 10 vulnérabilités les plus critiques selon OWASP et comment protéger votre API.',
    author: 'Admin Nexus',
    date: '1 Juin 2026',
    readTime: '12 min',
    hasPdf: false,
    image: '🔒',
    content: `L'OWASP Top 10 liste les risques de sécurité les plus critiques pour les applications web.

**1. Injection SQL** — Toujours utiliser des requêtes préparées.

**2. Authentification cassée** — Utiliser JWT avec expiration courte.

**3. Exposition de données sensibles** — Chiffrer les données au repos et en transit.

**4. XXE** — Désactiver le parsing XML externe.

**5. Contrôle d'accès défaillant** — Vérifier les permissions côté serveur.`
  },
  {
    id: 3,
    category: 'DevOps',
    categoryColor: 'bg-green-500/20 text-green-400',
    title: 'Introduction à Docker & Kubernetes',
    description: 'Conteneurisez vos applications, créez des images Docker et orchestrez avec Kubernetes.',
    author: 'Admin Nexus',
    date: '28 Mai 2026',
    readTime: '15 min',
    hasPdf: true,
    image: '🐳',
    content: `Docker permet d'encapsuler une application et ses dépendances dans un conteneur portable.

**Dockerfile** — fichier qui décrit comment construire votre image.

**docker build** — crée une image depuis votre Dockerfile.

**docker run** — lance un conteneur depuis une image.

**Kubernetes** orchestre plusieurs conteneurs à grande échelle, gère la disponibilité et le scaling automatique.`
  },
  {
    id: 4,
    category: 'Python',
    categoryColor: 'bg-yellow-500/20 text-yellow-400',
    title: 'Python pour la Data Science — Pandas & NumPy',
    description: 'Explorez les bibliothèques incontournables de la Data Science avec des exemples pratiques.',
    author: 'Admin Nexus',
    date: '20 Mai 2026',
    readTime: '10 min',
    hasPdf: true,
    image: '🐍',
    content: `Pandas et NumPy sont les fondations de tout projet Data Science en Python.

**NumPy** — calcul numérique rapide avec des tableaux multidimensionnels.

**Pandas DataFrame** — structure de données tabulaire puissante.

**pd.read_csv()** — charge un fichier CSV en DataFrame.

**df.groupby()** — agrège des données par groupe.

**df.plot()** — visualise les données directement depuis Pandas.`
  },
  {
    id: 5,
    category: 'IA/ML',
    categoryColor: 'bg-purple-500/20 text-purple-400',
    title: 'Introduction au Machine Learning avec Scikit-Learn',
    description: 'Créez vos premiers modèles de classification et régression avec Scikit-Learn.',
    author: 'Admin Nexus',
    date: '15 Mai 2026',
    readTime: '11 min',
    hasPdf: false,
    image: '🤖',
    content: `Scikit-Learn est la bibliothèque ML la plus utilisée en Python.

**train_test_split** — divise les données en ensemble d'entraînement et de test.

**LinearRegression** — prédit une valeur continue.

**RandomForestClassifier** — classification par forêt d'arbres de décision.

**model.fit()** — entraîne le modèle sur les données.

**model.predict()** — fait des prédictions sur de nouvelles données.`
  },
  {
    id: 6,
    category: 'Algorithmique',
    categoryColor: 'bg-orange-500/20 text-orange-400',
    title: 'Algorithmes de Tri — Comparaison et Complexité',
    description: 'Bubble sort, Quick sort, Merge sort — comprenez la complexité Big O en profondeur.',
    author: 'Admin Nexus',
    date: '10 Mai 2026',
    readTime: '9 min',
    hasPdf: false,
    image: '📊',
    content: `Comprendre la complexité algorithmique est essentiel pour tout développeur.

**Bubble Sort** — O(n²) — simple mais lent sur grandes données.

**Quick Sort** — O(n log n) en moyenne — très utilisé en pratique.

**Merge Sort** — O(n log n) garanti — stable et prévisible.

**Big O** mesure comment le temps d'exécution évolue avec la taille des données.`
  },
]

const categories = ['Tous', 'React', 'Python', 'Cybersécurité', 'DevOps', 'IA/ML', 'Algorithmique']

function ArticlePanel({ article, onClose }) {
  const [fullscreen, setFullscreen] = useState(false)

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-[#10102E] border border-purple-500/30 rounded-2xl overflow-y-auto transition-all duration-300 ${fullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-2xl max-h-[85vh]'}`}>

        {/* Header */}
        <div className="sticky top-0 bg-[#10102E] border-b border-white/10 p-5 flex justify-between items-center">
          <div className="flex gap-2">
            <span className={`text-xs px-3 py-1 rounded-full ${article.categoryColor}`}>{article.category}</span>
            {article.hasPdf && <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full">📄 PDF</span>}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1 rounded-lg text-sm transition-all"
            >
              {fullscreen ? '⊡ Réduire' : '⛶ Plein écran'}
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-xl px-2">✕</button>
          </div>
        </div>

        <div className="p-6">
          <div className="h-40 bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl flex items-center justify-center text-6xl mb-6">
            {article.image}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{article.title}</h2>
          <div className="flex gap-4 text-gray-400 text-sm mb-6">
            <span>👤 {article.author}</span>
            <span>📅 {article.date}</span>
            <span>⏱ {article.readTime} de lecture</span>
          </div>
          <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{article.content}</div>
          {article.hasPdf && (
            <button className="mt-8 w-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 py-3 rounded-xl text-sm font-medium hover:bg-cyan-500/20 transition-all">
              📥 Télécharger le PDF
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Articles() {
  const [category, setCategory] = useState('Tous')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = articles.filter(a => {
    const matchCat = category === 'Tous' || a.category === category
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="p-8">

      {/* Side Panel */}
      {selected && (
        <ArticlePanel article={selected} onClose={() => setSelected(null)} />
      )}

      {/* Header */}
      <h1 className="text-3xl font-bold text-white">Articles & Ressources</h1>
      <p className="text-gray-400 text-sm mt-1 mb-6">
        Préparez-vous avant vos challenges
      </p>

      {/* Search */}
      <div className="relative mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un article ou une technologie..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm transition-all ${
              category === cat
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-4">📭</p>
          <p>Aucun article trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map(a => (
            <div
              key={a.id}
              onClick={() => setSelected(a)}
              className="bg-[#13133A] border border-purple-500/20 rounded-2xl overflow-hidden cursor-pointer hover:border-purple-500/50 hover:scale-[1.02] transition-all"
            >
              {/* Image */}
              <div className="h-32 bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center text-5xl relative">
                {a.image}
                {a.hasPdf && (
                  <span className="absolute top-2 right-2 text-xs bg-red-500/80 text-white px-2 py-0.5 rounded-full">
                    📄 PDF
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <span className={`text-xs px-2 py-0.5 rounded-full ${a.categoryColor}`}>
                  {a.category}
                </span>
                <h3 className="text-white font-semibold text-sm mt-2 leading-snug">
                  {a.title}
                </h3>
                <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                  {a.description}
                </p>
                <div className="flex justify-between items-center mt-3 text-gray-500 text-xs">
                  <span>{a.author}</span>
                  <span>⏱ {a.readTime}</span>
                </div>
                <button className="mt-3 w-full bg-white/5 hover:bg-purple-600/20 text-gray-300 hover:text-white py-2 rounded-xl text-xs transition-all">
                  👁 Lire l'article
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Articles