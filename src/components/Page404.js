import React from 'react';
import {Link} from 'react-router-dom';

const Page404 = props => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <Link to='/'>Click here to go back</Link>
    </div>
  )
}

export default Page404;