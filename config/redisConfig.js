const { createClient } = require("redis");
// const redis = new Redis({
//   port: 10786,
//   host: "redis-10786.c8.us-east-1-3.ec2.cloud.redislabs.com",
//   password: "kgBG09DaPjEIqSM4MRKO9KuReuv8n3qu",
//   // connectTimeout: 3000,
// });
console.log("masuk redis");
const redis = createClient({
  url: "redis://sahawae:_Sahawaenya27@redis-10786.c8.us-east-1-3.ec2.cloud.redislabs.com:10786",
});

module.exports = redis;
