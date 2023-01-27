import bcrypt from "bcrypt";

export const checkPassword = async (formPassword, userPassword) => {
  return await bcrypt.compare(formPassword, userPassword);
};
