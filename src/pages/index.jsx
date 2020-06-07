import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { Header, PostList } from '../components';
import { Layout } from '../layouts';

const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 4rem 4rem 1rem 4rem;
  @media (max-width: 1000px) {
    margin: 4rem 2rem 1rem 2rem;
  }
  @media (max-width: 700px) {
    margin: 4rem 1rem 1rem 1rem;
  }
`;

const Index = ({ data }) => {
  // const { edges } = data.allMarkdownRemark;
  const speakers = data.allGoogleSpreadsheetSheet1.edges;
  return (
    <Layout>
      <Helmet title={'TecNerd'} />
      <Header title="TecNerd">Conociendo las nuevas tendencias tecnologicas</Header>
      <PostWrapper>
        {speakers.map(({ node }) => (
          <PostList
            key={node.id}
            cover={node.productImage.childImageSharp.fluid}
            path={node.website}
            title={node.name}
            //date={node.date}
            excerpt={node.topic}
          />
        ))}
      </PostWrapper>
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query {
    allGoogleSpreadsheetSheet1(
     sort: { fields: [date], order: DESC }
  ) {
      edges {
        node {
          id
          name
          website
          topic
          date
          productImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
