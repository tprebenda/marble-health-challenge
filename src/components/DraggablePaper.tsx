import { useRef } from "react";
import Draggable from "react-draggable";
import Paper, { PaperProps } from "@mui/material/Paper";

// Draggable Paper component for moving the modal
function DraggablePaper(props: PaperProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

export default DraggablePaper;
