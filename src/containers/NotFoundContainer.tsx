import { useNavigate } from 'react-router';
import React from 'react';
import { CButton } from '@coreui/react';

const NotFoundContainer: React.FC = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    void navigate(-1);
  };

  return <div className={'text-center mt-5'}>
    <div className={'error mx-auto'} data-text={'404'}>
      <p className={'m-0'}>404</p>
    </div>
    <p className="text-dark mb-5 lead">Página no encontrada, revise la dirección e intente de nuevo</p>
    <CButton color="link"
             onClick={handleGoBack}>Regresar</CButton>
  </div>;
};

export default NotFoundContainer;
