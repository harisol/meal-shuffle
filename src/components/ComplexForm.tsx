import { ChangeEvent, useEffect, useState } from 'react';
import { FieldValues, useForm, UseFormSetValue } from 'react-hook-form';
import { ReactHookFormValidation } from '../../etc/cutom-types';
import { saveUser, uploadPhotoFile } from '../services/user.service';
import InputRadio from './InputRadio';

/* eslint-disable no-console */
export default function ComplexForm() {
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    // save photo to file storage
    if (data.photoFile.length) {
      const [uploadedFile]: FileList = data.photoFile;
      try {
        const uploadResult = await uploadPhotoFile(uploadedFile);
        console.info('photo file uploaded!', uploadResult.ref.fullPath);
      } catch (e) {
        console.error(`Error when uploading photo;`, e instanceof Error ? e.message : e);
        setShowModalError(true);

        return;
      }
    }

    // save user to firestore
    try {
      const userPayload = { ...data };
      delete userPayload.photoFile;

      const docRef = await saveUser(userPayload);
      console.info('Document written with ID:', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e instanceof Error ? e.message : e);
      setShowModalError(true);

      return;
    }

    setShowModalSuccess(true);
    reset();
  };

  return (
    <>
      <div
        style={{ textAlign: 'right', fontSize: '8pt', marginBottom: '10px', marginTop: '-40px' }}>
        <button
          type="button"
          style={{ backgroundColor: 'aqua' }}
          onClick={() => showExampleValue(setValue)}>
          Example Value
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="input-block">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div id="left-side">
            <label htmlFor="name">
              Name
              <input id="name" {...register('name', inputNameValidation)} />
              <small className="field-error">{errors.name?.message as string}</small>
            </label>
            <label htmlFor="email">
              Email
              <input id="email" {...register('email', inputEmailValidation)} />
              <small className="field-error">{errors.email?.message as string}</small>
            </label>
            <label htmlFor="blood-type">
              Blood Type
              <select id="blood-type" {...register('bloodType', inputBloodTypeValidation)}>
                <option value="">[Select Blood Type]</option>
                <option value="a">A</option>
                <option value="o">O</option>
                <option value="ab">AB</option>
              </select>
              <small className="field-error">{errors.bloodType?.message as string}</small>
            </label>
            <div className="radio-checkbox-container">
              <p className="select-name">Interest in</p>
              <div className="radio-checkbox-group">
                <label htmlFor="interest-1">
                  <input type="checkbox" id="interest-1" {...register('interests')} value="sport" />
                  Sport
                </label>
                <label htmlFor="interest-2">
                  <input type="checkbox" id="interest-2" {...register('interests')} value="game" />
                  Game
                </label>
              </div>
            </div>
          </div>
          <div id="right-side">
            <InputRadio
              register={register}
              name="gender"
              options={['male', 'female']}
              errors={<small className="field-error">{errors?.gender?.message as string}</small>}
            />
            <label htmlFor="weight">
              Body Weight (Kg)
              <input type="number" id="weight" {...register('weight', inputBodyWeightValidation)} />
              <small className="field-error">{errors.weight?.message as string}</small>
            </label>
            <label htmlFor="height">
              Body Height (Cm)
              <input type="number" id="height" {...register('height', inputBodyHeightValidation)} />
              <small className="field-error">{errors.height?.message as string}</small>
            </label>
            <label htmlFor="photo-file">
              Upload Photo
              <input
                type="file"
                id="photo-file"
                {...register('photoFile', inputPhotoFileValidation)}
              />
              <small className="field-error">{errors.photoFile?.message as string}</small>
            </label>
          </div>
        </div>
        <label htmlFor="address">
          Address
          <textarea {...register('address', inputAddressValidation)} rows={3} />
          <small className="field-error">{errors.address?.message as string}</small>
        </label>
        <button type="submit" style={{ display: 'block', marginTop: '15px' }}>
          Submit
        </button>
      </form>
      <Modal
        type="ok"
        show={showModalSuccess}
        toggleModal={setShowModalSuccess}
        message="Form Submited!"
      />
      <Modal
        type="ok"
        show={showModalError}
        toggleModal={setShowModalError}
        message="Something wrong!"
      />
    </>
  );
}

type ModalProps = {
  type: 'ok' | 'confirm';
  show: boolean;
  message: string;
  toggleModal: (val: boolean) => void;
};
const Modal = (props: ModalProps) => {
  useEffect(() => {
    // disable scroll
    document.body.style.overflow = props.show ? 'hidden' : 'auto';
  }, [props.show]);

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
  required: 'required field',
  minLength: {
    value: 3,
    message: 'minimum 3 characters!'
  },
  onChange: (event: ChangeEvent<HTMLInputElement>) =>
    console.log('current name', event.target.value)
};

const inputEmailValidation: ReactHookFormValidation = {
  required: 'required field',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'invalid email address'
  }
};

const inputBloodTypeValidation: ReactHookFormValidation = {
  required: 'required field'
};

const inputBodyHeightValidation: ReactHookFormValidation = {
  required: 'required field',
  min: {
    value: 100,
    message: 'too short'
  },
  max: {
    value: 250,
    message: 'invalid height'
  }
};

const inputBodyWeightValidation: ReactHookFormValidation = {
  required: 'required field',
  min: {
    value: 40,
    message: 'too light'
  },
  max: {
    value: 200,
    message: 'invalid weight'
  }
};

const inputAddressValidation: ReactHookFormValidation = {
  validate: (val: string) => {
    const minimumWords = 3;
    return (
      val.trim().split(' ').length >= minimumWords ||
      `address should consist of minimum ${minimumWords} words`
    );
  }
};
const inputPhotoFileValidation: ReactHookFormValidation = {
  validate: (file: FileList) => {
    const maxSize = 1000; // kilobytes
    if (!file.length) {
      return true;
    }

    const [{ size, type }] = file;
    if (!type.includes('image')) {
      return `only accept photo file`;
    }

    if (size > maxSize * 1000) {
      return `max size is ${maxSize}kb`;
    }

    return true;
  }
};

const showExampleValue = (valueChanger: UseFormSetValue<FieldValues>) => {
  // eslint-disable-next-line no-alert
  if (!window.confirm('Your changes will be lost, continue?')) {
    return;
  }

  valueChanger('name', 'Haris');
  valueChanger('gender', 'male');
  valueChanger('email', 'em@il.com');
  valueChanger('weight', 60);
  valueChanger('height', 160);
  valueChanger('bloodType', 'ab');
  valueChanger('interests', ['game', 'sport']);
  valueChanger('address', 'Jalan jalan ke kota tua cakep');
};
