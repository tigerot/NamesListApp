import NameWrapperForm from './components/NameWrapperForm';
import { ButtonWrapper } from './components/ButtonWrapper';
import './App.css';
import { Routes, Route, Link, NavLink } from "react-router-dom";
import {Provider} from "react-redux";
import {ToastProvider} from "react-toast-notifications";
import {store} from "./actions/NameListStore"
import EditNameForm from './components/EditNameForm';

function App() {
  return (
      <Provider store={store}>
          <ToastProvider autoDismiss={true}>
            <Routes>
                <Route path="/"  element={<div className="App"><EditNameForm /></div>} />
                <Route path="/buttons" element={<div className="App"><ButtonWrapper /></div>} />
                </Routes>
            </ToastProvider>
            </Provider>
  );
}

/*<Routes>
        <Route path="/"  element={<div className="App"><NameWrapper /></div>} />
        <Route path="/buttons" element={<div className="App"><ButtonWrapper /></div>} />
</Routes>*/

export default App;