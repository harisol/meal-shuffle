import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReactHookFormValidation } from '../../etc/cutom-types';

/* eslint-disable no-console */
export default function ComplexForm() {
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: unknown) => setShowModal(true);
  const validateAddress = (val: string) => {
    const minimumWords = 3;
    return (
      val.trim().split(' ').length >= minimumWords ||
      `address should consist of minimum ${minimumWords} words`
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="input-block">
        <label htmlFor="name">
          Name
          <input {...register('name', inputNameValidation)} />
          <small className="field-error">{errors.name?.message as string}</small>
        </label>

        <label htmlFor="height">
          Body Height
          <input type="number" {...register('height', inputBodyHeightValidation)} />
          <small className="field-error">{errors.height?.message as string}</small>
        </label>

        <label htmlFor="gender">
          Gender
          <select {...register('gender', inputGenderValidation)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label htmlFor="address">
          Address
          <input {...register('address', { validate: validateAddress })} />
          <small className="field-error">{errors.address?.message as string}</small>
        </label>
        <button type="submit" style={{ display: 'block', marginTop: '15px' }}>
          Submit
        </button>
      </form>
      <Modal type="ok" show={showModal} toggleModal={setShowModal} message="Form Submited!" />
    </div>
  );
}

type ModalProps = {
  type: 'ok' | 'confirm';
  show: boolean;
  message: string;
  toggleModal: (val: boolean) => void;
};
const Modal = (props: ModalProps) => {
  if (props.type === 'ok') {
    return (
      <div className={`modal-container ${props.show ? 'show' : 'hide'}`}>
        <div className="modal-body">
          <div className="modal-content">{props.message}</div>
          <button type="button" onClick={() => props.toggleModal(false)} className="modal-button">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`modal-container ${props.show ? 'show' : 'hide'}`}>
      <div className="modal-body">
        <div className="modal-content">
          <p>{props.message}</p>
          <button type="button">Yes</button> <button type="button">No</button>
        </div>
        <button type="button" onClick={() => props.toggleModal(false)} className="modal-button">
          Close
        </button>
      </div>
    </div>
  );
};

const inputNameValidation: ReactHookFormValidation = {
  required: {
    value: true,
    message: 'required'
  },
  minLength: {
    value: 3,
    message: 'minimum 3 characters!'
  },
  onChange: (event: ChangeEvent<HTMLInputElement>) =>
    console.log('current name', event.target.value)
};

const inputGenderValidation: ReactHookFormValidation = {
  required: true,
  onChange: (event: ChangeEvent<HTMLSelectElement>) =>
    console.log('current gender', event.target.value)
};

const inputBodyHeightValidation: ReactHookFormValidation = {
  required: {
    value: true,
    message: 'required'
  },
  min: {
    value: 100,
    message: 'too short'
  },
  max: {
    value: 250,
    message: 'invalid height'
  }
};
