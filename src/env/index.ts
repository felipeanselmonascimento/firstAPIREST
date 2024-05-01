import 'dotenv/config' //ler o arquivo da pasta raiz .env e colocar no process.env
import { z } from 'zod'

//Joi, Yup, Zod
//process.env = objeto
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
    DATABASE_URL: z.string(),
    PORT: z.number().default(3333)
})

export const env = envSchema.parse(process.env) 