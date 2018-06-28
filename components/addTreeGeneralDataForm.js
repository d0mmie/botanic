import { Card, CardContent, Typography, withStyles, Button, IconButton, Icon } from '@material-ui/core'
import { Field, FieldArray, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import React from 'react'
import ReactFileReader from 'react-file-reader'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { setImageFilePrimary } from '../store/reducers/addTree'

import { Label, Input, TextArea } from './ui'

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledAddNativeNameButton = styled(Button)`
  width: 100%;
`

export const renderField = ({ input, ...extra }) => (
  <React.Fragment>
    { extra.title && <Label htmlFor={input.name}>{extra.title}</Label>}
    <InputContainer>
      {
        extra.textArea
          ? <TextArea id={input.name} {...input} {...extra} />
          : <Input id={input.name} {...input} {...extra} />
      }
      { extra.removeable && <IconButton onClick={extra.onRemove}><Icon>{'clear'}</Icon></IconButton> }
    </InputContainer>
  </React.Fragment>
)

renderField.propTypes = {
  input: PropTypes.object
}

const renderFieldArray = ({ fields, meta, ...extra }) => (
  <React.Fragment>
    <InputContainer>
      { extra.title && <Label>{extra.title}</Label> }
    </InputContainer>
    {
      fields.map((field, index) => (
        <Field key={index} name={field} component={renderField} {...extra} title={`${extra.title} #${index + 1}`} removeable onRemove={() => fields.remove(index)} />
      ))
    }
    <StyledAddNativeNameButton onClick={() => fields.push()} variant='outlined' color='primary'><Icon>{'add'}</Icon> {'เพิ่มชื่อพื้นเมื่อง'}</StyledAddNativeNameButton>
  </React.Fragment>
)

renderFieldArray.propTypes = {
  fields: PropTypes.object,
  meta: PropTypes.object,
  extra: PropTypes.object
}

const styles = theme => ({
  cardContent: {
    display: 'flex',
    flexDirection: 'row'
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
    alignItems: 'center',
    margin: `0 ${theme.spacing.unit}px`,
    padding: `0 ${theme.spacing.unit}px`,
    justifyContent: 'space-around'
  },
  controlPanel: {
    marginTop: 6
  },
  skeleton: {
    width: 400,
    height: '100%',
    backgroundColor: '#ccc',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

@connect(
  state => ({ addTreeState: state.addTree }),
  { setImageFilePrimary }
)
@reduxForm({
  form: 'addTreeGeneral'
})
@withStyles(styles)
export default class AddTreeGeneralDataForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      preview: '',
      file: null
    }
    this.handleGetFile = this.handleGetFile.bind(this)
  }

  static propTypes = {
    classes: PropTypes.object,
    setImageFilePrimary: PropTypes.func
  }

  handleGetFile (file) {
    this.props.setImageFilePrimary({ dataURL: file.base64, name: file.fileList[0].name })
    this.setState({ preview: file.base64 })
  }

  render () {
    const { classes } = this.props
    return (
      <Card elevation={0} style={{ margin: 8 }}>
        <CardContent className={classes.cardContent}>
          <div className={classes.preview}>
            <div className={classes.skeleton}>
              <img width={400} src={this.state.preview} />
            </div>
            <div className={classes.controlPanel}>
              <ReactFileReader elementId='fileReader' fileTypes={['.jpg', '.png', '.JPG']} handleFiles={this.handleGetFile} base64 multipleFiles={false}>
                <Button variant='outlined' color='primary'>{'เลีอกรูปภาพ'}</Button>
              </ReactFileReader>
            </div>
          </div>
          <div className={classes.inputForm}>
            <Typography variant='title'>{'ข้อมูลทั่วไป'}</Typography>
            <Field name='isbn' placeholder='รหัสพรรณไม้' title='รหัสพรรณไม้' component={renderField} />
            <Field name='name' placeholder='ชื่อ' title='ชื่อ' component={renderField} />
            <Field name='general.scienceName' placeholder='ชื่อวิทยาศาสตร์' title='ชื่อวิทยาศาสตร์' component={renderField} />
            <Field name='general.familyName' placeholder='ชื่อวงศ์' title='ชื่อวงศ์' component={renderField} />
            <Field name='general.ordinaryName' placeholder='ชื่อสามัญ' title='ชื่อสามัญ' component={renderField} />
            <FieldArray name='general.nativeName' placeholder='ชื่อพื้นเมือง' title='ชื่อพื้นเมือง' component={renderFieldArray} />
            <Field name='general.characteristics' placeholder='ลักษณะวิสัย' title='ลักษณะวิสัย' textArea component={renderField} />
            <Field name='general.benefit' placeholder='ประโยชน์' title='ประโยชน์' textArea component={renderField} />
          </div>
        </CardContent>
      </Card>
    )
  }
}
