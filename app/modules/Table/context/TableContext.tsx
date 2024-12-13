import { createContext } from "vm";
import { TableContextProp } from "./interfaces";

export const TableContext = createContext({} as TableContextProp);