import React from 'react'

import AddTreeCharacteristicDataForm from '../../components/addTreeCharacteristicDataForm'
import AddTreeGeneralDataForm from '../../components/addTreeGeneralDataForm'
import Layout from '../../components/layout'

export default class AddTreePage extends React.Component {
  render () {
    return (
      <Layout title='เพิ่มต้นไม้'>
        <AddTreeGeneralDataForm />
        <AddTreeCharacteristicDataForm />
      </Layout>
    )
  }
}
