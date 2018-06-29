import { Card, CardContent, Typography, Button, withStyles, Icon, IconButton } from '@material-ui/core'
import { reduxForm, FieldArray, Field } from 'redux-form'
import PropTypes from 'prop-types'
import React from 'react'
import ReactFileReader from 'react-file-reader'
import styled from 'styled-components'

import { renderField } from './addTreeGeneralDataForm'
import { connect } from 'react-redux'
import { setImageFileCharacteristic, removeImageFileCharacteristic, initialCharacteristicValue } from '../store/reducers/addTree'

const AddItemButton = styled(Button)`
  width: 100%;
`

const styles = theme => ({
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.unit
  },
  inputForm: {
    flex: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  preview: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    margin: `0 ${theme.spacing.unit}px`,
    padding: `0 ${theme.spacing.unit}px`,
    justifyContent: 'space-around'
  },
  controlPanel: {
    marginTop: 6
  },
  skeleton: {
    width: 75,
    minHeight: 75,
    backgroundColor: '#ccc',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

@connect(
  state => ({ addTreeState: state.addTree }),
  { setImageFileCharacteristic, removeImageFileCharacteristic }
)
@withStyles(styles)
class CharacteristicItem extends React.Component {
  constructor (props) {
    super(props)
    this.handleGetFile = this.handleGetFile.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  static propTypes = {
    classes: PropTypes.object,
    field: PropTypes.string,
    myIndex: PropTypes.number,
    onRemove: PropTypes.func,
    setImageFileCharacteristic: PropTypes.func,
    removeImageFileCharacteristic: PropTypes.func,
    addTreeState: PropTypes.object
  }

  handleGetFile (file) {
    const { myIndex, setImageFileCharacteristic } = this.props
    setImageFileCharacteristic({ dataURL: file.base64, name: file.fileList[0].name }, myIndex)
  }

  handleRemove () {
    const { onRemove, myIndex, removeImageFileCharacteristic } = this.props
    console.log(myIndex)
    removeImageFileCharacteristic(myIndex)
    onRemove(myIndex)
  }

  render () {
    const { classes, field, addTreeState, myIndex } = this.props
    return (
      <div className={classes.itemContainer}>
        <div className={classes.preview}>
          <div className={classes.skeleton}>
            <img width='100%' src={addTreeState.files.characteristics[myIndex] && addTreeState.files.characteristics[myIndex].dataURL} />
          </div>
          <div className={classes.controlPanel}>
            <ReactFileReader elementId={`charPrev${myIndex}`} fileTypes={['.jpg', '.png', '.JPG']} handleFiles={this.handleGetFile} base64 multipleFiles={false}>
              <Button variant='outlined' color='primary'>{'เลีอกรูปภาพ'}</Button>
            </ReactFileReader>
          </div>
        </div>
        <div className={classes.inputForm}>
          <Field name={`${field}.title`} placeholder='ชื่อ' title='ชื่อ' component={renderField} />
          <Field name={`${field}.description`} textArea placeholder='รายละเอียด' title='รายละเอียด' component={renderField} />
        </div>
        <IconButton onClick={this.handleRemove}>
          <Icon>{'clear'}</Icon>
        </IconButton>
      </div>
    )
  }
}

@connect(
  state => ({ notUsestore: state }),
  { initialCharacteristicValue }
)
class RenderFieldArray extends React.Component {
  constructor (props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
  }
  static propTypes = {
    fields: PropTypes.object,
    meta: PropTypes.object,
    initialCharacteristicValue: PropTypes.func
  }

  handleAdd () {
    const { fields, initialCharacteristicValue } = this.props
    initialCharacteristicValue()
    fields.push()
  }
  render () {
    const { fields, meta, ...extra } = this.props
    return (
      <React.Fragment>
        { fields.map((field, index) => <CharacteristicItem key={index} myIndex={index} field={field} {...extra} onRemove={e => fields.remove(e)} />) }
        <AddItemButton style={{ marginTop: 16 }} variant='outlined' color='primary' onClick={this.handleAdd}><Icon>{'add'}</Icon> {'เพิ่มลักษณะพันธ์ไม้'}</AddItemButton>
      </React.Fragment>
    )
  }
}
@reduxForm({
  form: 'addTreeCharacteristic'
})
export default class AddTreeCharacteristicDataForm extends React.Component {
  render () {
    return (
      <Card elevation={0} style={{ margin: 8 }}>
        <CardContent>
          <Typography variant='title'>{'ลักษณะของพรรณไม้'}</Typography>
          <FieldArray name='characteristics' component={RenderFieldArray} />
        </CardContent>
      </Card>
    )
  }
}
