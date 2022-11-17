import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

export type ReactHookFormValidation = RegisterOptions<FieldValues, FieldPath<FieldValues>>;
