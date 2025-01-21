export interface SigninOutDto {
  _id: string;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  age: number;
  nationality: string;
  roles: "admin";
  access_token: string;
}
