import React from 'react';
import { CButton } from '@coreui/react';


const GeneralErrorComponent: React.FC = () => {
  return (
    <div className={'text-center mt-5'}>
      <div className={'error mx-auto'} data-text={'500'}>
        <p className={'m-0'}>500</p>
      </div>
      <p className="text-dark mb-5 lead">
        Lo sentimos ha ocurrido un error inesperado. Por favor intente nuevamente.
        <br />
        <CButton color={'link'} onClick={() => window.history.back()}>
          Regresar
        </CButton>
      </p>
    </div>
  );
};

export default GeneralErrorComponent;
