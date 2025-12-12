 
import { Box } from "@mui/material";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RotatingLines
        strokeColor="#0d6efd"
        strokeWidth="5"
        animationDuration="0.75"
        height="80"
        width="80"
        visible={true}
      />
    </Box>
  );
};

export default Loader;
