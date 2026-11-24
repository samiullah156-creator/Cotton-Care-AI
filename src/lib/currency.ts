const DEFAULT_USD_TO_PKR_RATE = 280;

function getUsdToPkrRate(): number {
  const raw =
    typeof process !== 'undefined'
      ? process.env.NEXT_PUBLIC_USD_TO_PKR_RATE
      : undefined;
  const parsed = raw ? Number(raw) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_USD_TO_PKR_RATE;
}

export function usdToPkr(usd: number, rate: number = getUsdToPkrRate()): number {
  return usd * rate;
}

export function formatPkr(
  amountPkr: number,
  opts?: { maximumFractionDigits?: number }
): string {
  const maximumFractionDigits = opts?.maximumFractionDigits ?? 0;
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits,
  }).format(amountPkr);
}

export function formatPkrFromUsd(
  amountUsd: number,
  opts?: { maximumFractionDigits?: number; rate?: number }
): string {
  return formatPkr(usdToPkr(amountUsd, opts?.rate), {
    maximumFractionDigits: opts?.maximumFractionDigits,
  });
}

