import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Summary from "./components/Summary";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/str-dl-smry-rpt" element={<Summary />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
