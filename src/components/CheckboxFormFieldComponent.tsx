import { ErrorMessage, FastField, type FieldProps } from 'formik';
import React from 'react';

interface CheckboxFormFieldComponentProps {
  fieldName: string;
  label: string;
}

const CheckboxFormFieldComponent: React.FC<CheckboxFormFieldComponentProps> = (props) => {
  return (
    <tr>
      <td className={'col-12 col-md-6'}>
        <label htmlFor={props.fieldName}>{props.label}</label>
      </td>
      <td className={'col-12 col-md-6'}>
        <FastField name={props.fieldName}>
          {({ field, meta }: FieldProps) => (
            <input
              {...field}
              type={'checkbox'}
              checked={field.value === true}
              className={`form-check-input ${
                meta.touched && meta.error
                  ? 'is-invalid'
                  : meta.touched && !meta.error
                    ? 'is-valid'
                    : ''
              }`}
            />
          )}
        </FastField>
        <ErrorMessage name={props.fieldName}>
          {msg => <div className={'invalid-feedback'}>{msg}</div>}
        </ErrorMessage>
      </td>

    </tr>
  );
};

export default CheckboxFormFieldComponent;