import actionCreator from '../actionCreator'
import removeArrayByIndex from '../../libs/removeArrayByIndex'

const initialState = {
  files: {
    primary: null,
    characteristics: []
  }
}

const SET_IMAGE_FILE_PRIMARY = actionCreator.defineAction('SET_IMAGE_FILE_PRIMARY').toString()
const SET_IMAGE_FILE_CHARACTERISTIC = actionCreator.defineAction('SET_IMAGE_FILE_CHARACTERISTIC').toString()
const REMOVE_IMAGE_FILE_CHARACTERISTIC = actionCreator.defineAction('REMOVE_IMAGE_FILE_CHARACTERISTIC').toString()
const INITIAL_CHARACTERISTIC_VALUE = actionCreator.defineAction('INITIAL_CHARACTERISTIC_VALUE').toString()

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE_FILE_PRIMARY: {
      return { ...state, files: { ...state.files, primary: action.payload } }
    }
    case SET_IMAGE_FILE_CHARACTERISTIC: {
      const newCharData = state.files.characteristics
      newCharData[action.payload.key] = action.payload.file
      return { ...state, files: { ...state.files, characteristics: newCharData } }
    }
    case REMOVE_IMAGE_FILE_CHARACTERISTIC: {
      return { ...state, files: { ...state.files, characteristics: removeArrayByIndex(state.files.characteristics, action.payload) } }
    }
    case INITIAL_CHARACTERISTIC_VALUE: {
      return { ...state, files: { ...state.files, characteristics: [ ...state.files.characteristics, { dataURL: '', name: '' } ] } }
    }
    default: {
      return state
    }
  }
}

export const setImageFilePrimary = file => ({ type: SET_IMAGE_FILE_PRIMARY, payload: file })

export const setImageFileCharacteristic = (file, index) => ({ type: SET_IMAGE_FILE_CHARACTERISTIC, payload: { key: index, file } })

export const removeImageFileCharacteristic = index => ({ type: REMOVE_IMAGE_FILE_CHARACTERISTIC, payload: index })

export const initialCharacteristicValue = () => ({ type: INITIAL_CHARACTERISTIC_VALUE })
