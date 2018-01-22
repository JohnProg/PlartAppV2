const saveSelectedProfessions = (req, res) => {
  res.status(200).json({ success: true });
};

const savePersonalInformation = (req, res) => {
  res.status(200).json({ success: true });
};

exports.saveSelectedProfessions = saveSelectedProfessions;
exports.savePersonalInformation = savePersonalInformation;
