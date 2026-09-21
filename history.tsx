import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History as HistoryIcon, Trash2 } from "lucide-react";

interface HistoryItem {
  expression: string;
  result: string;
}

interface HistoryProps {
  history: HistoryItem[];
  onSelect: (expression: string, result: string) => void;
  onClear: () => void;
}

export function History({ history, onSelect, onClear }: HistoryProps) {
  return (
    <Card className="border-slate-200/80 bg-white/80 shadow-xl shadow-indigo-100/50 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-indigo-950/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
          <HistoryIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          History
        </CardTitle>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/50"
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Clear
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/50">
              <HistoryIcon className="h-6 w-6 text-indigo-400 dark:text-indigo-600" />
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              No calculations yet
            </p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Your recent calculations will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((item, index) => (
              <button
                key={index}
                onClick={() => onSelect(item.expression, item.result)}
                className="w-full rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-left transition-all hover:border-indigo-200 hover:bg-indigo-50/50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/30"
              >
                <div className="break-all font-mono text-sm text-slate-600 dark:text-slate-400">
                  {item.expression}
                </div>
                <div className="mt-1 break-all font-mono text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  = {item.result}
                </div>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
