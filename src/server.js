import express from "express";
import next from "next";
import proxy from "http-proxy-middleware";

const port = parseInt(process.env["PORT"]) || 3000;
const authApiBaseUrl =
  process.env["POLYSIGHT_AUTH_BASE_URL=http://localhost:8080"];
const app = next({});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    "/api/auth",
    proxy({
      target: authApiBaseUrl,
      changeOrigin: true,
    })
  );

  server.all("*", (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
