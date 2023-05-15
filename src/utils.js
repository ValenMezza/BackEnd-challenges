import {fileURLToPath} from 'url';
import { dirname } from 'path';

//dirname se utiliza siempre que se necesite una ruta en mi proyecto

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;