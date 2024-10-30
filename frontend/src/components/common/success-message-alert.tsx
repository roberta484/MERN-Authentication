import { CheckIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { memo } from "react";

export interface MessageProps {
  message: string | null;
}

const SuccessMessage = memo(({ message }: MessageProps) => {
  if (!message) return null;
  return (
    <Alert className="border-green-700 text-green-600">
      <CheckIcon className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
});

export default SuccessMessage;
