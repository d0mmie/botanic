import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import React from 'react'

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
  constructor (props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  static propTypes = {
    data: PropTypes.object
  }

  render () {
    return (
      <div style={{ marginLeft: 260 }}>
        { this.props.data.trees.map(tree => <TreeCard key={tree.id} {...tree} />) }
      </div>
    )
  }
}
