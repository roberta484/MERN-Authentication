import useTheme from "@/hooks/useTheme";
import { Button } from "../ui/button";
import { Laptop, Moon, Sun } from "lucide-react";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant={"ghost"}
      className="absolute top-4 right-4"
      onClick={() =>
        setTheme(
          theme === "system" ? "light" : theme === "light" ? "dark" : "system"
        )
      }
    >
      {theme === "system" ? (
        <Moon data-testid="moon" />
      ) : theme === "light" ? (
        <Sun data-testid="sun" />
      ) : (
        <Laptop data-testid="laptop" />
      )}
      <span className="sr-only">theme button</span>
    </Button>
  );
}
