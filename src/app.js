const express = require("express");
const session = require("express-session");
const { engine } = require("express-handlebars");
const app = express();
const { __prod__, cookieName } = require("./constantes");
const port = 3000;
let RedisStore = require("connect-redis")(session);

// redis@v4
const { createClient } = require("redis");
const { layout } = require("./middlewares/layout");
let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

// middlewares
app.use(
  session({
    name: cookieName,
    store: new RedisStore({
      client: redisClient,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365, // un año
      httpOnly: true,
      secure: __prod__, // solo funciona en https
      sameSite: "lax", // prevedir ataques csrf
    },
    saveUninitialized: false,
    secret: "jsd$hsjd$%hs544d5sdsj#$yh676324%^54545",
    resave: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(layout);
// configuracion
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// rutas
app.use("/", require("./routes/home"));
app.use("/", require("./routes/auth"));
app.use("/about", require("./routes/about"));

app.listen(port, () => {
  console.log("aplicacion ejecutandose en el puerto: ", port);
});
