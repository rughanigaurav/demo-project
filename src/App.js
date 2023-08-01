import "./App.css";
import RoutesList from "./routes";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./helpers/i18n";
import store from "./store";

const App = () => {
  const basename = document.querySelector('base')?.getAttribute('href') ?? '/'

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <BrowserRouter basename={basename}>
          <RoutesList />
        </BrowserRouter>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
