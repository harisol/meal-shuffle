import { InputHTMLAttributes, ReactNode } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { ReactHookFormValidation } from '../../etc/cutom-types';

export default function InputRadio(props: TInputRadio) {
  const { register, errors, options, ...otherProps } = props;
  const validation: ReactHookFormValidation = {
    required: `please select ${props.name}`
  };

  return (
    <div className="radio-checkbox-container">
      <p className="radio-name">{props.name}</p>
      <div className="radio-checkbox-group">
        {options.map((v) => (
          <label key={`${props.name}-${Math.random()}`} htmlFor={`${props.name}-${v}`}>
            <input
              type="radio"
              {...otherProps}
              {...register(props.name, validation)}
              id={`${props.name}-${v}`}
              value={v}
            />
            {v}
          </label>
        ))}
      </div>
      {errors}
    </div>
  );
}

InputRadio.defaultProps = {
  errors: ''
};

interface CustomizedRadioProps
  // drop 'id' and 'value' props because they will be harcoded and overwritten in component
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'value'> {
  // change optional prop 'name' to required
  name: string;
}

interface TInputRadio extends CustomizedRadioProps {
  options: string[];
  register: UseFormRegister<FieldValues>;
  errors?: ReactNode;
}
