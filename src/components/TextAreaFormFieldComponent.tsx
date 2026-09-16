import { ErrorMessage, FastField, type FieldProps } from 'formik';
import React from 'react';


interface TextAreaFormFieldComponentProps {
  fieldName: string;
  disabled?: boolean;
  label: string;
}

const TextAreaFormFieldComponent: React.FC<TextAreaFormFieldComponentProps> = (props) => {


  return (
    <tr>
      <td className={'col-12 col-md-6'}>
        <label htmlFor={props.fieldName}>{props.label}</label>
      </td>
      <td className={'col-12 col-md-6'}>
        <FastField name={props.fieldName}
                   as={'textarea'}>
          {({ field, meta }: FieldProps) => (
            <textarea
              {...field}
              rows={3}
              name={props.fieldName}
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

export default TextAreaFormFieldComponent;
