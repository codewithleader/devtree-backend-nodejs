import path from 'path';
import express, { type Router } from 'express';
import compression from 'compression';
import colors from 'colors';

interface Options {
  port: number;
  public_path?: string;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, public_path = 'public', routes } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  start() {
    //* Middlewares
    // Habilitar el body parser
    this.app.use(express.json()); // application/json
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(compression()); // Para mejorar el rendimiento comprime la respuesta.

    //* Public Folder
    this.app.use(express.static(this.publicPath));

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
