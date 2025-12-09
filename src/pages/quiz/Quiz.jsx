 import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import CustomSelect from "./compoennts/DropDown";

export default function QuizPage() {
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");
  const [type, setType] = useState("any");
  const [questions, setQuestions] = useState(5);

  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  return (
   <Box
  sx={{
    minHeight: "100vh",
    py: 3,
    px: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "#dfeaebff", // light gray background
  }}
>

      {/* TOP FILTERS + RESTART */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 5, maxWidth: 1200 }}
      >
        <Grid item xs={12} sm={3}>
          <CustomSelect
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: "any", label: "Any Category" },
              { value: "9", label: "General Knowledge" },
              { value: "10", label: "Books" },
              { value: "11", label: "Film" },
              { value: "12", label: "Sports" },
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <CustomSelect
            label="Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            options={[
              { value: "any", label: "Any Difficulty" },
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <CustomSelect
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={[
              { value: "any", label: "Any Type" },
              { value: "multiple", label: "Multiple Choice" },
              { value: "boolean", label: "True/False" },
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <CustomSelect
            label="Questions"
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            options={[5, 10, 15, 20, 25, 30].map((n) => ({
              value: n,
              label: n,
            }))}
          />
        </Grid>

         <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="error"
            sx={{
              px: 3,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "all 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            Restart
          </Button>
        </Grid>
      </Grid>

      {/* QUESTION CARD */}
     <Paper
  elevation={16}
  sx={{
    width: "90%", 
    maxWidth: 600,
     p: 2,  // overall padding
    pb:5, 
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    bgcolor: "#cddbdeff",
    mx: "auto", 
  }}
>

        <Typography
          variant="h6"
          align="center"
          sx={{ fontWeight: 600, color: "#333"}}
        >
          Q1. A concise response, often used in exams or quizzes, requiring just a couple of sentences to directly address a factual or interpretive question.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            maxWidth: 400,
            margin: "0 auto",
            
          }}
        >
          {options.map((option, index) => (
            <Button
              key={index}
              variant="outlined"
              sx={{
                flex: "0 0 48%",
                height: 60,
                borderRadius: 2,
                fontWeight: 500,
                color: "#1976d2",
                borderColor: "#1976d2",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                
                  
                },
              }}
            >
              {option}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* SUBMIT BUTTON */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="success"
          sx={{
            px: 3,
            py: 1,
            fontWeight: 600,
            fontSize: 16,
            borderRadius: 3,
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
