import Home from 'component/spa/ssr/components/home';
import About from 'component/spa/ssr/components/about';

const NotFound = () => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = 404;
    }
    return (
      <div>
        <h1>404 : Not Found</h1>
      </div>
    );
  }}
  />
);
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: Home
  },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
