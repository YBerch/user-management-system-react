import * as types from "../../actions/actionTypes";
import * as actionCreators from "../../actions/actionCreators";

describe("actionCreators modal", () => {
  it("should create the 'show modal' action", () => {
    const type = 'some type';
    const props = {prop: 'some data'};
    const expectedAction = {
      type: types.SHOW_MODAL,
      payload: {type, props}
    };

    expect(actionCreators.showModal(type, props)).toEqual(expectedAction);
  });

  it("should create the 'hide modal' action", () => {
    const expectedAction = {
      type: types.HIDE_MODAL
    };

    expect(actionCreators.hideModal()).toEqual(expectedAction);
  });
});
