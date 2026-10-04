const TABS = [
  { id: 'learn', icon: '🏠', label: 'Learn' },
  { id: 'practice', icon: '🏋️', label: 'Practice' },
  { id: 'courses', icon: '🌍', label: 'Languages' },
  { id: 'leagues', icon: '🏆', label: 'Leagues' },
  { id: 'shop', icon: '🛍️', label: 'Shop' },
  { id: 'profile', icon: '🐾', label: 'Profile' },
];

export default function Nav({ tab, setTab }) {
  return (
    <nav className="nav">
      <div className="nav-brand brand">Kobe<span>Lingo</span></div>
      {TABS.map((t) => (
        <button key={t.id} className={`nav-item ${tab === t.id ? 'on' : ''}`} onClick={() => setTab(t.id)}>
          <span className="nav-icon">{t.icon}</span>
          <span className="nav-label">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
