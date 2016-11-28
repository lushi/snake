const chai = require("chai");
const expect = chai.expect;

const createStore = require("../src/createStore.js");

describe("createStore", () => {
  describe("parameters", () => {
    it("expects parameter 'reducer' to be a function", () => {
      let fn = () => {createStore();}
      expect(fn).to.throw(Error);
    });

    it("defaults initialState to empty object if no argument is passed", () => {
      let store = createStore(()=>{});
      let state = store.getState();
      expect(state).to.deep.equal({});
    });
  });

  describe("API", () => {
    describe("#getState", () => {
      it("returns the current state object", () => {
        let initialState = {"foo": "bar"};
        let store = createStore(()=>{}, initialState);
        let state = store.getState();
        expect(state).to.deep.equal(initialState);
      })
    });

    describe("#dispatch", () => {
      it("expects parameter 'action' to be an object literal with own property 'type'", () => {
        let store = createStore(()=>{});
        let fn = () => {store.dispatch({})};

        expect(fn).to.throw(Error);
      })
    })
  });

  describe("data flow", () => {
    it("should update data by the reducer depending on the dispatched action", () => {
      let reducer = (state = {}, action) => {
        switch (action.type) {
          case 'INCREMENT':
            return Object.assign({}, state, {count: state.count + 1});
          case 'DECREMENT':
            return Object.assign({}, state, {count: state.count - 1});
          default:
            return state;
        }
      }

      let store = createStore(reducer, {count: 0});
      store.dispatch({type: 'INCREMENT'});
      expect(store.getState().count).to.equal(1);
    });
  });
});
