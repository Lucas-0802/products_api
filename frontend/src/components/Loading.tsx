import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 20);
      } else {
        clearInterval(timer);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <div className="flex items-center justify-center h-100">
      <Progress value={progress} className="w-[10%]" />
    </div>
  );
}
