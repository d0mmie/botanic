import { Card, CardContent, Typography, Button, withStyles, Icon, IconButton } from '@material-ui/core'
import { reduxForm, FieldArray, Field } from 'redux-form'
import PropTypes from 'prop-types'
import React from 'react'
import ReactFileReader from 'react-file-reader'
import styled from 'styled-components'

import { renderField } from './addTreeGeneralDataForm'
import { connect } from 'react-redux'
import { setImageFileCharacteristic } from '../store/reducers/addTree'

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
  state => ({ store: state }),
  { setImageFileCharacteristic }
)
@withStyles(styles)
class CharacteristicItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      preview: ''
    }
    this.handleGetFile = this.handleGetFile.bind(this)
  }

  static propTypes = {
    classes: PropTypes.object,
    field: PropTypes.object,
    index: PropTypes.number,
    onRemove: PropTypes.func,
    setImageFileCharacteristic: PropTypes.func
  }

  componentDidMount () {
    console.log(this.props)
  }

  handleGetFile (file) {
    const { index, setImageFileCharacteristic } = this.props
    setImageFileCharacteristic({ dataURL: file.base64, name: file.fileList[0].name }, index)
    this.setState({ preview: file.base64 })
  }

  render () {
    const { classes, field, ...extra } = this.props
    return (
      <div className={classes.itemContainer}>
        <div className={classes.preview}>
          <div className={classes.skeleton}>
            <img width='100%' src={this.state.preview} />
          </div>
          <div className={classes.controlPanel}>
            <ReactFileReader elementId={`charPrev${extra.index}`} fileTypes={['.jpg', '.png', '.JPG']} handleFiles={this.handleGetFile} base64 multipleFiles={false}>
              <Button variant='outlined' color='primary'>{'เลีอกรูปภาพ'}</Button>
            </ReactFileReader>
          </div>
        </div>
        <div className={classes.inputForm}>
          <Field name={`${field}.title`} placeholder='ชื่อ' title='ชื่อ' component={renderField} />
          <Field name={`${field}.description`} textArea placeholder='รายละเอียด' title='รายละเอียด' component={renderField} />
        </div>
        <IconButton onClick={extra.onRemove}>
          <Icon>{'clear'}</Icon>
        </IconButton>
      </div>
    )
  }
}

const renderFieldArray = ({ fields, meta, ...extra }) => (
  <React.Fragment>
    { fields.map((field, index) => <CharacteristicItem key={index} index={index} field={field} {...extra} onRemove={() => fields.remove(index)} />) }
    <AddItemButton style={{ marginTop: 16 }} variant='outlined' color='primary' onClick={() => fields.push()}><Icon>{'add'}</Icon> {'เพิ่มลักษณะพันธ์ไม้'}</AddItemButton>
  </React.Fragment>
)

renderFieldArray.propTypes = {
  fields: PropTypes.object,
  meta: PropTypes.object
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
          <FieldArray name='characteristics' component={renderFieldArray} />
        </CardContent>
      </Card>
    )
  }
}
