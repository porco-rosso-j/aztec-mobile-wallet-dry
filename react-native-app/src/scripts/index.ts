export function formatAddress(address: string, long = false) {
  if (long) {
    return `${address.substring(0, 12)}...${address.substring(
      address.length - 6,
      address.length
    )}`;
  }
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4,
    address.length
  )}`;
}
