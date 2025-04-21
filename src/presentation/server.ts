import express, { Router } from 'express';
import path from 'path';

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    //* Middlewares
    this.app.use(express.json()); //raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Public Folder
    // Configuración básica del servidor
    this.app.use(express.static(this.publicPath));

    //*Routes
    this.app.use(this.routes);

    //* Cualquier ruta no definida pasa por aquí, estoy ayuda a los SPA
    // Manejador de rutas para SPA
    this.app.use((req, res) => {
      res.sendFile(
        path.join(process.cwd(), `${this.publicPath}`, 'index.html')
      );
    });

    // Iniciar servidor
    this.app.listen(this.port, () => {
      console.log(`Server running on Port ${this.port}`);
    });
  }
}
