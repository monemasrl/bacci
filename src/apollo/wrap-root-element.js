import React from "react";
import {ApolloProvider} from 'react-apollo'
import {client} from './client'
import gql from 'graphql-tag'



const APOLLO_QUERY = gql`{
   
   fiere {
    edges {
      node {
        title
      }
    }
  }
    
}`
export const wrapRootElement = ({ element }) => (<ApolloProvider data={APOLLO_QUERY} client={client}>
    {element}
</ApolloProvider>)