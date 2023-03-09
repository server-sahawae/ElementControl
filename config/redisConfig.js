const Redis = require("ioredis");
const redis = new Redis({
  port: 10786,
  host: "redis-10786.c8.us-east-1-3.ec2.cloud.redislabs.com",
  password: "kgBG09DaPjEIqSM4MRKO9KuReuv8n3qu",
});

module.exports = redis;
