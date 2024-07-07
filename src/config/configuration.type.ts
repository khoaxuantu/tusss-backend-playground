export type TCommonConfiguration = {
  host: string;
  tusss: string;
  blog: {
    wp: string;
  };
}

export type TDatabaseConfiguration = {
  postgres: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  mongodb: {
    uri: string;
    host: string;
    port: number;
    database: string;
  };
}
