import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import WarningDialog from "../WarningDialogBox";
import CustomSelect from "./compoennts/DropDown";
import "./Quiz.css";
import { getQuestions } from "../../question-Service.js/Api";
import { useNavigate } from "react-router-dom";

export default function QuizPage() {
    const navigate = useNavigate();
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");
  const [type, setType] = useState("any");
  const [questions, setQuestions] = useState(5);

  const [quizStarted, setQuizStarted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [pendingChange, setPendingChange] = useState(null);

  const [count, setCount] = useState(0);
  const [quizData, setQuizData] = useState([]);

  // save seleted option
  const [answers, setAnswers] = useState({});

  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  // --- SELECT OPTION ----
  const handleSelectOption = (option) => {
    setAnswers({
      ...answers,
      [count]: option, // current question ka selected option
    });
  };

  // Filter change
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

  //Start  Restart btn
  const handleStartRestart = async () => {
    if (quizStarted) {
      setPendingChange({ field: "restart", value: null });
      setOpenDialog(true);
      return;
    }

    setQuizStarted(true);
    setCount(0);
    setAnswers({});

    // API call
    const data = await getQuestions({
      amount: questions,
      category,
      difficulty,
      type,
    });

 

    setQuizData(data.results);
  };


  // Confirm filter change
  const handleConfirmChange = () => {
    if (pendingChange?.field === "restart") {
      resetQuiz();
    } else if (pendingChange) {
      updateFilter(pendingChange.field, pendingChange.value);
      resetQuiz();
    }

    setOpenDialog(false);
    setPendingChange(null);
  };

  const resetQuiz = () => {
    setCategory("any");
    setDifficulty("any");
    setType("any");
    setQuestions(5);
    setQuizStarted(false);
    setCount(0);
    setAnswers({});
  };

  const handleCancelChange = () => {
    setOpenDialog(false);
    setPendingChange(null);
  };

  return (
    <Box className="quiz-container">
      <WarningDialog
        open={openDialog}
        onConfirm={handleConfirmChange}
        onCancel={handleCancelChange}
      />

      {/* filter */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        className="filter-grid"
      >
        {/* cat...*/}
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
          />
        </Grid>

        {/* diffculity*/}
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
          />
        </Grid>

        {/* type */}
        <Grid item xs={12} sm={3}>
          <CustomSelect
            label="Type"
            value={type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            options={[
              { value: "any", label: "Any Type" },
              { value: "multiple", label: "Multiple Choice" },
              { value: "boolean", label: "True/False" },
            ]}
          />
        </Grid>

        {/* question*/}
        <Grid item xs={12} sm={3}>
          <CustomSelect
            label="Questions"
            value={questions}
            onChange={(e) => handleFilterChange("questions", e.target.value)}
            options={[5, 10, 15, 20, 25, 30].map((n) => ({
              value: n,
              label: n,
            }))}
          />
        </Grid>

        <Grid item xs={12} className="contained">
          <Button className="start-end-btn" onClick={handleStartRestart}>
            {quizStarted ? "Restart Quiz" : "Start Quiz"}
          </Button>
        </Grid>
      </Grid>

      {/* quiz section */}
      {quizStarted && (
        <Paper className="quiz-paper" elevation={16}>
          {/* QUESTION box*/}
          <div className="box">
            <p className="question-count">
              Question {count + 1} of {questions}
            </p>

         <Typography
  variant="h6"
  className="question-text"
  dangerouslySetInnerHTML={{ __html: quizData[count]?.question }}
/>


            {/* pre next btn */}
            <div className="nav-btns">
              {count > 0 && (
                <div className="btn" onClick={() => setCount(count - 1)}>
                  Prev
                </div>
              )}
              {count < questions - 1 && (
                <div className="btn" onClick={() => setCount(count + 1)}>
                  Next
                </div>
              )}
            </div>
          </div>

          {/* all options*/}
          {/* all options*/}
<Box className="options-wrapper">
  {(type === "boolean" ? ["True", "False"] : options).map((opt, i) => (
    <Button
      key={i}
      variant="outlined"
      className={`option-btn ${answers[count] === opt ? "selected" : ""}`}
      onClick={() => handleSelectOption(opt)}
    >
      {opt}
    </Button>
  ))}
</Box>

{/* submit only last question */}
{count === questions - 1 && (
  <Box className="submit-wrapper">
    <Button
  variant="contained"
  color="success"
  className="submit-btn"
  onClick={() =>
    navigate("/result")
  }
>
  Submit
</Button>
  </Box>
)}

        </Paper>
      )}
    </Box>
  );
}
