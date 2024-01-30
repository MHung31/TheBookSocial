import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import "./ProfilePage.css";

export function BarChart({ reactions }) {
  ChartJS.defaults.font.size = 15;
  const reactionSummary = {};
  reactions.forEach((reaction) => {
    if (reactionSummary[reaction.reaction]) {
      reactionSummary[reaction.reaction] += 1;
    } else reactionSummary[reaction.reaction] = 1;
  });

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Reactions Summary",
      },
    },
  };
  const labels = [];
  const count = [];
  let emojiList = [
    "😍",
    "😎",
    "😂",
    "😓",
    "😒",
    "😱",
    "😡",
    "😭",
    "🤔",
    "🥺",
    "💀",
    "🤦",
    "🙏",
    "🧡",
    "🔥",
    "💤",
    "💯",
    "🏅",
  ];
  for (const emoji in reactionSummary) {
    labels.push(emojiList[Number(emoji) -1]);
    count.push(reactionSummary[emoji]);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "# of Reactions",
        data: count,
        backgroundColor: "rgba(177, 133, 13, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
