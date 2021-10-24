import ApolloCLient from "apollo-boost";
import fetch from 'isomorphic-fetch'

export const client = new ApolloCLient({

    uri: 'http://testwpmlgatsby.local/graphql/',
    fetch
})