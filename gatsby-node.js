const path = require('path')

// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
    reporter.info(`Your Gatsby site has been built!`)
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const blogPostTemplate = path.resolve('src/templates/BlogPost.js')
    const result = await graphql(`
        query MyQuery {
            allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
                edges {
                    node {
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
    `)

    const posts = result.data.allMarkdownRemark.edges
    posts.forEach((post, index) => {
        const path = post.node.frontmatter.path
        createPage({
            path,
            component: blogPostTemplate,
            context: {
                title: post.node.title,
                pathSlug: path,
                prev: index === 0 ? null : posts[index - 1].node,
                next: index === (posts.length -1) ? null : posts[index + 1].node
            }
        })
    })
}