import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./PagesProvider";
import Main from "./pages/Main";
import PagesProvider from "./PagesProvider";
import './globalStyles/container.scss'
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import RequireAuth from "./hoc/RequireAuth";
import SearchResultsPage from "./pages/SearchResultPage/SearchResultsPage";
import SearchPage from "./pages/SearchPage/SearchPage"
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PagesProvider />}
        >
          <Route 
            path="/" 
            element={<MainPage />} />
          
          <Route 
            path="/authorization" 
            element={<AuthorizationPage />} />

          <Route path="search" element={
            <RequireAuth>
              <SearchPage />
            </RequireAuth>
          } />

          <Route path="searchResults" element={
            <RequireAuth>
              <SearchResultsPage />
            </RequireAuth>
          } />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
