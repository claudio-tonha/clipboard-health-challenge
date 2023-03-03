const crypto = require("crypto");

const generateHash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    if (!event.partitionKey) {
      return generateHash(JSON.stringify(event));
    }
    
    candidate = event.partitionKey;

    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = generateHash(candidate);
    }
  }
    
  return candidate;
};