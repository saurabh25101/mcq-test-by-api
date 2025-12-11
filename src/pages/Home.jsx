import PsychologyIcon from "@mui/icons-material/Psychology";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <Container maxWidth="sm" className="home-content">
        <div className="logo">
          <PsychologyIcon />
        </div>

        <Typography variant="h2" className="title">
          MindTest Quiz
        </Typography>

        <Typography variant="h6" className="subtitle">
          Challenge your knowledge with beautiful interactive quizzes. Enhance
          your skills every single day.
        </Typography>

        <Button
          variant="contained"
          className="start-btn"
          onClick={() => navigate("/quiz")}
        >
          Start Quiz
        </Button>
      </Container>
    </div>
  );
}
