import { server, connectDB } from './server';

const PORT = 4000;

async function startServer() {
    await connectDB(); // Connect to the database
    server.listen(PORT, '0.0.0.0',() => {
        console.log(`REST API en el puerto ${PORT}`);
    });
}

startServer();