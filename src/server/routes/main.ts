import { ServerRoute } from '@hapi/hapi';
import pageNotFoundHandler from './404';
import agl1Route from './agl1';

const routes: ServerRoute[] = [agl1Route];

export default [...routes, pageNotFoundHandler];
