#!/usr/bin/env node

const commander = require('commander'),
		program = new commander.Command();

program.version('0.0.1')
       .description('RavenDesk static site generator');

require('./command/init')(program);
require('./command/build')(program);
require('./command/dev')(program);
require('./command/workspaces')(program);

program.parse(process.argv);

if( process.argv.length < 3 )
	return program.outputHelp();
