import colors from 'colors';
import { corsConfig, envs, MongoDatabase } from '@src/app/config';
import { AppRoutes } from '@src/app/routes';
import { Server } from '@src/app/server';

(async () => {
  await main();
})();

async function main() {
  try {
    // Conexión a la base de datos
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DBNAME,
    });

    // Iniciar el servidor
    const server = new Server({
      corsConfig: corsConfig,
      port: envs.PORT,
      public_path: envs.PUBLIC_PATH,
      routes: AppRoutes.routes,
    });

    server.start();
  } catch (error: any) {
    console.error(colors.red(`Application failed to start: ${error.message}`));
    process.exit(1); // Termina el proceso si ocurre un error crítico
  }
}
