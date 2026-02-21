export interface loginModel {
  EmailId: string;
  Password: string;
}

export interface registerModel {
  EmailId: string;
  Password: string;
  FName: string;
  LName: string;
}
export interface refreshModel {
  token: string;
}
export interface loginResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
}
