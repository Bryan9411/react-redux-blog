import { HashRouter, Route, Switch } from 'react-router-dom';
import {
  HomePage,
  ArticlesPage,
  SingleArticlePage,
  CategoryPage,
  AuthorPage,
} from './pages';
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/articlesPage" component={ArticlesPage} />
        <Route path="/article/:id" component={SingleArticlePage} />
        <Route path="/category/:categoryName" component={CategoryPage} />
        <Route path="/Author/:userId" component={AuthorPage} />
      </Switch>
    </HashRouter>
  );
}

export default App;
