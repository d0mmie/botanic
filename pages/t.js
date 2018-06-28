import { connect } from 'react-redux'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { withStyles, CardContent, CardMedia, Card, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

import { openDialog } from '../store/reducers/imageDialog'
import CharacteristicsItem from '../components/characteristicsItem'
import ImgDialog from '../components/imageDialog'
import Layout from '../components/layout'

const FIND_TREE_BY_ID_QUERY = gql`
  query FIND_TREE_BY_ID_QUERY ($id: ID!){
    tree: Tree(id: $id) {
      id
      name
      isbn
      general {
        scienceName
        familyName
        ordinaryName
        nativeName
        characteristics
        benefit
      }
      image {
        id
        url
      }
      characteristics {
        ...characteristic_characteristicsItem
      }
    }
  }

  ${CharacteristicsItem.fragment}
`

const TypoFormat = ({ title, value, className }) => (
  <div className={className}>
    <Typography variant='title'>{title}</Typography>
    <Typography variant='subheading'>{value}</Typography>
  </div>
)

TypoFormat.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string
}

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    margin: '12px 0'
  },
  media: {
    paddingLeft: 400,
    height: '100%',
    cursor: 'pointer'
  },
  typo: {
    marginTop: 12
  },
  content: {
    padding: 16,
    margin: `0 16px`,
    display: 'flex',
    flexDirection: 'column',
    flex: 'auto'
  },
  container: {
    margin: 16
  }
})

@graphql(FIND_TREE_BY_ID_QUERY, {
  options: ({ query }) => ({ variables: { id: query.id } })
})
@connect(
  state => ({ store: state.imgDialog }),
  { openDialog }
)
@withStyles(styles)
export default class TreeDetail extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    classes: PropTypes.object,
    openDialog: PropTypes.func
  }

  static getInitialProps ({ query }) {
    return { query }
  }

  render () {
    const { data, classes, openDialog } = this.props
    return (
      <Layout title='ข้อมูลต้นไม้'>
        <div className={classes.container}>
          <Card elevation={0} className={classes.card}>
            <div>
              <CardMedia
                onClick={() => openDialog(data.tree.image.url)}
                className={classes.media}
                image={data.tree.image.url}
                title={data.tree.name}
              />
            </div>
            <CardContent className={classes.content}>
              <Typography variant='headline'>{`${data.tree.name} (${data.tree.isbn.replace(/(\d{1})(\d{5})(\d{3})(\d{3})/, '$1-$2-$3-$4')})`}</Typography>
              <Typography variant='subheading' color='textSecondary'><i>{data.tree.general.scienceName}</i></Typography>
              <div style={{ paddingTop: 12 }}>
                <TypoFormat title='ชื่อวงศ์' value={data.tree.general.familyName} className={classes.typo} />
                <TypoFormat title='ชื่อสามัญ' value={data.tree.general.ordinaryName} className={classes.typo} />
                <TypoFormat title='ชื่อพื้นเมือง' value={data.tree.general.nativeName.join(', ')} className={classes.typo} />
                <TypoFormat title='ลักษณะวิสัย' value={data.tree.general.characteristics} className={classes.typo} />
                <TypoFormat title='ประโยชน์' value={data.tree.general.benefit} className={classes.typo} />
              </div>
            </CardContent>
          </Card>
          <div>
            {data.tree.characteristics.map(char => <CharacteristicsItem key={char.id} {...char} />)}
          </div>
          <ImgDialog />
        </div>
      </Layout>
    )
  }
}
