 
import { useSearchParams } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const score = searchParams.get("score") || 0;
  const total = searchParams.get("total") || 0;
  const skipped = searchParams.get("skipped") || 0;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#7b2ff7",
        p: 2,
      }}
    >
      <Card sx={{ width: 380, borderRadius: 3, bgcolor: "white", textAlign: "center", p: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            🎉 Quiz Result
          </Typography>
          <Typography variant="h6" gutterBottom>
            Total Questions: {total}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Attempted: {total - skipped}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Skipped: {skipped}
          </Typography>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Score: {score} / {total}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.href = "/"}
          >
            🔁 Try Again
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
