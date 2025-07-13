import User from "./models/users.models.js";
import bcrypt from "bcryptjs";

export default async function createAdmin() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
  await User.create({
    username: "Admin",
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword,
    isAdmin: true,
  });
}
