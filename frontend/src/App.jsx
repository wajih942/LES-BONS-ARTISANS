import "./App.css";
import MainNavigation from "./components/navigation/MainNavigation";
import LoginPage from "./pages/LoginPage";
import ProductsGrid from "./pages/ProductsGrid";
import SignupPage from "./pages/SignupPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import ProductsPage from "./pages/ProductsPage";
import MyProductsPage from "./pages/MyProductsPage";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainNavigation />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/my-products" element={<MyProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
