import { dom } from 'isomorphic-jsx';
import Head from './head';
import Sidebar from './sidebar';

//<!DOCTYPE html>
export default ({children}) => <html>
	<Head />
 	<body>
		<Sidebar />
		<div class="content">{ children }</div>
	</body>
</html>
