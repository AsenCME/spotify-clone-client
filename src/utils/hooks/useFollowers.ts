export default function useFollowers() {
  const format = (total: number) => {
    if (total > 1_000_000_000) return Math.round(total / 10_000_000) / 100 + "B";
    else if (total > 1_000_000) return Math.round(total / 10_000) / 100 + "M";
    else if (total > 1_000) return Math.round(total / 100) / 100 + "K";
    return total;
  };
  return { format };
}
