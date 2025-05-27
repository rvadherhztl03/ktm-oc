import { CategoryProductAssignment } from 'ordercloud-javascript-sdk'

export type ICategoryProductAssignment = CategoryProductAssignment & {
  CatalogID: string // added to differentiate between category assignments of different catalogs
}
