import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'

export default class AddTreeCharacteristicDataForm extends React.Component {
  render () {
    return (
      <Card elevation={0} style={{ margin: 8 }}>
        <CardContent>
          <Typography variant='title'>{'ลักษณะของพรรณไม้'}</Typography>
        </CardContent>
      </Card>
    )
  }
}
