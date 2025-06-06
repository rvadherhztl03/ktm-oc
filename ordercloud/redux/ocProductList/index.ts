import { createSlice, SerializedError } from '@reduxjs/toolkit'
import {
  BuyerProduct,
  Filters,
  ListPageWithFacets,
  Me,
  MetaWithFacets,
  RequiredDeep,
  Searchable,
  Sortable,
} from 'ordercloud-javascript-sdk'
import { cacheProducts } from '../ocProductCache'
import { createOcAsyncThunk, OcThrottle } from '../ocReduxHelpers'

export interface OcProductListOptions {
  catalogID?: string
  categoryID?: string
  search?: string
  page?: number
  pageSize?: number
  depth?: string
  searchOn?: string[]
  sortBy?: string[]
  filters?: Filters
}

export interface OcCategoryListOptions {
  depth?: string
  catalogID?: string
  productID?: string
  search?: string
  searchOn?: Searchable<'Me.ListCategories'>
  sortBy?: Sortable<'Me.ListCategories'>
  page?: number
  pageSize?: number
  filters?: Filters
}

interface OcProductListState {
  loading: boolean
  error?: SerializedError
  options?: OcProductListOptions
  items?: RequiredDeep<BuyerProduct>[]
  meta?: MetaWithFacets
}

const initialState: OcProductListState = {
  loading: false,
}

interface SetListOptionsResult {
  response: ListPageWithFacets<BuyerProduct>
  options: OcProductListOptions
}

const productListThrottle: OcThrottle = {
  location: 'ocProductList',
  property: 'loading',
}

export const setListOptions = createOcAsyncThunk<SetListOptionsResult, OcProductListOptions>(
  'ocProductList/setOptions',
  async (options, ThunkAPI) => {
    const response = await Me.ListProducts(options)
    ThunkAPI.dispatch(cacheProducts(response.Items))
    return {
      response,
      options,
    }
  },
  productListThrottle
)

const ocProductListSlice = createSlice({
  name: 'ocProductList',
  initialState,
  reducers: {
    clearProductList: (state) => {
      state.loading = false
      state.options = undefined
      state.error = undefined
      state.items = undefined
      state.meta = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setListOptions.pending, (state) => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(setListOptions.fulfilled, (state, action) => {
      state.items = action.payload.response.Items as RequiredDeep<BuyerProduct>[]
      state.meta = action.payload.response.Meta
      state.options = action.payload.options
      state.loading = false
    })
    builder.addCase(setListOptions.rejected, (state, action) => {
      state.error = action.error
      state.loading = false
    })
  },
})

export const { clearProductList } = ocProductListSlice.actions

export default ocProductListSlice.reducer
