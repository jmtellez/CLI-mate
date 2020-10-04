const getUnits = (inputValue) => {
  let units = "f";
  if (
    !(
      inputValue &&
      (inputValue.startsWith("--u=") || inputValue.startsWith("--units="))
    )
  ) {
    return units;
  }

  const unitValue = inputValue.split("=")[1];

  if (unitValue.length === 1) {
    units = unitValue;
  }
  return units;
};

module.exports = { getUnits: getUnits };
