import * as React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"

import Layout from '../components/layout'

const Home = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <Layout pageTitle="Home Page">
      <div>
        {
          edges.map(edge => {
            const { frontmatter } = edge.node
            return (
              <div key={frontmatter.path}>
                <Link to={frontmatter.path}>
                  {frontmatter.title}
                </Link>
                
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}

export const query = graphql`
  query HomeQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            tags
            path
            date
          }
        }
      }
    }
  }
`

export default Home
