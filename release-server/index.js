const http = require("http");
const hazel = require("hazel-server");

const server = http.createServer((req, res) => {
  const config = { account: "mhemeryck", repository: "kodabako" };
  hazel(config)(req, res);
});

server.listen(8080);
