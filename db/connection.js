const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
    host: "127.0.0.1",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "root",
    database: "company_db",
    port: 8889,
});

db.on("error", (err) => {
    console.log("- STATS Mysql2 connection died:", err);
});

module.exports = db;