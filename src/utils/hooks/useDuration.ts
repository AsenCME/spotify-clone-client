export default function useDuration() {
  const format = (ms: number) => {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / 1000 / 60) % 60;
    const hours = Math.floor(ms / 1000 / 60 / 60) % 60;
    const minutesSeconds = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    if (!hours) return minutesSeconds;
    return `${hours.toString().padStart(2, "0")}:${minutesSeconds}`;
  };

  return { format };
}
