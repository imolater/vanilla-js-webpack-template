const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://${ HOST }:${ PORT }`;
const API_URL = process.env.API_URL || BASE_URL;
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

module.exports = {
    HOST,
    PORT,
    BASE_URL,
    API_URL,
    PUBLIC_PATH,
};