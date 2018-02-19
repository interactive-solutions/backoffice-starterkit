import { addAuthenticationAPI } from './api-endpoints/authentication';
import { addUserAPI } from './api-endpoints/user';

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

addAuthenticationAPI(app);
addUserAPI(app);

app.listen(3000);

// const server = http.createServer(app);     <-- ?
// server.listen(port);                       <-- ?
// server.on('error', onError);               <-- ?
// server.on('listening', onListening);       <-- ?
