/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = next({});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const port = parseInt(process.env["PORT"]) || 3000;
  const authApiBaseUrl = process.env["POLYSIGHT_AUTH_BASE_URL"];

  const apiPaths = {
    "/api/auth": {
      target: authApiBaseUrl,
      pathRewrite: {
        "^/api/auth": "/",
      },
      changeOrigin: true,
    },
  };

  const server = express();

  server.use("/api/auth", createProxyMiddleware(apiPaths["/api/auth"]));

  server.all("*", (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
