import {fileURLToPath} from 'url';
import path, {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.dirname(__dirname);

export default rootDir;
