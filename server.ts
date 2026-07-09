import express from "express";
import { createServer as createViteServer } from "vite";
import session from "express-session";
import bcrypt from "bcryptjs";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(session({
  secret: "ili-secret-key-12345",
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: true,      // Required for SameSite=None
    sameSite: 'none',  // Required for cross-origin iframe
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Mock database (In-memory)
const users: any[] = [];

// Auth Endpoints
app.post("/api/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), email, password: hashedPassword, name };
  users.push(newUser);
  (req.session as any).userId = newUser.id;
  res.json({ user: { id: newUser.id, email: newUser.email, name: newUser.name } });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  (req.session as any).userId = user.id;
  res.json({ user: { id: user.id, email: user.email, name: user.name } });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.get("/api/me", (req, res) => {
  const userId = (req.session as any).userId;
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(401).json({ error: "Not authenticated" });
  res.json({ user: { id: user.id, email: user.email, name: user.name } });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
