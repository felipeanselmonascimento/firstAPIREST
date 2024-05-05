import { env } from "./env";
import { app } from "./app" //acesso a minha aplicacao sem precisar subir o servidor


app.listen({
    port: env.PORT,
}).then(() => {
    console.log('Server is Running!')
})