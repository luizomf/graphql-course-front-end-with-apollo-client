import { Route, Switch } from 'react-router-dom';
import { Page404 } from 'page-templates/Page404';
import { Home } from 'page-templates/Home';
import { Login } from 'page-templates/Login';
import { Register } from 'page-templates/Register';
import { PostDetails } from 'page-templates/PostDetails';
import { PostEditor } from '../../page-templates/PostEditor';
import { PrivateRoute } from '../PrivateRoute';

export const DefaultRoutes = () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact>
        <Home />
      </PrivateRoute>

      <PrivateRoute path="/post/create" exact>
        <PostEditor />
      </PrivateRoute>

      <PrivateRoute path="/post/:id" exact>
        <PostDetails />
      </PrivateRoute>

      <PrivateRoute path="/post/:id/edit" exact>
        <PostEditor />
      </PrivateRoute>

      <Route component={Login} path="/login" exact />
      <Route component={Register} path="/register" exact />

      <Route component={Page404} />
    </Switch>
  );
};
