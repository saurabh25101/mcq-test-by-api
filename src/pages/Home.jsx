 import { Box, Button, Container, Typography } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { useNavigate } from "react-router-dom"; // ✅ correct import

export default function Home() {
  const navigate = useNavigate(); // ✅ useNavigate hook

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #1a237e, #4a148c)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Glow Circle 1 */}
      <Box
        sx={{
          position: "absolute",
          width: 280,
          height: 280,
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "50%",
          top: 50,
          left: 50,
          filter: "blur(60px)",
        }}
      />

      {/* Floating Glow Circle 2 */}
      <Box
        sx={{
          position: "absolute",
          width: 260,
          height: 260,
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "50%",
          bottom: 50,
          right: 50,
          filter: "blur(70px)",
        }}
      />

      <Container sx={{ zIndex: 10, textAlign: "center" }}>
        <PsychologyIcon sx={{ fontSize: 80 }} color="secondary" />
        <Typography
          variant="h2"
          sx={{
            fontWeight: "900",
            letterSpacing: "2px",
            mb: 2,
            textShadow: "0px 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          MindTest Quiz
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h6"
          sx={{
            maxWidth: 720,
            margin: "0 auto",
            opacity: 0.9,
            mb: 4,
            fontWeight: 400,
          }}
        >
          Boost your knowledge with interactive MCQ quizzes.  
          Challenge your mind and improve day by day.
        </Typography>

        {/* Start Quiz Button */}
        <Button
          variant="contained"
          size="large"
          sx={{
            background: "linear-gradient(45deg, #ff4081, #7c4dff)",
            padding: "12px 40px",
            borderRadius: "30px",
            fontSize: "18px",
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.4)",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.08)",
              boxShadow: "0px 6px 25px rgba(0,0,0,0.5)",
            },
          }}
          onClick={() => navigate("/quiz")}  //here for navigate on click
        >
          Start Quiz
        </Button>
      </Container>
    </Box>
  );
}
