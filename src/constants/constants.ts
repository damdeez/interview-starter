export enum ECurrencies {
  USD = 'USD',
  INR = 'INR',
  AED = 'AED'
}

export const CURRENCIES = Object.values(ECurrencies) as string[];
export const FUND_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
export const DPD = [30, 90, 120];