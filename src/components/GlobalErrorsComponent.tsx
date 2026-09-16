import React from 'react';

interface GlobalErrorsComponentProps {
  isValid: boolean;
  errors: never;
}

interface ValidationErrors{
  [key: string]: string | ValidationErrors[] | ValidationErrors;
}

interface GroupedError {
  field: string;
  index?: number;
  messages: string[];
}

function groupErrors(errors: ValidationErrors): GroupedError[] {
  const result: GroupedError[] = [];


  for (const key in errors) {
    const value = errors[key];

    if(value === undefined || value === null) {
      continue;
    }
    if (typeof value === 'string') {
      // Simple field with one message
      result.push({ field: key, messages: [value] });
    } else if (Array.isArray(value)) {
      value.forEach((item, idx) => {
        if(item === undefined || item === null) {
          return;
        }
        // noinspection SuspiciousTypeOfGuard
        if (typeof item === 'string') {
          result.push({ field: key, index: idx, messages: [item] });
        } else {
          const messages: string[] = [];
          for (const subKey in item) {
            const subVal = item[subKey];
            if (typeof subVal === 'string') {
              messages.push(subVal);
            }
          }
          result.push({ field: key, index: idx, messages });
        }
      });
    } else if (typeof value === 'object') {
      result.push(...groupErrors(value));
    }
  }

  return result;
}

const GlobalErrorsComponent: React.FC<GlobalErrorsComponentProps> = ({ isValid, errors }) => {

  return <div
    className={`alert alert-danger ${isValid ? 'd-none' : 'd-block'}`}
    id={'global-errors'}
  >
    <div className={`${isValid ? 'is-valid' : 'is-invalid'}`} />
    <div className={'invalid-feedback'}>
      {
        groupErrors(errors)
          .map((error, i) => {
            if (error.index === undefined) {
              return <div key={`error_list_${i}`}>
                {error.messages[0]}
              </div>;
            } else {
              return <div key={`error_list_${i}`}>
                <div>Correlativo: {error.index + 1}</div>
                <ul>
                  {error.messages.map((item, idx) =>
                    <li key={`error_${idx}`}>
                      {item}
                    </li>
                  )}
                </ul>
              </div>;
            }
          })
      }
    </div>
  </div>;
};

export default GlobalErrorsComponent;
