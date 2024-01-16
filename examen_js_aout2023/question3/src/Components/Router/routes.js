import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import QueryPage from '../Pages/QueriePage';
import ManagePage from '../Pages/ManageQuere';


const routes = {
  '/': HomePage,
  '/new': NewPage,
  '/queries/create': QueryPage,
  '/queries': ManagePage,
};

export default routes;
