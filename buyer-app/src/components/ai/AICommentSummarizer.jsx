import React, { useState, useCallback } from "react";
import { Brain, Loader2 } from "lucide-react";

const AICommentSummarizer = ({ productId, productName, externalComments = [] }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSummary = useCallback(() => {
    if (!externalComments || externalComments.length === 0) {
      setSummary("No reviews available yet for analysis.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const positiveWords = [
        "good", "great", "excellent", "nice", "love",
        "amazing", "awesome", "perfect", "wow",
        "fantastic", "best"
      ];

      const negativeWords = [
        "bad", "poor", "terrible", "awful",
        "worst", "broken", "hate"
      ];

      let positive = 0;
      let negative = 0;

      externalComments.forEach(comment => {
        const text = comment.text.toLowerCase();

        positiveWords.forEach(word => {
          if (text.includes(word)) positive++;
        });

        negativeWords.forEach(word => {
          if (text.includes(word)) negative++;
        });
      });

      let sentiment = "mixed";

      if (positive > negative) sentiment = "positive";
      else if (negative > positive) sentiment = "negative";

      setSummary(
        `AI analysis of ${externalComments.length} reviews for "${productName}" shows an overall ${sentiment} customer sentiment.`
      );

      setLoading(false);
    }, 700);
  }, [externalComments, productName]);

  return (
    <div className="mt-8 p-6 bg-blue-50 border rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="text-blue-600" />
          <h3 className="font-bold">AI Review Summary</h3>
        </div>

        <button
          onClick={generateSummary}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Generate"}
        </button>
      </div>

      {summary && (
        <p className="mt-4 text-gray-800">
          {summary}
        </p>
      )}
    </div>
  );
};

export default AICommentSummarizer;