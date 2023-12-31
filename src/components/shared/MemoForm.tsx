import { Box, TextField } from "@mui/material";
import { SendButton } from "./SendButton";

type Props = {
  readonly value: string;
  readonly disabled: boolean;
  readonly onChange: (text: string) => void;
  readonly onPost: () => void;
  readonly rows?: number;
  readonly label?: string;
};

export const MemoForm = ({
  label,
  rows,
  value,
  disabled,
  onChange,
  onPost,
}: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ my: 1 }}>
        <TextField
          label={label}
          multiline
          rows={rows ?? 8}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.altKey && event.key === "Enter" && !disabled) {
              onPost();
            }
          }}
          style={{ width: "100%" }}
          inputProps={{ style: { fontSize: ".8rem" } }}
        />
      </Box>
      <SendButton
        onClick={onPost}
        disabled={disabled}
        style={{
          display: "flex",
          marginLeft: "auto",
        }}
      />
    </div>
  );
};
