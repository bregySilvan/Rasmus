
import * as _ from 'lodash';
import { Server } from './classes/server';
import { DEFAULT_PORT } from './prod-server.conf';

new Server().start(DEFAULT_PORT);

