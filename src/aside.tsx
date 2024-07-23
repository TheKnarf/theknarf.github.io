import React from 'react';

const Aside : React.FC<{
  children?: React.ReactNode
}> = ({ children }) =>
	<aside>
    <div>
      <div>
      { children }
      </div>
    </div>
	</aside>;

export default Aside;
