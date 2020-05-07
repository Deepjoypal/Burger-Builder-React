import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth.js'
import { initIngredients } from './burgerBuilder'
import { takeEvery } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'


export function* watchAuth () {
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga)
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS,initIngredients)
}