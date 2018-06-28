import { Button } from '@material-ui/core'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import React from 'react'

import Layout from '../../components/layout'
import SearchBox from '../../components/searchBox'
import TreeCard from '../../components/treeCard'

const ALL_TREE_QUERY = gql`
  query ALL_TREE_QUERY {
    trees:allTrees {
      ...TreeCard
    }
  }

  ${TreeCard.fragment}
`

@graphql(ALL_TREE_QUERY)
export default class Tree extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  render () {
    return (
      <Layout
        title='รายชื่อต้นไม้'
        extra={
          <React.Fragment>
            <SearchBox />
            <Button color='inherit'>{'เพิ่มต้นไม้'}</Button>
          </React.Fragment>
        }
      >
        <div style={{ padding: '8px 24px' }}>
          { this.props.data.trees.map(tree => <TreeCard key={tree.id} {...tree} />) }
        </div>
      </Layout>
    )
  }
}
