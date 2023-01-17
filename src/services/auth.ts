import { api } from "../provider/api"

export const Login = async (login: string, password: string) => {
  console.log({ login, password })
  if (!login) return { error_email: 'Email inválido!' }
  if (!password) return { error_password: 'Senha inválida!' }

  try {
    const { data } = await api.post('auth/signin', {
      login,
      password,
    })

    return data
  } catch (error: any) {
    console.log(error)
    return error?.respose?.data
  }
}

export const SignUp = () => {

}
