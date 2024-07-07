export class AuthorResponseDto {
  ID: string;
  login: string;
  email: boolean;
  name: string;
  first_name: string;
  last_name: string;
  nice_name: string;
  URL: string;
  avatar_URL: string;
  profile_URL: string;

  constructor(data: AuthorResponseDto) {
    if (!data) return;

    this.ID = data.ID;
    this.login = data.login;
    this.email = data.email;
    this.name = data.name;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.nice_name = data.nice_name;
    this.URL = data.URL;
    this.avatar_URL = data.avatar_URL;
    this.profile_URL = data.profile_URL;
  }
}
