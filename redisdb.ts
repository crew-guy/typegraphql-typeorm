import Redis from 'ioredis'

//? Connecting to redis
// new Redis(); // Connect to 127.0.0.1:6379
// new Redis(6380); // 127.0.0.1:6380
// new Redis(6379, "192.168.1.1"); // 192.168.1.1:6379
// new Redis("/tmp/redis.sock");
// new Redis({
//   port: 6379, // Redis port
//   host: "127.0.0.1", // Redis host
//   family: 4, // 4 (IPv4) or 6 (IPv6)
//   password: "auth",
//   db: 0,
// });
// You can also specify connection options as a redis:// URL or rediss:// URL when using TLS encryption:

// // Connect to 127.0.0.1:6380, db 4, using password "authpassword":
// new Redis("redis://:authpassword@127.0.0.1:6380/4");

export const redis = new Redis("redis://127.0.0.1:6379")