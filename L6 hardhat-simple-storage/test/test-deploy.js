const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", () => {
  let simpleStorage;
  before(async () => {
    simpleStorage = await ethers.deployContract("SimpleStorage");
  });

  it("should start with num=0", async () => {
    const currentNum = await simpleStorage.getNum();
    const expectedNum = 0;
    assert.equal(currentNum.toString(), expectedNum.toString());
  });

  it("should update num on setNum", async () => {
    const expectedNum = 7;
    const txnResponse = await simpleStorage.setNum(expectedNum);
    await txnResponse.wait(1);
    const currentNum = await simpleStorage.getNum();
    assert.equal(currentNum.toString(), expectedNum.toString());
  });

  // it();

  // describe("something", () => { //we can use another describe inside
  //   before();

  //   it();
  //   it();
  // });

  // it();
});
