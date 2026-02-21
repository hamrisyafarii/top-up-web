import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);

export function generateTransactionCode() {
  return `TRX-${nanoid()}`;
}
