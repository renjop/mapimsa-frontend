import React from 'react';
import { CButton } from '@coreui/react';


const ForbiddenComponent: React.FC = () => {
  return (
    <div className={'text-center mt-5'}>
      <div className={'error mx-auto'} data-text={'403'}>
        <p className={'m-0'}>403</p>
      </div>
      <p className="text-dark mb-5 lead">
        No tiene permisos para acceder a esta página, favor comuníquese con su administrador. <br />
        <CButton color={'link'} onClick={() => window.history.back()}>
          Regresar
        </CButton>
      </p>
    </div>
  );
};

export default ForbiddenComponent;
