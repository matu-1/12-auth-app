import { environment } from "src/environments/environment";

export const API_URL = environment.apiUrl;
export const API = {
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
    PROFILE: `${API_URL}/auth/profile`,
    RENEW: `${API_URL}/auth/renew`,
  }
}