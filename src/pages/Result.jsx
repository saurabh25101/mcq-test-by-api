 // src/pages/Result.jsx
import { Box, Card, CardContent, Typography, Button, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import DownloadIcon from "@mui/icons-material/Download";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { quizData = [], answers = {}, totalQuestions = 0 } = location.state || {};

  // compute stats
  const attemptedCount = Object.keys(answers).filter(
    (k) => answers[k] !== null && answers[k] !== undefined
  ).length;
  const skippedCount = totalQuestions - attemptedCount;
  let correctCount = 0;
  let wrongCount = 0;

  quizData.forEach((q, idx) => {
    const userAns = answers[idx];
    if (userAns === undefined || userAns === null) return;
    if (userAns === q.correct_answer) correctCount += 1;
    else wrongCount += 1;
  });

  const score = correctCount * 10;
  const totalPossible = totalQuestions * 10;

  // --- PDF download ---
   // 1. HTML entities decode karne ka function
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// 2. PDF download function
const downloadPDF = () => {
  const doc = new jsPDF();
  let y = 10;

  doc.setFontSize(12);

  // Title
  doc.text(" Quiz Results", 10, y);
  y += 10;

  // Stats
  doc.text(`Total Questions: ${totalQuestions}`, 10, y); y += 7;
  doc.text(`Attempted: ${attemptedCount}`, 10, y); y += 7;
  doc.text(`Skipped: ${skippedCount}`, 10, y); y += 7;
  doc.text(`Correct: ${correctCount}`, 10, y); y += 7;
  doc.text(`Wrong: ${wrongCount}`, 10, y); y += 7;
  doc.text(`Score: ${score} / ${totalPossible}`, 10, y); y += 10;

  doc.text("Details:", 10, y); y += 7;

  // Question-wise details
  quizData.forEach((q, idx) => {
    const userAns = answers[idx] ? decodeHTML(answers[idx]) : "Not Answered";
    const questionText = decodeHTML(q.question);
    const correctAns = decodeHTML(q.correct_answer);

    doc.text(`${idx + 1}. ${questionText}`, 10, y); y += 7;
    doc.text(`Your Answer: ${userAns}`, 12, y); y += 7;
    doc.text(`Correct Answer: ${correctAns}`, 12, y); y += 10;

    // Agar page end me aa jaye, naya page add karo
    if (y > 270) {
      doc.addPage();
      y = 10;
    }
  });

  // Download PDF
  doc.save("Quiz-Results.pdf");
};


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        background: "linear-gradient(135deg,#7b2ff7,#f107a3)",
      }}
    >
      <Card sx={{ width: 520, borderRadius: 5 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 1,
          }}
        >
          <Typography variant="h4">🎉 Quiz Results</Typography>
          <Divider sx={{ width: "100%", my: 1 }} />

          <Typography variant="body1" >Total Questions: {totalQuestions}</Typography>
          <Typography variant="body1">Attempted: {attemptedCount}</Typography>
          <Typography variant="body1">Skipped: {skippedCount}</Typography>
          <Typography variant="body1">Correct: {correctCount}</Typography>
          <Typography variant="body1">Wrong: {wrongCount}</Typography>

          <Typography variant="h3" sx={{ my: 2 }}>
            {score} / {totalPossible}
          </Typography>

          <Box
  sx={{
    display: "flex",
    gap: 1,
    flexWrap: "wrap",
    justifyContent: "center",  
    mt: 2, 
    
  }}
>
  <Button variant="contained" onClick={() => navigate("/")}>
    Home
  </Button>
  <Button variant="contained" onClick={() => navigate(-1)}>
    Restart
  </Button>
  <Button
    variant="contained"
    color="success"
    endIcon={<DownloadIcon />}
    onClick={downloadPDF}
  >
    See Result
  </Button>
</Box>

        </CardContent>
      </Card>
    </Box>
  );
}
