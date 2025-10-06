import { Quote, QuotePricing } from '../types';

export function calculateQuotePricing(quote: Quote): QuotePricing {
  const driverPay = quote.mode === 'internal' && quote.driverPayPerKm
    ? quote.driverPayPerKm * quote.distanceKm
    : 0;

  const vendorFee = quote.mode === 'vendor' && quote.vendorFee
    ? quote.vendorFee
    : 0;

  const totalCost = quote.fuel + quote.tolls + driverPay + vendorFee + quote.misc;

  const pricePerKm = quote.proposedCustomerPrice / quote.distanceKm;
  const costPerKm = totalCost / quote.distanceKm;
  const marginAmt = quote.proposedCustomerPrice - totalCost;
  const marginPct = (marginAmt / quote.proposedCustomerPrice) * 100;

  return {
    pricePerKm: Number(pricePerKm.toFixed(2)),
    totalCost: Number(totalCost.toFixed(2)),
    costPerKm: Number(costPerKm.toFixed(2)),
    marginAmt: Number(marginAmt.toFixed(2)),
    marginPct: Number(marginPct.toFixed(2)),
  };
}

export function formatCurrency(amount: number): string {
  return `₸${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function formatCurrencyPerKm(amount: number): string {
  return `₸${amount.toFixed(2)}/km`;
}

export function formatPercent(percent: number): string {
  return `${percent.toFixed(1)}%`;
}
