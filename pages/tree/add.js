import { connect } from 'react-redux'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { IconButton, Icon, Snackbar } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import Router from 'next/router'

import AddTreeCharacteristicDataForm from '../../components/addTreeCharacteristicDataForm'
import AddTreeGeneralDataForm from '../../components/addTreeGeneralDataForm'
import dataURL2File from '../../libs/dataURL2File'
import Layout from '../../components/layout'
import promiseAllObject from '../../libs/promiseAllObject'

const ADD_TREE_MUTATION = gql`
  mutation ADD_TREE_MUTATION($isbn: String!, $name: String!, $general: TreegeneralGeneral!, $imageId: ID!, $characteristics: [TreecharacteristicsCharacteristic!]) {
    createTree(isbn: $isbn, name: $name, general: $general, imageId: $imageId, characteristics: $characteristics) {
      id
    }
  }
`

@graphql(ADD_TREE_MUTATION, {
  name: 'addTreeMutation'
})
@connect(
  state => ({ addTreeState: state.addTree, addTreeFormState: state.form })
)
export default class AddTreePage extends React.Component {
  constructor (props) {
    super(props)
    this.addTree = this.addTree.bind(this)
    this.state = {
      open: false,
      message: ''
    }
  }
  static propTypes = {
    addTreeState: PropTypes.object,
    addTreeFormState: PropTypes.object,
    addTreeMutation: PropTypes.func
  }

  async addTree () {
    const fileEndPoint = 'https://api.graph.cool/file/v1/cjipk70un028r0164ug36tupw'
    const primaryFormData = new FormData()
    primaryFormData.append('data', dataURL2File(this.props.addTreeState.files.primary))
    const characteristicsFormData = Object.values(this.props.addTreeState.files.characteristics).map(file => {
      const fileFormData = new FormData()
      fileFormData.append('data', dataURL2File(file))
      return fileFormData
    })

    const AllPromise = {
      primary: fetch(fileEndPoint, { method: 'POST', body: primaryFormData }).then(res => res.json()),
      characteristics: Promise.all(characteristicsFormData.map(formData => fetch(fileEndPoint, { method: 'POST', body: formData }).then(res => res.json())))
    }
    this.setState({ open: true, message: '1/2 กำลังอัพโหลดรูปภาพ' })
    const uploadFileResponse = await promiseAllObject(AllPromise).then(res => {
      this.setState({ open: true, message: 'อัพโหลดรูปภาพสำเร็จ' })
      return res
    })

    const { addTreeGeneral: { values: { isbn, name, general } }, addTreeCharacteristic: { values: { characteristics } } } = this.props.addTreeFormState

    this.setState({ open: true, message: '2/2 กำลังเพิ่มข้อมูลต้นไม้' })
    this.props.addTreeMutation({
      variables: {
        isbn,
        name,
        general,
        imageId: uploadFileResponse.primary.id,
        characteristics: characteristics.map((val, key) => ({ ...val, imageId: uploadFileResponse.characteristics[key].id }))
      }
    }).then(() => {
      this.setState({ open: true, message: 'เพิ่มต้นไม้แล้ว' })
      Router.push('/tree')
    })
  }

  render () {
    const { open, message } = this.state
    return (
      <Layout title='เพิ่มต้นไม้' extra={<IconButton color='inherit' onClick={this.addTree}><Icon>{'done'}</Icon></IconButton>}>
        <AddTreeGeneralDataForm />
        <AddTreeCharacteristicDataForm />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={open}
          onClose={() => this.setState({ open: false })}
          message={<span>{message}</span>}
        />
      </Layout>
    )
  }
}
