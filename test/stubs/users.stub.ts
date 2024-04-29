import { User } from "@/models/mongodb/user.schema";

export const userStub = (): User => {
  return {
    name: "Tusss",
    email: "tusss@Tusss.com",
    password: "123",
    age: 23,
    joined_date: new Date(),
  }
}
