/**
 * @overview
 * Read and export private key and certificate for HTTP/2.
 */

 import * as fs from 'fs';

 const PATH_TO_PRIVATE_KEY = process.env.PATH_TO_PRIVATE_KEY;
 const PATH_TO_CERT = process.env.PATH_TO_CERT;

 export default {
   key: fs.readFileSync(PATH_TO_PRIVATE_KEY),
   cert: fs.readFileSync(PATH_TO_CERT),
 };
