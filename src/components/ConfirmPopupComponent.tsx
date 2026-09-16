import React from 'react';
import { CButton, CCol, CContainer, CRow } from '@coreui/react';


interface Props {
  title: string;
  instructions: string;

  onCallback: (status: boolean) => void;
}

const ConfirmPopupComponent: React.FC<Props> = ({ title, instructions, onCallback }) => {
  return (
    <>
      <CContainer className={'p-0'}>
        <CRow className={'m-0'}>
          <CCol sm={12}
               className={'py-2 text-center bg-primary text-white'}>
            <h3>{title}</h3>
          </CCol>
          <CCol sm={12} className={'my-2'}>
            <CRow className={'px-2'}>
              <h4 className={'text-center w-100'}>{instructions}</h4>
            </CRow>
            <CRow>
              <CCol xs={{ offset: 4, span: 5 }}>
              <CButton color="danger" className={'me-2'} onClick={()=>{onCallback(true)}}>Aceptar</CButton>
              <CButton color="secondary" onClick={()=>{onCallback(false)}}>Cancelar</CButton>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default ConfirmPopupComponent;