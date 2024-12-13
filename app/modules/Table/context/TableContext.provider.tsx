import { TableContext } from "./TableContext"
import { TableContextProviderProps } from "./interfaces"

const TableContextProvider = ({children}: TableContextProviderProps) => {
  return (
    <TableContext.Provider value={{}}>
        {children}
    </TableContext.Provider>
  )
}

export default TableContextProvider
