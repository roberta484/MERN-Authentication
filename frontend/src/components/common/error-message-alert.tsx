import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { memo } from "react";

export interface MessageProps {
  message: string | null;
}

const ErrorMessage = memo(({ message }: MessageProps) => {
  if (!message) return null;
  return (
    <Alert variant="destructive" className="text-red-600 animate-bounce">
      <ExclamationTriangleIcon className="h-4 w-4 mt-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
});

export default ErrorMessage;
