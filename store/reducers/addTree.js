import actionCreator from '../actionCreator'

const initialState = {
  tabIndex: 1
}

const CHANGE_TAB_INDEX = actionCreator.defineAction('CHANGE_TAB_INDEX').toString()

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TAB_INDEX: {
      return { ...state, tabIndex: action.payload }
    }
    default: {
      return state
    }
  }
}

export const changeTabIndex = (_, value) => ({ type: CHANGE_TAB_INDEX, payload: value })

export const changeTabIndexExtra = index => ({ type: CHANGE_TAB_INDEX, payload: index })
