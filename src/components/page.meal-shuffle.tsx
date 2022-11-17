import { useCallback, useEffect, useState } from 'react';
import Admin from './Admin';
import { fetchMeal, IMeal } from '../services/meal.service';
import '../css/meal-shuffle.css';
import btnStyle from '../css/button.module.css';

export default function MealShuffle() {
  const [section, setSection] = useState('shuffle');
  const [meals, setMeals] = useState<IMeal[]>([]);

  const refreshMeal = useCallback(() => {
    fetchMeal().then((res) => {
      setMeals(res as IMeal[]);

      // eslint-disable-next-line no-console
      console.info('meal refreshed');
    });
  }, []);

  const handleChangeSection = useCallback((sect: string) => {
    setSection(sect);
  }, []);

  const showSection = () => {
    if (section === 'shuffle') {
      return <Random sectionChangeHandler={handleChangeSection} meals={meals} />;
    }
    if (section === 'catalog') return <Catalogue meals={meals} />;
    if (section === 'admin') return <Admin refreshMeal={refreshMeal} />;

    return <p>(Invalid Section)</p>;
  };

  useEffect(() => {
    refreshMeal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="meal-shuffle-page">
      <div className="title-box">
        <span onClick={() => handleChangeSection('shuffle')} aria-hidden="true">
          Random
        </span>{' '}
        <span onClick={() => handleChangeSection('catalog')} aria-hidden="true">
          Catalog
        </span>
      </div>
      {showSection()}
    </div>
  );
}

type CatalogueProps = {
  meals: IMeal[];
};
const Catalogue = (props: CatalogueProps) => (
  <div className="card catalog">
    {props.meals.map((v, i) => (
      <div key={`catalog-${i + 1}`} style={{ padding: '1rem' }}>
        <strong className="meal-title">{v.name}</strong>
        <br />
        <img alt="meal" src={v.imageUrl} />
      </div>
    ))}
  </div>
);

type RandomProps = {
  meals: IMeal[];
  sectionChangeHandler: (sect: string) => void;
};
const Random = (props: RandomProps) => {
  const [randomMeal, setRandomMeal] = useState<IMeal | undefined>();
  const shuffleMeal = () => {
    const list = [...props.meals];
    list.sort(() => Math.random() - 0.5);
    const timeout = 1 * 1000; // stop interval after this seconds

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * list.length);
      setRandomMeal(list[randomIndex]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
    }, timeout);
  };

  return (
    <div className="card random-meal">
      {randomMeal ? (
        <div>
          <strong className="meal-title">{randomMeal?.name}</strong>
          <br />
          <img alt="randomMeal" src={randomMeal?.imageUrl} />
          <br />
        </div>
      ) : (
        <div className="notice">
          <strong>
            Click shuffle to begi
            {/* The invisible admin button, LOL!! */}
            <span onClick={() => props.sectionChangeHandler('admin')} aria-hidden="true">
              n
            </span>
          </strong>
        </div>
      )}
      <button
        type="button"
        onClick={shuffleMeal}
        className={btnStyle.red}
        style={{ marginTop: '5px' }}>
        🗘 Shuffle
      </button>
    </div>
  );
};
