import { z } from 'zod'

const RegistrationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email address' }),
  image: z.string(),
  password: z.string({
    required_error: 'Password is Required',
  }),
})

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email address' }),
  password: z.string({
    required_error: 'Password is Required',
  }),
})

const changePasswordSchema = z.object({
  oldPassword: z.string({
    required_error: 'Old password is required',
  }),
  newPassword: z.string({
    required_error: 'Old password is required',
  }),
})

const resetPasswordSchema = z.object({
  newPassword: z.string({
    required_error: 'This  Field is required',
  }),
})

export const userValidation = {
  RegistrationSchema,
  loginSchema,
  changePasswordSchema,
  resetPasswordSchema,
}
