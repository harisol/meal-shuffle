import { useState, FormEvent, useRef } from 'react';
import { addMeal, IMeal } from '../services/meal.service';

type Props = {
  refreshMeal: () => void;
};

function Admin({ refreshMeal }: Props) {
  const [formData, setFormData] = useState<IMeal>(defaultFormValue);
  const [loggedIn, setLoggedIn] = useState(false);
  const password = useRef<HTMLInputElement | null>(null);

  const isPasswordMatch = () => {
    password?.current?.value === adminKey && setLoggedIn(true);
  };

  const LoginForm = () => {
    return (
      <input
        type="password"
        placeholder="password"
        ref={password}
        className="input-block"
        onChange={isPasswordMatch}
      />
    );
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await addMeal(formData);

    if (result !== true) {
      alert(result);
      return;
    }

    setFormData(defaultFormValue);
    refreshMeal();
    alert('Success add meal!');
  };

  return (
    <div className="card">
      <h1>Add New Meal</h1>
      {!loggedIn ? (
        <LoginForm />
      ) : (
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Meal name"
            value={formData.name}
            className="input-block"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image url"
            value={formData.imageUrl}
            className="input-block"
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

const defaultFormValue = {
  name: '',
  imageUrl: '',
};

const adminKey = '1112';

export default Admin;
