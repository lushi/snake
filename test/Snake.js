const chai = require("chai");
const expect = chai.expect;

const Snake = require("../src/Snake.js");

describe("Snake", () => {
  it("expect to have 'init' method", () => {
    let snake = new Snake();
    expect(snake).to.respondTo('init');
  })
});
