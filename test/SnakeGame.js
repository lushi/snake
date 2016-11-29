const chai = require("chai");
const expect = chai.expect;

const SnakeGame = require("../src/SnakeGame.js");

describe("SnakeGame", () => {
  it("expect to have 'init' method", () => {
    let game = new SnakeGame();
    expect(game).to.respondTo('init');
  })
});
