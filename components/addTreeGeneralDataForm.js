import { Card, CardContent, Typography, withStyles, Button, IconButton, Icon } from '@material-ui/core'
import { Field, FieldArray, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import React from 'react'
import ReactFileReader from 'react-file-reader'
import styled from 'styled-components'

import Input from './input'
import Label from './label'

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledAddNativeNameButton = styled(Button)`
  width: 100%;
`

const renderField = field => (
  <React.Fragment>
    { field.extra.title && <Label htmlFor={field.input.name}>{field.extra.title}</Label>}
    <InputContainer>
      <Input id={field.input.name} {...field.input} {...field.extra} />
      { field.extra.removeable && <IconButton onClick={field.extra.onRemove}><Icon>{'clear'}</Icon></IconButton> }
    </InputContainer>
  </React.Fragment>
)

const renderFieldArray = ({ fields, meta, extra }) => (
  <React.Fragment>
    <InputContainer>
      { extra.title && <Label>{extra.title}</Label> }
    </InputContainer>
    {
      fields.map((field, index) => (
        <Field key={index} name={field} component={renderField} extra={{ title: `${extra.title} #${index + 1}`, placeholder: extra.placeholder, removeable: true, onRemove: () => fields.remove(index) }} />
      ))
    }
    <StyledAddNativeNameButton onClick={() => fields.push()} variant='outlined' color='primary'><Icon>{'add'}</Icon> {'เพิ่มชื่อพื้นเมื่อง'}</StyledAddNativeNameButton>
  </React.Fragment>
)

renderFieldArray.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object),
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
    justifyContent: 'space-between'
  },
  controlPanel: {
    marginTop: 6
  }
})

@reduxForm({
  form: 'addTreeGeneral'
})
@withStyles(styles)
export default class AddTreeGeneralDataForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      preview: ''
    }
    this.handleGetFile = this.handleGetFile.bind(this)
  }

  static propTypes = {
    classes: PropTypes.object
  }

  handleGetFile (file) {
    this.setState({ preview: file.base64 })
  }

  render () {
    const { classes } = this.props
    return (
      <Card elevation={0} style={{ margin: 8 }}>
        <CardContent className={classes.cardContent}>
          <div className={classes.preview}>
            <img width={400} src={this.state.preview} />
            <div className={classes.controlPanel}>
              <ReactFileReader elementId='fileReader' fileTypes={['.jpg', '.png', '.JPG']} handleFiles={this.handleGetFile} base64 multipleFiles={false}>
                <Button variant='outlined' color='primary'>{'เลีอกรูปภาพ'}</Button>
              </ReactFileReader>
            </div>
          </div>
          <div className={classes.inputForm}>
            <Typography variant='title'>{'ข้อมูลทั่วไป'}</Typography>
            <Field name='isbn' extra={{ placeholder: 'รหัสพรรณไม้', title: 'รหัสพรรณไม้' }} component={renderField} />
            <Field name='name' extra={{ placeholder: 'ชื่อ', title: 'ชื่อ' }} component={renderField} />
            <Field name='general.scienceName' extra={{ placeholder: 'ชื่อวิทยาศาสตร์', title: 'ชื่อวิทยาศาสตร์' }} component={renderField} />
            <Field name='general.familyName' extra={{ placeholder: 'ชื่อวงศ์', title: 'ชื่อวงศ์' }} component={renderField} />
            <Field name='general.ordinaryName' extra={{ placeholder: 'ชื่อสามัญ', title: 'ชื่อสามัญ' }} component={renderField} />
            <FieldArray name='general.nativeName' extra={{ placeholder: 'ชื่อพื้นเมือง', title: 'ชื่อพื้นเมือง' }} component={renderFieldArray} />
            <Field name='general.characteristics' extra={{ placeholder: 'ลักษณะวิสัย', title: 'ลักษณะวิสัย' }} component={renderField} />
            <Field name='general.benefit' extra={{ placeholder: 'ประโยชน์', title: 'ประโยชน์' }} component={renderField} />
          </div>
        </CardContent>
      </Card>
    )
  }
}
