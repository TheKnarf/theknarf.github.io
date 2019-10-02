import { dom } from 'isomorphic-jsx';
import Head from './head';

export default ({children}) => <html>
	<Head />
 	<body>
		{ children }
	</body>
</html>
