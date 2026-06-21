import { useState } from 'react'
import { jsPDF } from 'jspdf'

const articles = [
  { id: 1, category: 'React', categoryColor: 'bg-cyan-500/20 text-cyan-500', title: 'Maîtriser React Hooks en Profondeur', description: 'Un guide complet sur useState, useEffect, useCallback, useMemo et les hooks personnalisés.', author: 'Admin Nexus', date: '5 Juin 2026', readTime: '8 min', hasPdf: false, image: '⚛️',
    content: `Les React Hooks ont révolutionné la façon dont nous écrivons des composants fonctionnels.\n\n**useEffect** — s'exécute après chaque rendu et remplace componentDidMount.\n\n**useCallback** — mémoïse une fonction pour éviter les re-rendus inutiles.\n\n**useMemo** — mémoïse une valeur calculée coûteuse.\n\n**useRef** — accède directement au DOM ou garde une valeur sans re-rendu.\n\nCes hooks permettent de créer des applications React performantes et maintenables.` },
  { id: 2, category: 'Cybersécurité', categoryColor: 'bg-red-500/20 text-red-500', title: 'Sécuriser une API REST — OWASP Top 10', description: 'Découvrez les 10 vulnérabilités les plus critiques selon OWASP et comment protéger votre API.', author: 'Admin Nexus', date: '1 Juin 2026', readTime: '12 min', hasPdf: false, image: '🔒',
    content: `L'OWASP Top 10 liste les risques de sécurité les plus critiques pour les applications web.\n\n**1. Injection SQL** — Toujours utiliser des requêtes préparées.\n\n**2. Authentification cassée** — Utiliser JWT avec expiration courte.\n\n**3. Exposition de données sensibles** — Chiffrer les données au repos et en transit.\n\n**4. XXE** — Désactiver le parsing XML externe.\n\n**5. Contrôle d'accès défaillant** — Vérifier les permissions côté serveur.` },
  { id: 3, category: 'DevOps', categoryColor: 'bg-green-500/20 text-green-500', title: 'Introduction à Docker & Kubernetes', description: 'Conteneurisez vos applications, créez des images Docker et orchestrez avec Kubernetes.', author: 'Admin Nexus', date: '28 Mai 2026', readTime: '15 min', hasPdf: true, image: '🐳',
    content: `Docker permet d'encapsuler une application et ses dépendances dans un conteneur portable.\n\n**Dockerfile** — fichier qui décrit comment construire votre image.\n\n**docker build** — crée une image depuis votre Dockerfile.\n\n**docker run** — lance un conteneur depuis une image.\n\n**Kubernetes** orchestre plusieurs conteneurs à grande échelle, gère la disponibilité et le scaling automatique.` },
  { id: 4, category: 'Python', categoryColor: 'bg-yellow-500/20 text-yellow-500', title: 'Python pour la Data Science — Pandas & NumPy', description: 'Explorez les bibliothèques incontournables de la Data Science avec des exemples pratiques.', author: 'Admin Nexus', date: '20 Mai 2026', readTime: '10 min', hasPdf: true, image: '🐍',
    content: `Pandas et NumPy sont les fondations de tout projet Data Science en Python.\n\n**NumPy** — calcul numérique rapide avec des tableaux multidimensionnels.\n\n**Pandas DataFrame** — structure de données tabulaire puissante.\n\n**pd.read_csv()** — charge un fichier CSV en DataFrame.\n\n**df.groupby()** — agrège des données par groupe.\n\n**df.plot()** — visualise les données directement depuis Pandas.` },
  { id: 5, category: 'IA/ML', categoryColor: 'bg-purple-500/20 text-purple-500', title: 'Introduction au Machine Learning avec Scikit-Learn', description: 'Créez vos premiers modèles de classification et régression avec Scikit-Learn.', author: 'Admin Nexus', date: '15 Mai 2026', readTime: '11 min', hasPdf: false, image: '🤖',
    content: `Scikit-Learn est la bibliothèque ML la plus utilisée en Python.\n\n**train_test_split** — divise les données en ensemble d'entraînement et de test.\n\n**LinearRegression** — prédit une valeur continue.\n\n**RandomForestClassifier** — classification par forêt d'arbres de décision.\n\n**model.fit()** — entraîne le modèle sur les données.\n\n**model.predict()** — fait des prédictions sur de nouvelles données.` },
  { id: 6, category: 'Algorithmique', categoryColor: 'bg-orange-500/20 text-orange-500', title: 'Algorithmes de Tri — Comparaison et Complexité', description: 'Bubble sort, Quick sort, Merge sort — comprenez la complexité Big O en profondeur.', author: 'Admin Nexus', date: '10 Mai 2026', readTime: '9 min', hasPdf: false, image: '📊',
    content: `Comprendre la complexité algorithmique est essentiel pour tout développeur.\n\n**Bubble Sort** — O(n²) — simple mais lent sur grandes données.\n\n**Quick Sort** — O(n log n) en moyenne — très utilisé en pratique.\n\n**Merge Sort** — O(n log n) garanti — stable et prévisible.\n\n**Big O** mesure comment le temps d'exécution évolue avec la taille des données.` },
]

const categories = ['Tous', 'React', 'Python', 'Cybersécurité', 'DevOps', 'IA/ML', 'Algorithmique']

function downloadArticle(article) {
  try {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const margin = 40
    let cursorY = 60

    doc.setFontSize(18)
    doc.text(article.title, margin, cursorY)
    cursorY += 24

    doc.setFontSize(11)
    doc.text(`Catégorie : ${article.category}`, margin, cursorY)
    cursorY += 14
    doc.text(`Auteur : ${article.author}`, margin, cursorY)
    cursorY += 14
    doc.text(`Date : ${article.date}`, margin, cursorY)
    cursorY += 14
    doc.text(`Lecture : ${article.readTime}`, margin, cursorY)
    cursorY += 20

    doc.setLineWidth(0.5)
    doc.line(margin, cursorY, doc.internal.pageSize.width - margin, cursorY)
    cursorY += 16

    const plain = article.content.replace(/\*\*(.*?)\*\*/g, '$1')
    const lines = doc.splitTextToSize(plain, doc.internal.pageSize.width - margin * 2)
    doc.text(lines, margin, cursorY)

    const filename = `${article.title.replace(/[\s/&]+/g, '_')}.pdf`
    doc.save(filename)
  } catch (err) {
    const content = `${article.title}\n\n${article.content}`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${article.title.replace(/[\s/&]+/g, '_')}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

function ArticlePanel({ article, onClose, darkMode }) {
  const [fullscreen, setFullscreen] = useState(false)
  const text = darkMode ? 'text-white' : 'text-slate-900'
  const sub = darkMode ? 'text-gray-400' : 'text-slate-500'

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`overflow-y-auto transition-all duration-300 border ${fullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-2xl max-h-[85vh] rounded-2xl'} ${darkMode ? 'bg-[#10102E] border-purple-500/30' : 'bg-white border-purple-200'}`}>

        {/* Header */}
        <div className={`sticky top-0 border-b p-5 flex justify-between items-center ${darkMode ? 'bg-[#10102E] border-white/10' : 'bg-white border-slate-200'}`}>
          <div className="flex gap-2">
            <span className={`text-xs px-3 py-1 rounded-full ${article.categoryColor}`}>{article.category}</span>
            {article.hasPdf && <span className="text-xs bg-red-500/20 text-red-500 px-3 py-1 rounded-full">📄 PDF</span>}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => downloadArticle(article)}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${darkMode ? 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'}`}
            >
              📥 Télécharger
            </button>
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${darkMode ? 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'}`}
            >
              {fullscreen ? '⊡ Réduire' : '⛶ Plein écran'}
            </button>
            <button onClick={onClose} className={`text-xl px-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>✕</button>
          </div>
        </div>

        <div className="p-6">
          <div className={`h-40 rounded-2xl flex items-center justify-center text-6xl mb-6 ${darkMode ? 'bg-gradient-to-br from-purple-900 to-blue-900' : 'bg-gradient-to-br from-purple-200 to-blue-200'}`}>
            {article.image}
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${text}`}>{article.title}</h2>
          <div className={`flex gap-4 text-sm mb-6 ${sub}`}>
            <span>👤 {article.author}</span>
            <span>📅 {article.date}</span>
            <span>⏱ {article.readTime} de lecture</span>
          </div>
          <div className={`text-sm leading-relaxed whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>{article.content}</div>
          {article.hasPdf && (
            <button onClick={() => downloadArticle(article)} className="mt-8 w-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 py-3 rounded-xl text-sm font-medium hover:bg-cyan-500/20 transition-all">
              📥 Télécharger le PDF
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Articles({ darkMode }) {
  const [category, setCategory] = useState('Tous')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const text = darkMode ? 'text-white' : 'text-slate-900'
  const sub = darkMode ? 'text-gray-400' : 'text-slate-500'
  const card = darkMode ? 'bg-[#13133A] border-purple-500/20' : 'bg-white border-purple-200 shadow-sm'
  const inputBg = darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'

  const filtered = articles.filter(a => {
    const matchCat = category === 'Tous' || a.category === category
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="p-8">

      {selected && (
        <ArticlePanel article={selected} onClose={() => setSelected(null)} darkMode={darkMode} />
      )}

      <div className="relative mb-4">
        <span className={`absolute left-4 top-1/2 -translate-y-1/2 ${sub}`}>🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un article ou une technologie..."
          className={`w-full border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-purple-500 ${inputBg}`}
        />
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm transition-all ${
              category === cat ? 'bg-purple-600 text-white' : darkMode ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className={`text-center py-20 ${sub}`}>
          <p className="text-4xl mb-4">📭</p>
          <p>Aucun article trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(a => (
            <div
              key={a.id}
              onClick={() => setSelected(a)}
              className={`rounded-2xl overflow-hidden cursor-pointer hover:border-purple-500/50 hover:scale-[1.02] transition-all border ${card}`}
            >
              <div className={`h-32 flex items-center justify-center text-5xl relative ${darkMode ? 'bg-gradient-to-br from-purple-900 to-blue-900' : 'bg-gradient-to-br from-purple-200 to-blue-200'}`}>
                {a.image}
                {a.hasPdf && (
                  <span className="absolute top-2 right-2 text-xs bg-red-500/80 text-white px-2 py-0.5 rounded-full">
                    📄 PDF
                  </span>
                )}
              </div>

              <div className="p-4">
                <span className={`text-xs px-2 py-0.5 rounded-full ${a.categoryColor}`}>
                  {a.category}
                </span>
                <h3 className={`font-semibold text-sm mt-2 leading-snug ${text}`}>
                  {a.title}
                </h3>
                <p className={`text-xs mt-1 line-clamp-2 ${sub}`}>
                  {a.description}
                </p>
                <div className={`flex justify-between items-center mt-3 text-xs ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>
                  <span>{a.author}</span>
                  <span>⏱ {a.readTime}</span>
                </div>
                <button className={`mt-3 w-full py-2 rounded-xl text-xs transition-all ${darkMode ? 'bg-white/5 hover:bg-purple-600/20 text-gray-300 hover:text-white' : 'bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-700'}`}>
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