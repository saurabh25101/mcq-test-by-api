 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
 
import Home from "./pages/Home";
import QuizPage from "./pages/quiz/Quiz";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/quiz" element={<QuizPage/>} />
      </Routes>
    </Router>
  );
}
