import actionCreator from '../actionCreator'

const initialState = {
  images: {
    primary: '',
    characteristics: []
  },
  files: {
    primary: null,
    characteristics: []
  }
}

const SET_IMAGE_FILE_PRIMARY = actionCreator.defineAction('SET_IMAGE_FILE_PRIMARY').toString()
const SET_IMAGE_FILE_CHARACTERISTIC = actionCreator.defineAction('SET_IMAGE_FILE_CHARACTERISTIC').toString()

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE_FILE_PRIMARY: {
      return { ...state, files: { ...state.files, primary: action.payload } }
    }
    case SET_IMAGE_FILE_CHARACTERISTIC: {
      return { ...state, files: { ...state.files, characteristics: { ...state.files.characteristics, [action.payload.key]: action.payload.file } } }
    }
    default: {
      return state
    }
  }
}

export const setImageFilePrimary = file => ({ type: SET_IMAGE_FILE_PRIMARY, payload: file })

export const setImageFileCharacteristic = (file, index) => ({ type: SET_IMAGE_FILE_CHARACTERISTIC, payload: { key: index, file } })
