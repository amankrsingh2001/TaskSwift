const tagColors = [
  ["#8b5cf6", "#c4b5f840"],
  ["#06b6d4", "#67e8f840"],
  ["#14b8a6", "#5eead840"],
  ["#f59e0b", "#fcd34840"],
  ["#f97316", "#fdba7840"],
  ["#6b7280", "#d1d5d840"],
  ["#ec4899", "#f9a8d840"],
  ["#3b82f6", "#93c5f840"],
  ["#ef4444", "#fca5a840"],
  ["#f43f5e", "#fca5a840"],
];

const priorityColors = [
  { name: "high", value: ["#fff", "#ef4444"] },
  { name: "medium", value: ["#fff", "#f59e0b"] },
  { name: "low", value: ["#fff", "#14b8a6"] },
];

export const useGetTagColor = () => {
  let randomValue = Math.floor(Math.random() * tagColors.length);
  const colorArr = [tagColors[randomValue][0] , tagColors[randomValue][1]]
  return colorArr;
};

const useGetPriorityColor = (priorityName) => {
  let [prioritycolorArray] = priorityColors.filter(
    (color) => color.name == priorityName.toLowerCase()
  );
  const colorArr = [prioritycolorArray.value[0], prioritycolorArray.value[1]];
  return colorArr;
};

export default useGetPriorityColor;
