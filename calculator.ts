export function evaluateExpression(expression: string): number {
  const normalized = expression
    .replace(/π/g, String(Math.PI))
    .replace(/e(?![a-z])/g, String(Math.E))
    .replace(/sin\(/g, "Math.sin(")
    .replace(/cos\(/g, "Math.cos(")
    .replace(/tan\(/g, "Math.tan(")
    .replace(/asin\(/g, "Math.asin(")
    .replace(/acos\(/g, "Math.acos(")
    .replace(/atan\(/g, "Math.atan(")
    .replace(/log\(/g, "Math.log10(")
    .replace(/ln\(/g, "Math.log(")
    .replace(/√\(/g, "Math.sqrt(")
    .replace(/\^/g, "**")
    .replace(/!/g, "factorial(");

  const withFactorials = normalized.replace(
    /factorial\((\d+)\)/g,
    (_, num) => String(factorial(parseInt(num)))
  );

  const result = Function(`"use strict"; return (${withFactorials});`)();
  
  if (typeof result !== "number" || !isFinite(result)) {
    throw new Error("Invalid result");
  }
  
  return Math.round(result * 1e10) / 1e10;
}

function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
