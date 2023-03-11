export const validatePoints = (points, setErrors) => {
  const pointsValues = Object.values(points);
  const pointsKeys = Object.keys(points);

  pointsValues.map((p, i) => {
    if (p > 0 && p >= pointsValues[i + 1]) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        [pointsKeys[i]]:
          "Points can not be greater than the next's score points.",
      }));
    } else if (p > 0) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        [pointsKeys[i]]: "",
      }));
    }
  });
};
