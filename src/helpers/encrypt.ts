import bcrypt from "bcryptjs";

export const encrypt = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash
}

export const compare = (password: string, passwordDB: string) => {
  const checkPassword = bcrypt.compareSync(password, passwordDB);
  return checkPassword; //tru or false
}