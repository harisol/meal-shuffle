import { useState, FormEvent, useRef, LegacyRef } from 'react';
import { addMeal, IMeal } from '../services/meal.service';

type Props = {
  refreshMeal: () => void;
};

function Admin(props: Props) {
  const [formData, setFormData] = useState<IMeal>(defaultFormValue);
  const [loggedIn, setLoggedIn] = useState(false);
  const password = useRef<HTMLInputElement | null>(null);

  const isPasswordMatch = () => {
    password?.current?.value === adminKey && setLoggedIn(true);
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = (await addMeal(formData)) as boolean;

    if (result !== true) {
      // eslint-disable-next-line no-alert
      alert(result);
      return;
    }

    setFormData(defaultFormValue);
    props.refreshMeal();

    // eslint-disable-next-line no-alert
    alert('Success add meal!');
  };

  return (
    <div className="card">
      <h1>Add New Meal</h1>
      {!loggedIn ? (
        <LoginForm propRef={password} changeHandler={isPasswordMatch} />
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
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

type LoginFormProps = {
  propRef: LegacyRef<HTMLInputElement> | null;
  changeHandler: () => void;
};
const LoginForm = (props: LoginFormProps) => {
  return (
    <input
      type="password"
      placeholder="password"
      ref={props.propRef}
      className="input-block"
      onChange={props.changeHandler}
    />
  );
};

const defaultFormValue = {
  name: '',
  imageUrl: ''
};

const adminKey = '1112';

export default Admin;
