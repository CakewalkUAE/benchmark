const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(compression());
app.use(cookieParser());
// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { performance } = require("perf_hooks");

// Benchmark CPU
function benchmarkCPU() {
  const startTime = performance.now();
  // Perform CPU-intensive task, e.g., prime number calculation
  // Replace the code below with your own CPU-intensive task
  let sum = 0;
  for (let i = 0; i < 100000000; i++) {
    sum += i;
  }
  const endTime = performance.now();
  const cpuTime = endTime - startTime;
  console.log(`CPU benchmark time: ${cpuTime} milliseconds`);
  return { duration: cpuTime };
}

function runFibonacciLogic() {
  const { fib, dist } = require("cpu-benchmark");

  const duration = fib(41); // Returns time required (ms)
  console.log(
    `CPU benchmark time running Fibonacci 41: ${duration} milliseconds`
  );
  // to calculate the 41. fibonacci number recursively.
  const ops = dist(1000); // Returns the amount of operations
  console.log(`Operations performed: ${ops} milliseconds`);
  // (distance matrix calculations) in 1000ms
  return { duration, ops };
}

// Benchmark Memory
function benchmarkMemory() {
  const arraySize = 1000000;
  const array = new Array(arraySize);
  const startTime = performance.now();
  for (let i = 0; i < arraySize; i++) {
    array[i] = i;
  }
  const endTime = performance.now();
  const memoryTime = endTime - startTime;
  console.log(`Memory benchmark time: ${memoryTime} milliseconds`);
  return { duration: memoryTime };
}
console.log(process.cwd());
// Benchmark Read Speed
function benchmarkReadSpeed() {
  const fs = require("fs");
  const filePath = process.cwd() + "/readFileForBenchmark.txt";
  const startTime = performance.now();
  fs.readFileSync(filePath);
  const endTime = performance.now();
  const readTime = endTime - startTime;
  console.log(`Read speed benchmark time: ${readTime} milliseconds`);
  return { duration: readTime };
}

// Benchmark Write Speed
function benchmarkWriteSpeed() {
  const fs = require("fs");
  const filePath = process.cwd() + "/writeFileForBenchmark.txt";
  const data =
    "writing this file to benchmark cloud services, thank you for visiting this file ";
  const startTime = performance.now();
  fs.writeFileSync(filePath, data);
  const endTime = performance.now();
  const writeTime = endTime - startTime;
  console.log(`Write speed benchmark time: ${writeTime} milliseconds`);
  return { duration: writeTime };
}

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.get("/benchmark", (req, res) => {
  const cpuTime = benchmarkCPU();
  const fibonacciTime = runFibonacciLogic();
  const memoryTime = benchmarkMemory();
  const readTime = benchmarkReadSpeed();
  const writeTime = benchmarkWriteSpeed();

  const result = {
    cpuTime,
    fibonacciTime,
    memoryTime,
    readTime,
    writeTime,
  };

  console.table(result);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(result, null, 2));
});

app.get("/health", (req, res) => {
  res.status(200).json({});
});

// start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
