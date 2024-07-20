import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionUsage({ Icon, title, information }) {
  return (
    <Accordion elevation={false} sx={{ marginBottom: "10px" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {
          <Icon
            sx={{ marginRight: "5px", fontSize: "20px", color: "#691A52" }}
          />
        }
        {title}
      </AccordionSummary>
      <AccordionDetails sx={{ fontSize: "14px" }}>
        {information}
      </AccordionDetails>
    </Accordion>
  );
}
