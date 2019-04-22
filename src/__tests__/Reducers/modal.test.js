import reducer from "../../reducers/Modal";
import * as types from "../../actions/actionTypes";

const initialState = {
  type: '',
  props: {}
};

describe("modal reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle HIDE_MODAL", () => {
    const data = { type: types.MODAL_TYPE_SUCCESS, props: {message: 'success'} };
    expect(reducer(data, { type: types.HIDE_MODAL })).toEqual(initialState);
  });

  it("should handle SHOW_MODAL", () => {
    const payload = { type: types.MODAL_TYPE_SUCCESS, props: {message: 'success'} };
    expect(
      reducer(initialState, { type: types.SHOW_MODAL, payload })
    ).toEqual(
      {
        type: payload.type,
        props: payload.props
      }
    );
  });
});
