import { z } from 'zod'

const RegistrationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  email: z.string({}).email({ message: 'Invalid email address' }),
  image: z.string(),
  password: z.string({
    required_error: 'Password is Required',
  }),
})

export const userValidation = {
  RegistrationSchema,
}