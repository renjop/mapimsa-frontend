import React from 'react';

interface ActiveRecordComponentProps {
  active: boolean;
}

const ActiveRecordComponent: React.FC<ActiveRecordComponentProps> = ({ active }) => {
  return active ? <i className={'fas fa-check'} /> : <i className={'fas fa-times'} />;
};

export default ActiveRecordComponent;
