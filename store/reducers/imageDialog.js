import actionCreator from '../actionCreator'

const initialState = {
  open: false,
  imgPath: ''
}

const OPEN_DIALOG = actionCreator.defineAction('OPEN_DIALOG').toString()
const CLOSE_DIALOG = actionCreator.defineAction('CLOSE_DIALOG').toString()

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DIALOG: {
      return { ...state, open: true, imgPath: action.payload }
    }
    case CLOSE_DIALOG: {
      return { ...state, open: false, imgPath: '' }
    }
    default: {
      return state
    }
  }
}

export const openDialog = path => ({ type: OPEN_DIALOG, payload: path })

export const closeDialog = () => ({ type: CLOSE_DIALOG })
