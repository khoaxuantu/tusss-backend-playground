import { User } from "@/models/mongodb/user.schema";

export const userStub = (pwd?: string): User => {
  return {
    name: "Tusss",
    email: "tusss@Tusss.com",
    // password: "Uv7`aa%aa9aaaaaaaafdaaasabac&aaa",
    password: pwd ?? "Uv7`aa%aa9aaaaaaaafdaaasabac&aaa",
    age: 23,
    joined_date: new Date(),
  }
}
