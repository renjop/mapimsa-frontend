import {ErrorMessage, Field, type FieldProps} from 'formik';
import React from 'react';

interface Option {
    value: string | number;
    label: string;
}

interface SelectFormFieldComponentProps {
    fieldName: string;
    options: Option[];
    visible?: boolean;
    disabled?: boolean;
    label: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectFormFieldComponent: React.FC<SelectFormFieldComponentProps> = (props) => {
    return (
        <tr className={props.visible ? '' : 'd-none'}>
            <td className={'col-12 col-md-6'}>
                <label htmlFor={props.fieldName}>{props.label}</label>
            </td>
            <td className={'col-12 col-md-6'}>
                <Field
                    name={props.fieldName}
                    id={props.fieldName}
                >
                    {({field, meta, form}: FieldProps) => (
                        <select
                            {...field}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                form.setFieldValue(field.name, e.target.value)
                                    .then(() => {
                                        if (props.onChange) {
                                            props.onChange(e);
                                        }
                                    })
                                    .catch(() => { /* empty */
                                    });

                            }}
                            disabled={props.disabled ?? false}
                            className={`form-control custom-select ${
                                meta.error
                                    ? 'is-invalid'
                                    : meta.touched && !meta.error
                                        ? 'is-valid'
                                        : ''
                            }`}>

                            <option value={''}>Seleccione una opción</option>
                            {props.options.map((option: Option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    )

                    }

                </Field>
                <ErrorMessage name={props.fieldName}>
                    {msg => <div className={'invalid-feedback'}>{msg}</div>}
                </ErrorMessage>
            </td>
        </tr>
    );
};

export default SelectFormFieldComponent;
