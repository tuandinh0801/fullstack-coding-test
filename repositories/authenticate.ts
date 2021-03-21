import axiosInstance from "services/axios";

type SignupData = {
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
};

type LoginData = {
  idToken: string
};

class Authenticate {
  signUp(signUpData: SignupData): Promise<any> {
    return axiosInstance.post("/auth/sign-up", signUpData);
  }

  async login(loginData: LoginData): Promise<any> {
    const { data } = await axiosInstance.post("/auth/login", loginData);
    localStorage.setItem("accessToken", data.accessToken);
  }
}

export default new Authenticate();
