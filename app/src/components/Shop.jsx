import { useStore, MAX_HEARTS, HEART_REFILL_COST } from '../lib/store.jsx';

export default function Shop() {
  const { state, dispatch } = useStore();
  const items = [
    {
      icon: '❤️', name: 'Refill hearts', desc: `Get full hearts so you can keep learning. (${state.hearts}/${MAX_HEARTS})`,
      cost: HEART_REFILL_COST, disabled: state.hearts >= MAX_HEARTS, action: () => dispatch({ type: 'refillHearts' }),
    },
    {
      icon: '🧊', name: 'Streak freeze', desc: `Keeps your streak if you miss a day. (${state.streakFreezes}/2 equipped)`,
      cost: 200, disabled: state.streakFreezes >= 2, action: () => dispatch({ type: 'buyFreeze' }),
    },
  ];
  return (
    <div className="page">
      <h1>Shop</h1>
      <p className="muted">You have 💎 {state.gems} gems. Earn more by finishing lessons.</p>
      <div className="shop-list">
        {items.map((it) => (
          <div key={it.name} className="shop-item">
            <span className="shop-icon">{it.icon}</span>
            <div className="shop-text"><strong>{it.name}</strong><span className="muted">{it.desc}</span></div>
            <button className="btn btn-secondary" disabled={it.disabled || state.gems < it.cost} onClick={it.action}>💎 {it.cost}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
