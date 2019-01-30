import { take, put, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { apiUrl } from '../../api';
import * as types from '../../actions/actionTypes';
import socketIo from 'socket.io-client'

const createSocketChannel = socket => {
  return eventChannel(emit => {
    const pingHandler = event => {
      if(event) {
        switch (event.payload) {
          case 'users':
            emit(types.CLEAR_USERS_DATA);
            break;
          case 'groups':
            emit(types.CLEAR_GROUPS_DATA);
            break;
          case 'connect':
            emit(types.SERVER_CONNECTED);
            break;
          case 'disconnect':
            emit(types.SERVER_DISCONNECTED);
            break;
          default:
            return;
        }
      }
    };

    socket.on('ping', pingHandler);

    socket.on('disconnect', () => pingHandler({payload: 'disconnect'}));

    const unsubscribe = () => {
      socket.off('ping', pingHandler);
    };

    return unsubscribe;
  })
};

function* socketSaga() {
  const socket = socketIo(apiUrl);
  const socketChannel = yield call(createSocketChannel, socket);

  while (true) {
    const actionType = yield take(socketChannel);
    yield put({ type: actionType })
  }
}

export default socketSaga;