import React from 'react'
const DataContext = React.createContext({test:'test'})
export const DataProvider = DataContext.Provider
export default DataContext