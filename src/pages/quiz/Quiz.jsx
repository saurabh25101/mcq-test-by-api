import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../../question-Service.js/Api";
import WarningDialog from "../WarningDialogBox";
import CustomSelect from "./compoennts/DropDown";
import Loader from "./compoennts/Loader";

export default function QuizPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [count, setCount] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");
  const [type, setType] = useState("any");
  const [questions, setQuestions] = useState(5);

  /* PAGE LEAVE WARNING */
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (quizStarted) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [quizStarted]);

  /*  HELPERS   */
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const prepareQuestions = (results) =>
    results.map((q) => ({
      ...q,
      allOptions: shuffle([q.correct_answer, ...(q.incorrect_answers || [])]),
    }));

  /*   OPTION SELECT  */
  const handleSelectOption = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [count]: prev[count] === option ? null : option,
    }));
  };

  const handleSkip = () => {
    if (count < quizData.length - 1) {
      setCount((c) => c + 1);
    }
  };

  /*   START / RESTART   */
  const handleStartRestart = async () => {
    if (quizStarted) {
      setOpenDialog(true);
      return;
    }

    setLoading(true);
    setQuizStarted(true);
    setCount(0);
    setAnswers({});

    try {
      const data = await getQuestions({
        amount: questions,
        category,
        difficulty,
        type,
      });
      setQuizData(prepareQuestions(data.results || []));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /*  RESET QUIZ  */
  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizData([]);
    setAnswers({});
    setCount(0);
    setCategory("any");
    setDifficulty("any");
    setType("any");
    setQuestions(5);
    setOpenDialog(false);
  };

  /*  SUBMIT  */
  const handleSubmit = () => {
    navigate("/result", {
      state: {
        quizData,
        answers,
        totalQuestions: questions,
      },
    });
  };

  /*  BLOCK DROPDOWN CHANGE =  */
  const handleConfigChange = (setter, value) => {
    if (quizStarted) {
      setOpenDialog(true);
      return;
    }
    setter(value);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflowY:"auto",
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 3, md: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(45deg, #ff4081, #7c4dff)",
        overflowX: "hidden",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <Loader />
        </Box>
      )}

      <WarningDialog
        open={openDialog}
        onConfirm={resetQuiz}
        onCancel={() => setOpenDialog(false)}
      />

      {/* TOP BAr */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,
          mb: 4,
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* DROPDOWNS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, minmax(180px, 1fr))",
            },
            gap: 2,
            flex: 1,
          }}
        >
           <CustomSelect
  label="Category"
  value={category}
  onChange={(e) => handleConfigChange(setCategory, e.target.value)}
  options={[
    { value: "any", label: "Any Category" },

    { value: "9", label: "General Knowledge" },
    { value: "10", label: "Books" },
    { value: "11", label: "Film" },
    { value: "12", label: "Music" },
    { value: "13", label: "Musicals & Theatre" },
    { value: "14", label: "Television" },
    { value: "15", label: "Video Games" },
    { value: "16", label: "Board Games" },

    { value: "17", label: "Science & Nature" },
    { value: "18", label: "Computers" },
    { value: "19", label: "Mathematics" },

    { value: "20", label: "Mythology" },
    { value: "21", label: "Sports" },
    { value: "22", label: "Geography" },
    { value: "23", label: "History" },
    { value: "24", label: "Politics" },
    { value: "25", label: "Art" },
    { value: "26", label: "Celebrities" },
    { value: "27", label: "Animals" },
    { value: "28", label: "Vehicles" },

    { value: "29", label: "Comics" },
    { value: "30", label: "Gadgets" },
    { value: "31", label: "Anime & Manga" },
    { value: "32", label: "Cartoon & Animations" },
  ]}
/>


          <CustomSelect
            label="Difficulty"
            value={difficulty}
            onChange={(e) => handleConfigChange(setDifficulty, e.target.value)}
            options={[
              { value: "any", label: "Any" },
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
          />

          <CustomSelect
            label="Type"
            value={type}
            onChange={(e) => handleConfigChange(setType, e.target.value)}
            options={[
              { value: "any", label: "Any" },
              { value: "multiple", label: "MCQ" },
              { value: "boolean", label: "True / False" },
            ]}
          />

          <CustomSelect
            label="Questions"
            value={questions}
            onChange={(e) => handleConfigChange(setQuestions, e.target.value)}
            options={[5, 10, 15, 20].map((n) => ({ value: n, label: n }))}
          />
        </Box>

        {/* START BUTTON */}
        <Box
          sx={{
            width: { xs: "100%", md: "auto" },
            display: "flex",
            justifyContent: { xs: "center", lg: "flex-end" },
          }}
        >
          <Button
            onClick={handleStartRestart}
            sx={{
              height: 50,
              px: 5,
              fontWeight: 700,
              borderRadius: 3,
              bgcolor: "#111827",
              color: "#fff",
              boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
              textTransform: "uppercase",
              letterSpacing: 1,
              transition: "0.3s",
              "&:hover": { bgcolor: "#1e293b", transform: "scale(1.05)" },
            }}
          >
            {quizStarted ? "Restart" : "Start"}
          </Button>
        </Box>
      </Box>

      {/* QUESTION CARD */}
      {quizStarted && quizData.length > 0 && (
        <Paper
          sx={{
            width: "100%",
            maxWidth: 600,
            p: { xs: 1, sm: 4 },
            borderRadius: 2,
            background: "rgba(232, 219, 219, 0.85)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mx: { xs: 3, sm: "auto" },
          }}
        >
          <Typography
            align="center"
            fontWeight={700}
            fontSize={{ xs: "1.1rem", md: "1.3rem" }}
          >
            Question {count + 1} of {questions}
          </Typography>

          <Typography
            align="center"
            sx={{
              fontWeight: 600,
              lineHeight: 1.8,
              fontSize: { xs: "1rem", md: "1.2rem" },
            }}
            dangerouslySetInnerHTML={{ __html: quizData[count]?.question }}
          />

          <Box
            sx={{
              mt: 1,
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            {quizData[count]?.allOptions.map((opt, i) => (
              <Button
  key={i}
  fullWidth
  onClick={() => handleSelectOption(opt)}
  variant={answers[count] === opt ? "contained" : "outlined"}
  sx={{
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 4,
    padding: 2,
    transition: "0.3s",
    "&:hover": { transform: "scale(1.03)" },

    
    whiteSpace: "normal",         
    wordBreak: "break-word",     

    bgcolor:
      answers[count] === opt
        ? "#0f172a"
        : "rgba(255,255,255,0.8)",
    color: answers[count] === opt ? "#c69b9bff" : "#111827",
    boxShadow:
      answers[count] === opt
        ? "0 6px 20px rgba(0,0,0,0.3)"
        : "0 4px 12px rgba(0,0,0,0.1)",
  }}
>
  <span dangerouslySetInnerHTML={{ __html: opt }} />
</Button>

            ))}
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {count > 0 && (
              <Button variant="outlined" onClick={() => setCount((c) => c - 1)}>
                Prev
              </Button>
            )}

            {count < questions - 1 && (
              <>
               <Button
  variant="contained"
  onClick={() => setCount((c) => c + 1)}
  disabled={!answers[count]} 
>
  Next
</Button>

                <Button
                  variant="outlined"
                  color="error"
                  disabled={!!answers[count]}
                  onClick={handleSkip}
                >
                  Skip
                </Button>
              </>
            )}

            {count === questions - 1 && (
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
}
