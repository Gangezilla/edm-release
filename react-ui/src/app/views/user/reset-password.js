import React from 'react';
import ResetPassword from '../../containers/reset-password';

function ResetPasswordRoute({ match }) {
  return (
    <div>
      <ResetPassword id={match.params.id}/>
    </div>
  );
}

export default ResetPasswordRoute;
