import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { evaluateExpression } from "@/lib/calculator";
import { History, Delete, Eraser, Equal } from "lucide-react";

interface CalculatorProps {
  onCalculate: (expression: string, result: string) => void;
  expression: string;
  result: string;
  onExpressionChange: (value: string) => void;
  onResultChange: (value: string) => void;
}

const basicButtons = [
  { label: "7", value: "7", type: "number" },
  { label: "8", value: "8", type: "number" },
  { label: "9", value: "9", type: "number" },
  { label: "÷", value: "/", type: "operator" },
  { label: "4", value: "4", type: "number" },
  { label: "5", value: "5", type: "number" },
  { label: "6", value: "6", type: "number" },
  { label: "×", value: "*", type: "operator" },
  { label: "1", value: "1", type: "number" },
  { label: "2", value: "2", type: "number" },
  { label: "3", value: "3", type: "number" },
  { label: "−", value: "-", type: "operator" },
  { label: "0", value: "0", type: "number" },
  { label: ".", value: ".", type: "number" },
  { label: "(", value: "(", type: "paren" },
  { label: "+", value: "+", type: "operator" },
];

const scientificButtons = [
  { label: "sin", value: "sin(", type: "function" },
  { label: "cos", value: "cos(", type: "function" },
  { label: "tan", value: "tan(", type: "function" },
  { label: "π", value: "π", type: "constant" },
  { label: "log", value: "log(", type: "function" },
  { label: "ln", value: "ln(", type: "function" },
  { label: "√", value: "√(", type: "function" },
  { label: "e", value: "e", type: "constant" },
  { label: "x²", value: "^2", type: "power" },
  { label: "xʸ", value: "^", type: "operator" },
  { label: "sin⁻¹", value: "asin(", type: "function" },
  { label: "cos⁻¹", value: "acos(", type: "function" },
  { label: "tan⁻¹", value: "atan(", type: "function" },
  { label: "!", value: "!", type: "operator" },
  { label: "10ˣ", value: "10^", type: "operator" },
  { label: "eˣ", value: "e^", type: "operator" },
];

export function Calculator({
  onCalculate,
  expression,
  result,
  onExpressionChange,
  onResultChange,
}: CalculatorProps) {
  const [showScientific, setShowScientific] = useState(true);

  const handleButtonClick = useCallback(
    (value: string, type: string) => {
      if (type === "constant") {
        onExpressionChange(expression + value);
        return;
      }

      if (type === "power" && value === "^2") {
        onExpressionChange(expression + "^2");
        return;
      }

      onExpressionChange(expression + value);
    },
    [expression, onExpressionChange]
  );

  const handleClear = useCallback(() => {
    onExpressionChange("");
    onResultChange("");
  }, [onExpressionChange, onResultChange]);

  const handleBackspace = useCallback(() => {
    onExpressionChange(expression.slice(0, -1));
  }, [expression, onExpressionChange]);

  const handleEquals = useCallback(() => {
    if (!expression) return;
    try {
      const resultValue = evaluateExpression(expression);
      const resultString = String(resultValue);
      onResultChange(resultString);
      onCalculate(expression, resultString);
    } catch (error) {
      onResultChange("Error");
    }
  }, [expression, onCalculate, onResultChange]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key;
      if (/[0-9+\-*/().^!]/.test(key)) {
        onExpressionChange(expression + key);
      } else if (key === "Enter") {
        handleEquals();
      } else if (key === "Backspace") {
        handleBackspace();
      } else if (key === "Escape") {
        handleClear();
      }
    },
    [expression, onExpressionChange, handleEquals, handleBackspace, handleClear]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Card className="border-slate-200/80 bg-white/80 shadow-xl shadow-indigo-100/50 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-indigo-950/30">
      <CardContent className="p-6">
        <div className="mb-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Expression
            </span>
            <button
              onClick={() => setShowScientific(!showScientific)}
              className="rounded-lg bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-900"
            >
              {showScientific ? "Basic" : "Scientific"}
            </button>
          </div>
          <div className="min-h-[3rem] break-all text-right font-mono text-2xl font-semibold text-slate-800 dark:text-slate-200">
            {expression || "0"}
          </div>
          <div className="mt-2 min-h-[2rem] break-all text-right font-mono text-lg text-indigo-600 dark:text-indigo-400">
            {result && `= ${result}`}
          </div>
        </div>

        {showScientific && (
          <div className="mb-4 grid grid-cols-4 gap-2">
            {scientificButtons.map((btn) => (
              <Button
                key={btn.label}
                variant="ghost"
                onClick={() => handleButtonClick(btn.value, btn.type)}
                className="h-10 bg-slate-50 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-300"
              >
                {btn.label}
              </Button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            onClick={handleClear}
            className="h-12 border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-400 dark:hover:bg-rose-950"
          >
            <Eraser className="mr-1 h-4 w-4" />
            AC
          </Button>
          <Button
            variant="outline"
            onClick={handleBackspace}
            className="h-12 border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-400 dark:hover:bg-amber-950"
          >
            <Delete className="mr-1 h-4 w-4" />
            DEL
          </Button>
          <Button
            variant="outline"
            onClick={() => handleButtonClick(")", "paren")}
            className="h-12 border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            )
          </Button>
          <Button
            variant="outline"
            onClick={() => handleButtonClick("%", "operator")}
            className="h-12 border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            %
          </Button>

          {basicButtons.map((btn) => (
            <Button
              key={btn.label}
              variant={btn.type === "operator" ? "secondary" : "ghost"}
              onClick={() => handleButtonClick(btn.value, btn.type)}
              className={cn(
                "h-12 text-lg font-semibold",
                btn.type === "operator"
                  ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-900"
                  : "bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              )}
            >
              {btn.label}
            </Button>
          ))}

          <Button
            onClick={handleEquals}
            className="col-span-4 h-12 bg-indigo-600 text-lg font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 dark:bg-indigo-500 dark:text-white dark:shadow-indigo-950/50 dark:hover:bg-indigo-600"
          >
            <Equal className="mr-2 h-5 w-5" />
            Calculate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
