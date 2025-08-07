import { server, connectDB } from './server';

const PORT = process.env.PORT || 4000;

async function startServer() {
    await connectDB(); // Connect to the database
    server.listen(PORT, () => {
        console.log(`REST API en el puerto ${PORT}`);
    });
}

startServer();