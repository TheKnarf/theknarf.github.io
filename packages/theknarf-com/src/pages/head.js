import { dom } from 'isomorphic-jsx';
import '../css/main.css';
import { page } from '../config.js';

export default () => <head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<title>{ page.title }</title>
	<meta name="description" content={page.description}/>

	{/* Stylesheets */}
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"/>
	<link rel="stylesheet" href="main.css" />
	
	{/* RSS */}
</head>
