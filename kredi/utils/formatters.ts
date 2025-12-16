/**
 * Formats a number as currency with Turkish Lira formatting
 * @param value The number to format
 * @returns Formatted currency string
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Calculates the monthly payment for a loan.
 * @param principal The principal loan amount.
 * @param monthlyRate The monthly interest rate (as a percentage, e.g., 1.5).
 * @param term The loan term in months.
 * @returns The calculated monthly payment.
 */
export function calculateMonthlyPayment(principal: number, monthlyRate: number, term: number): number {
  if (term <= 0) return 0;
  if (monthlyRate === 0) {
    return principal / term;
  }
  const r = monthlyRate / 100; // Convert percentage rate to a decimal
  const n = term;
  const monthlyPayment = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return monthlyPayment;
}
