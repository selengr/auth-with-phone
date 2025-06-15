import type { getDictionary } from "./dictionary" 
export type TDictionary = Awaited<ReturnType<typeof getDictionary>>
