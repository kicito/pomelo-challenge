import { Route } from '../../../types/typings';
import pageNotFoundHandler from './404';
import agl1Route from './agl1';
import gitHubRoute from './github';
import staticRoute from './static';
const routes: Route[] = [agl1Route, gitHubRoute, staticRoute];

export default [...routes, pageNotFoundHandler];
