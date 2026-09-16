import React from 'react';

interface AuditComponentProps {
  createdBy?: string;
  createdAt?: string;
  modifiedBy?: string;
  modifiedAt?: string;
}

const AuditComponent: React.FC<AuditComponentProps> = ({ createdBy, createdAt, modifiedBy, modifiedAt }) => {
  let createdStr = '';
  if (createdBy && createdAt) {
    createdStr = `Creado por: ${createdBy} a las ${createdAt}`;
  }
  let modifiedStr = '';
  if (modifiedBy && modifiedAt) {
    modifiedStr = `Modificado por: ${modifiedBy} a las ${modifiedAt}`;
  }
  return (
    <>
      {createdStr && (
        <>
          <span>{createdStr}</span>
          <br />
        </>
      )}
      {modifiedStr && (
        <>
          <span>{modifiedStr}</span>
          <br />
          <br />
        </>
      )}
    </>
  );
};

export default AuditComponent;
