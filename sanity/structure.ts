// @ts-expect-error: Suppressing error because we are manually adding the 'quantity' field back after using Omit
import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
// @ts-expect-error: Suppressing error because we are manually adding the 'quantity' field back after using Omit
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems())
