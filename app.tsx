import { useState, useCallback } from "react";
import { Calculator } from "@/components/Calculator";
import { History } from "@/components/History";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function App() {
  const [history, setHistory] = useState<Array<{ expression: string; result: string }>>([]);
  const [currentExpression, setCurrentExpression] = useState("");
  const [currentResult, setCurrentResult] = useState("");
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCalculate = useCallback((expression: string, result: string) => {
    setHistory((prev) => [{ expression, result }, ...prev].slice(0, 10));
    setCurrentExpression(expression);
    setCurrentResult(result);
  }, []);

  const handleHistorySelect = useCallback((expression: string, result: string) => {
    setCurrentExpression(expression);
    setCurrentResult(result);
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-100 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-slate-100">
              Scientific Calculator
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Advanced calculations with live history
            </p>
          </div>
          {mounted && <ThemeToggle />}
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <Calculator
            onCalculate={handleCalculate}
            expression={currentExpression}
            result={currentResult}
            onExpressionChange={setCurrentExpression}
            onResultChange={setCurrentResult}
          />
          <History
            history={history}
            onSelect={handleHistorySelect}
            onClear={handleClearHistory}
          />
        </div>
      </div>
    </div>
  );
}
