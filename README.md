
### Despliegue con Docker Compose

Para ejecutar el despliegue con Docker Compose, asegúrese de que Docker Desktop esté instalado en su computadora y de que la aplicación se encuentre abierta (en ejecución) antes de lanzar el comando.

```bash
git clone https://github.com/Kose117/JAMBOARD-ArquiTaller.git
docker-compose up --build
```

Una vez que los contenedores estén en marcha, abra su navegador y acceda a http://localhost:5173/auth para comprobar que la aplicación se está ejecutando correctamente.
