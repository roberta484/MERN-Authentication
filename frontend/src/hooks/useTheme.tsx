import { ThemeProviderContext } from "@/context/theme-provider";
import { useContext } from "react";

export default function useTheme() {
  const { theme, setTheme } = useContext(ThemeProviderContext);
  return { theme, setTheme };
}
