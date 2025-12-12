import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./compoennts/Loader";
import WarningDialog from "../WarningDialogBox";
import CustomSelect from "./compoennts/DropDown";
import { getQuestions } from "../../question-Service.js/Api";

export default function QuizPage() {
  const navigate = useNavigate();

  // --- states ---
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [pendingChange, setPendingChange] = useState(null);
  const [count, setCount] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [answers, setAnswers] = useState({});

  // --- filter states ---
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");
  const [type, setType] = useState("any");
  const [questions, setQuestions] = useState(5);

  // --- shuffle array ---
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  // --- prepare quiz questions ---
  const prepareQuestions = (results) =>
    results.map((q) => {
      const allOptions = shuffle([
        q.correct_answer,
        ...(q.incorrect_answers || []),
      ]);
      return { ...q, allOptions };
    });

  // --- select/deselect option ---
  const handleSelectOption = (option) => {
    setAnswers((prev) => {
      const current = prev[count];
      if (current === option) return { ...prev, [count]: null }; // deselect
      return { ...prev, [count]: option };
    });
  };

  // --- skip question ---
  const handleSkip = () => {
    setAnswers((prev) => ({ ...prev, [count]: prev[count] ?? null }));
    if (count < quizData.length - 1) setCount((c) => c + 1);
  };

  // --- handle filter changes ---
  const handleFilterChange = (field, value) => {
    if (quizStarted) {
      setPendingChange({ field, value });
      setOpenDialog(true);
      return;
    }
    updateFilter(field, value);
  };

  const updateFilter = (field, value) => {
    if (field === "category") setCategory(value);
    if (field === "difficulty") setDifficulty(value);
    if (field === "type") setType(value);
    if (field === "questions") setQuestions(value);
  };

  // --- start/restart quiz ---
  const handleStartRestart = async () => {
    setLoading(true);

    if (quizStarted) {
      setPendingChange({ field: "restart" });
      setOpenDialog(true);
      setLoading(false);
      return;
    }

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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- confirm dialog ---
  const handleConfirmChange = () => {
    if (pendingChange?.field === "restart") resetQuiz();
    else if (pendingChange) {
      updateFilter(pendingChange.field, pendingChange.value);
      resetQuiz();
    }
    setOpenDialog(false);
    setPendingChange(null);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCount(0);
    setAnswers({});
    setQuizData([]);
  };

  const handleCancelChange = () => {
    setOpenDialog(false);
    setPendingChange(null);
  };

  // --- submit quiz ---
  const handleSubmit = () => {
    navigate("/result", {
      state: { quizData, answers, totalQuestions: questions },
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(135deg, #639597ff, #89d7b9ff)",
      }}
    >
      {/* loader */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255,255,255,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Loader />
        </Box>
      )}

      {/* warning dialog */}
      <WarningDialog
        open={openDialog}
        onConfirm={handleConfirmChange}
        onCancel={handleCancelChange}
      />

      {/* filters + button layout */}

      <Grid
        container
        spacing={2}
        sx={{ maxWidth: 1200, mb: 4, alignItems: "start" }}
      >
        {/* filters left */}
        <Grid item xs={12} sm={8} container spacing={2}>
          <Grid item xs={6} sm={3}>
            <CustomSelect
              label="Category"
              value={category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              options={[
                { value: "any", label: "Any Category" },
                { value: "9", label: "General Knowledge" },
                { value: "10", label: "Books" },
                { value: "11", label: "Film" },
                { value: "12", label: "Sports" },
              ]}
              sx={{ minWidth: 100 }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomSelect
              label="Difficulty"
              value={difficulty}
              onChange={(e) => handleFilterChange("difficulty", e.target.value)}
              options={[
                { value: "any", label: "Any Difficulty" },
                { value: "easy", label: "Easy" },
                { value: "medium", label: "Medium" },
                { value: "hard", label: "Hard" },
              ]}
              sx={{ minWidth: 100 }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomSelect
              label="Type"
              value={type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              options={[
                { value: "any", label: "Any type" },
                { value: "multiple", label: "Multiple choice" },
                { value: "boolean", label: "True/False" },
              ]}
              sx={{ minWidth: 100 }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomSelect
              label="Questions"
              value={questions}
              onChange={(e) => handleFilterChange("questions", e.target.value)}
              options={[5, 10, 15, 20, 25, 30].map((n) => ({
                value: n,
                label: n,
              }))}
              sx={{ minWidth: 100 }}
            />
          </Grid>
        </Grid>

        {/* button right */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            onClick={handleStartRestart}
            disabled={loading}
            sx={{
              borderRadius: "40px",
              fontSize: 14,
              fontWeight: "bold",
              background: "linear-gradient(45deg, #ff4081, #b52da5)",
              color: "#f3f7f9",
              height: 50,
              minWidth: 140,
            }}
          >
            {quizStarted ? "restart quiz" : "start quiz"}
          </Button>
        </Grid>
      </Grid>

      {/* quiz card */}
      {quizStarted && quizData.length > 0 && (
        <Paper
          elevation={16}
          sx={{
            width: "90%",
            maxWidth: 650,
            borderRadius: 2,
            p: 3,
            display: "flex",
            flexDirection: "column",
            background: "#ecfaff94",
          }}
        >
          <Typography sx={{ mb: 1, fontWeight: 600, textAlign: "center" }}>
            Question {count + 1} of {questions}
          </Typography>

          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 600, color: "#333", textAlign: "center" }}
            dangerouslySetInnerHTML={{
              __html: quizData[count]?.question || "",
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
              mt: 1,
            }}
          >
            {quizData[count]?.allOptions.map((opt, i) => (
              <Button
                key={i}
                onClick={() => handleSelectOption(opt)}
                variant={answers[count] === opt ? "contained" : "outlined"}
                sx={{
                  flex: "0 0 48%",
                  minWidth: 120,
                  height: 50,
                  textTransform: "none",
                  fontWeight: 600,
                  mb: 1,
                  ...(answers[count] === opt && {
                    backgroundColor: "#00c853",
                    color: "#fff",
                    borderColor: "#00c853",
                  }),
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: opt }} />
              </Button>
            ))}
          </Box>

           <Box
  sx={{
    display: "flex",
    gap: 1,
    mt: 2,
    justifyContent: "center",
    flexWrap: "wrap",
  }}
>
  {/* Prev Button */}
  {count > 0 && (
    <Button
      variant="contained"          
      onClick={() => setCount((c) => c - 1)}
      sx={{
        backgroundColor: "#0d6efd",  
        color: "#fff",
        "&:hover": {
          backgroundColor: "#0b5ed7",
        },
      }}
    >
      prev
    </Button>
  )}

  {/* Next Button */}
  {count < questions - 1 && (
    <>
      <Button
        variant="contained"
        onClick={() => setCount((c) => c + 1)}
        sx={{
          backgroundColor: "#198754", 
          color: "#fff",
          "&:hover": {
            backgroundColor: "#157347",
          },
        }}
      >
        next
      </Button>

      {/* Skip Button */}
      {!answers[count] && (
        <Button
          variant="outlined"
          color="error"
          onClick={handleSkip}
        >
          skip
        </Button>
      )}
    </>
  )}

  {/* Submit Button */}
  {count === questions - 1 && (
    <Button
      variant="contained"
      color="success"
      onClick={handleSubmit}
    >
      submit
    </Button>
  )}
</Box>

        </Paper>
      )}
    </Box>
  );
}
