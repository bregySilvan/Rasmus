import * as express from 'express';
import { CustomRouter } from './router';

var app = express();
var customRouter: CustomRouter = new CustomRouter(app);
app.listen(5001, () => {
    console.log('listening on port 5001');
})