import { Navigate } from 'react-router-dom';
import React from 'react';
import { useSearchParams } from 'react-router';



const RedirectContainer: React.FC = () => {
  const [searchParams] = useSearchParams();
  return <Navigate to={{
    pathname: `${searchParams.get('to')}`,
  }} replace={true} />;
};
export default RedirectContainer;