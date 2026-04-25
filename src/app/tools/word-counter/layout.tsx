import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter & Text Analyzer - Analyze Text Instantly | SamToolbox",
  description:
    "Count words, characters, sentences, and paragraphs instantly. Privacy-first text analysis with no uploads — your content stays on your device with zero latency processing.",
  keywords:
    "word counter, text analyzer, character count, paragraph counter, sentence counter, typing stats, text analytics, words per minute, reading time, text metrics",
  openGraph: {
    title: "Word Counter & Text Analyzer | SamToolbox",
    description:
      "Instant text analytics with local processing. Count words, characters, and more without uploading.",
    type: "website",
    url: "https://samtoolbox.com/tools/word-counter",
  },
};

export default function WordCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}