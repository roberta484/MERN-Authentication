import { Loader } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <Loader className="w-14 h-14 animate-spin" />
    </section>
  );
}
