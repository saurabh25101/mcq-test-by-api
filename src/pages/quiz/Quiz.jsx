 import { Box, Button, Paper, Typography, Grid } from "@mui/material";
import { useState } from "react";
import CustomSelect from "./compoennts/DropDown";

export default function QuizPage() {
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");
  const [type, setType] = useState("any");
  const [questions, setQuestions] = useState(5);

  return (
    <Box
      sx={{
        height: "100dvh",
        background: "#F4F6FA",
        display: "flex",
        flexDirection: "column",
      }}
    >
      

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        {/* FILTER BOX */}
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 800,
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
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

            <Grid item xs={6} sm={3}>
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

            <Grid item xs={6} sm={3}>
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

            <Grid item xs={6} sm={3}>
              <CustomSelect
                label="Questions"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                options={[5,10,15,20,25,30,35,40,45,50].map((n) => ({
                  value: n,
                  label: n,
                }))}
              />
            </Grid>
            <Grid><Button variant="outlined" color="error" sx={{ mt: 1, mx:3 }}>
          Restart
        </Button></Grid>
          </Grid>
        </Paper>

        {/* QUESTION CARD */}
        <Paper
          elevation={3}
          sx={{
            width: "50%",
            maxWidth: 800,
            padding: 3,
            borderRadius: 2,
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Q1. Your Question Here
          </Typography>

          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Button variant="contained" fullWidth>Option 1</Button>
            <Button variant="contained" fullWidth>Option 2</Button>
            <Button variant="contained" fullWidth>Option 3</Button>
            <Button variant="contained" fullWidth>Option 4</Button>
          </Box>

          {/* SUBMIT BUTTON UNDER QUESTION */}
          <Button
            variant="outlined"
            color="success"
            sx={{ mt: 3, width: "50%" }}
          >
            Submit
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
