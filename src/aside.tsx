import React from 'react';
import css from './app.module.css';

const Aside : React.FC = ({ children }) =>
	<aside>
    <div>
      <div>
      { children }
      </div>
    </div>
	</aside>;

export default Aside;
