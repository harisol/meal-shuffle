import { useEffect, useState } from 'react';
import Admin from './Admin';
import { fetchMeal, IMeal } from '../services/meal.service';

import '../css/meal-shuffle.css';
import btnStyle from '../css/button.module.css';

export default function MealShuffle() {
  const [section, setSection] = useState('shuffle');
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [randomMeal, setRandomMeal] = useState<IMeal | null>(null);

  useEffect(() => {
    refreshMeal();
  }, []);

  const refreshMeal = () => {
    fetchMeal().then((res) => {
      setMeals(res as IMeal[]);
      console.info('meal refreshed');
    });
  };

  const Catalogue = () => (
    <div className="card catalog">
      {meals.map((v, i) => (
        <div key={`catalog-${i + 1}`} style={{ padding: '1rem' }}>
          <strong className="meal-title">{v.name}</strong>
          <br />
          <img src={v.imageUrl} />
        </div>
      ))}
    </div>
  );

  const Random = () => {
    return (
      <div className="card random-meal">
        {randomMeal ? (
          <div>
            <strong className="meal-title">{randomMeal?.name}</strong>
            <br />
            <img src={randomMeal?.imageUrl} />
            <br />
          </div>
        ) : (
          <div className="notice">
            <strong>
              Click shuffle to begi
              {/* The invisible admin button, LOL!! */}
              <span onClick={() => setSection('admin')}>n</span>
            </strong>
          </div>
        )}
        <button
          onClick={shuffleMeal}
          className={btnStyle.red}
          style={{ marginTop: '5px' }}
        >
          🗘 Shuffle
        </button>
      </div>
    );
  };

  const showSection = () => {
    if (section === 'catalog') return <Catalogue />;
    if (section === 'shuffle') return <Random />;
    if (section === 'admin') return <Admin refreshMeal={refreshMeal} />;
  };

  const shuffleMeal = () => {
    const list = [...meals];
    list.sort(() => Math.random() - 0.5);
    const timeout = 1 * 1000; // stop interval after this seconds

    let interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * list.length);
      setRandomMeal(list[randomIndex]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
    }, timeout);
  };

  return (
    <div className="meal-shuffle-page">
      <div className="title-box">
        <span onClick={() => setSection('shuffle')}>Random</span>{' '}
        <span onClick={() => setSection('catalog')}>Catalog</span>
      </div>
      {showSection()}
    </div>
  );
}
