const bcrypt = require('bcrypt');

module.exports = async (password, hashedPassword) => {
  const comparePassword = await bcrypt.compare(password, hashedPassword);

  return comparePassword;
};
