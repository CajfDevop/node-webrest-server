import express from 'express';
import path from 'path';

interface Options {
  port: number;
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;

  constructor(options: Options) {
    const { port, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
  }

  async start() {
    // Configuración básica del servidor
    this.app.use(express.static(this.publicPath));

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
