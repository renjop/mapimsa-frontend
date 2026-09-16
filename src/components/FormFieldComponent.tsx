import { ErrorMessage, FastField, type FieldProps } from 'formik';
import React from 'react';

type FieldTypes = 'text' | 'number' | 'tel' | 'checkbox' | 'date';

interface FormFieldComponentProps {
  fieldName: string;
  disabled?: boolean;
  steps?: number;
  min?: number;
  label: string;
  type: FieldTypes;
  visible?: boolean;
}

const FormFieldComponent: React.FC<FormFieldComponentProps> = (props) => {
  let shouldShow = true;
  if(props.visible !== undefined){
    shouldShow = props.visible;
  }
  return (
    <tr className={`${!shouldShow?"d-none":""}`}>
      <td className={'col-12 col-md-6'}>
        <label htmlFor={props.fieldName}>{props.label}</label>
      </td>
      <td className={'col-12 col-md-6'}>
        <FastField name={props.fieldName}>
          {({ field, meta }: FieldProps) => (
            <input {...field}
                   {...{
                     min: props.min,
                     step: props.steps
                   }}
                   type={props.type}
                   className={`form-control ${meta.error != null ? `is-invalid` : `is-valid`}`}
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

export default FormFieldComponent;
