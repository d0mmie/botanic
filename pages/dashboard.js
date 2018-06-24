import React from 'react'
import Button from '@material-ui/core/Button'
import Link from 'next/link'

export default class Dashboard extends React.Component {
  render () {
    return (
      <div>
        <Link href={{ pathname: '/tree' }}>
          <Button>{'GO TO TREELIST'}</Button>
        </Link>
        {'Dashboard'}
      </div>
    )
  }
}
