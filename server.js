const express = require("express");
const path = require("path");
const app = express();
const port = 8888;

app.use(express.static(path.join(__dirname)));

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`LAN IP: http://192.168.6.11:${port}`);
});
