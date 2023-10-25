export type SignInModel = {
  userName: string;
  password: string;
};

export type SignUpModel = SignInModel & {
  repeatPassword: string;
  email: string;
};

export type CodeModel = {
  code: string;
};
