const { deterministicPartitionKey } = require("./dpk");
const randomString = require("randomstring")
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the hash when input is an empty object", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey).toHaveLength(128);
  });

  it("Returns the hash when input is an object", () => {
    const trivialKey = deterministicPartitionKey({ value: 1 });
    expect(trivialKey).toHaveLength(128);
  });

  it("Returns a text when input is a number", () => {
    const partitionKey = 10;
    const trivialKey = deterministicPartitionKey({ partitionKey});
    expect(trivialKey).toBe(partitionKey.toString());
  });

  it("Returns a hash when input is a string", () => {
    const partitionKey = "10";
    const trivialKey = deterministicPartitionKey(partitionKey);
    expect(trivialKey).toHaveLength(128);
  });

  it("Returns the same text when input has length less or equal to 256", () => {
    const partitionKey = randomString.generate(256);
    const trivialKey = deterministicPartitionKey({ partitionKey });
    expect(trivialKey).toBe(partitionKey);
  });

  it("Returns the hash when input has length greater than 256", () => {
    const partitionKey = randomString.generate(257);
     const trivialKey = deterministicPartitionKey({ partitionKey });
    expect(trivialKey).not.toBe(partitionKey);
    expect(trivialKey).toHaveLength(128);
  });
});
