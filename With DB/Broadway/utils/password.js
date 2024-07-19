import bcrypt from "bcrypt";

const generateHashedPassword = async (plainPassword, saltRound) => {
  const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
  return hashedPassword;
};

export { generateHashedPassword };
