import { ErrorMessage, Field, type FieldProps } from 'formik';
import React from 'react';
import { CButton } from '@coreui/react';


interface FormFileFieldComponentProps {
  fieldName: string;
  preview?: string;
  setTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  fileUrl?: string;
  max_size_helper?: string;
  label: string;
}

const FormFileFieldComponent: React.FC<FormFileFieldComponentProps> = (props) => {

  return (
    <tr>
      <td className={'col-12 col-md-6'}>
        <label htmlFor={props.fieldName}>{props.label}</label>
      </td>
      <td className={'col-12 col-md-6'}>
        {props.preview && (
          <img src={props.preview} alt={`Imagen ${props.fieldName}`} className={'w-100'} />
        )}
        <Field name={props.fieldName}>
          {({ field, meta }: FieldProps) => (
            <input
              {...field}
              type={'file'}
              name={props.fieldName}
              className={`form-control ${
                meta.touched && meta.error
                  ? 'is-invalid'
                  : meta.touched && !meta.error
                    ? 'is-valid'
                    : ''
              }`}
              onChange={(event) => {
                props.setTouched(props.fieldName);
                props.setFieldValue(props.fieldName, event.currentTarget.files?.[0]);
              }}
              id={props.fieldName}
            />
          )}
        </Field>
        {props.fileUrl && (
          <CButton
            href={props.fileUrl}
            className={'btn-primary text-white'}
            color={'link'}
            rel={'noreferrer'}
            target={'_blank'}
          >
            <i className={'fa fa-download'} /> &nbsp;Descargar
          </CButton>
        )}
        <div className={'form-text text-muted'}>{props.max_size_helper}</div>
        <ErrorMessage name={props.fieldName}>
          {msg => <div className={'invalid-feedback'}>{msg}</div>}
        </ErrorMessage>
      </td>
    </tr>
  );
};

export default FormFileFieldComponent;
