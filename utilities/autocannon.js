const autocannon = require("autocannon");
const { PassThrough } = require("stream");

function run(url) {
  const buf = [];
  const outputStream = new PassThrough();

  const inst = autocannon({ url, connections: 20, duration: 20 });
  autocannon.track(inst, { outputStream });

  outputStream.on("data", (data) => buf.push(data));

  inst.on("done", function () {
    process.stdout.write(Buffer.concat(buf));
  });
}

module.exports = run;
