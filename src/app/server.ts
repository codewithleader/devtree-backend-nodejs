import express, { type Router, type ErrorRequestHandler } from 'express';
import cors, { CorsOptions } from 'cors';
import compression from 'compression';
import colors from 'colors';
import path from 'path';

interface Options {
  port: number;
  public_path?: string;
  routes: Router;
  corsConfig: CorsOptions;
  checkJSONFormatMiddleware: ErrorRequestHandler;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly corsConfig: CorsOptions;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;
  private readonly checkJSONFormatMiddleware: ErrorRequestHandler;

  constructor(options: Options) {
    const {
      corsConfig,
      port,
      public_path = 'public',
      routes,
      checkJSONFormatMiddleware,
    } = options;
    this.corsConfig = corsConfig;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
    this.checkJSONFormatMiddleware = checkJSONFormatMiddleware;
  }

  start() {
    //* Middlewares
    // CORS
    this.app.use(cors(this.corsConfig));
    // Habilitar el body parser
    this.app.use(express.json()); // application/json
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(compression()); // Para mejorar el rendimiento comprime la respuesta.

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    // * Error JSON FORMAT
    this.app.use(this.checkJSONFormatMiddleware);

    //* Routes (API and others)
    this.app.use(this.routes);

    //* Redireccionar al index.html cualquier otra ruta que no sea encontrada (SPA: Single Page Application)
    this.app.get('*', (_req, res) => {
      const indexPath = path.join(
        __dirname,
        `../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () =>
      console.log(
        colors.blue.bold(`Listening on http://localhost:${this.port}`)
      )
    );
  }

  public close() {
    this.serverListener?.close();
  }
}
