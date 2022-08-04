const { createPool } = require("mysql");
const pool = createPool({
    port: 3306,
    host: "192.168.33.32",
    user: "kanon",
    password: "MomaGic@8122#@kak",
    database: "kc-test",
    connectionLimit: 10,
})

module.exports = pool;