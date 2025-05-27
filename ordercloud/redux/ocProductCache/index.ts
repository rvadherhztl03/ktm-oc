import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BuyerProduct, Categories, Category, Me, RequiredDeep } from 'ordercloud-javascript-sdk'
import { createOcAsyncThunk } from '../ocReduxHelpers'
import { OcCategoryListOptions, OcProductListOptions } from '../ocProductList'
import { OcRootState } from '../ocStore'
import { ICategoryProductAssignment } from '../../../types/ordercloud/ICategoryProductAssignment'

export const ocProductsAdapter = createEntityAdapter<RequiredDeep<BuyerProduct>>({
  selectId: (p) => p.ID,
})

export const ocCategoriesAdapter = createEntityAdapter<RequiredDeep<Category>>({
  selectId: (c) => c.ID,
})

export const ocCategoriesProductAssignmentAdapter = createEntityAdapter<
  RequiredDeep<ICategoryProductAssignment>
>({
  selectId: (c) => `${c.CatalogID}-${c.CategoryID}-${c.ProductID}`,
})

export const ocProductCacheSelectors = ocProductsAdapter.getSelectors<OcRootState>(
  (s) => s.ocProductCache.products
)

export const ocCategoryCacheSelectors = ocCategoriesAdapter.getSelectors<OcRootState>(
  (s) => s.ocProductCache.categories
)

export const ocCategoryProductAssignmentCacheSelectors =
  ocCategoriesProductAssignmentAdapter.getSelectors<OcRootState>(
    (s) => s.ocProductCache.categoriesProductAssignment
  )

export const listProducts = createOcAsyncThunk<RequiredDeep<BuyerProduct>[], OcProductListOptions>(
  'ocProducts/list',
  async (options) => {
    const response = await Me.ListProducts(options)
    return response.Items
  }
)

export const getProduct = createOcAsyncThunk<RequiredDeep<BuyerProduct>, string>(
  'ocProducts/get',
  async (productId) => {
    const response = await Me.GetProduct(productId)
    return response
  }
)

export const listCategories = createOcAsyncThunk<RequiredDeep<Category>[], OcCategoryListOptions>(
  'ocProducts/listCategories',
  async (options) => {
    const response = await Me.ListCategories(options)
    return response.Items
  }
)

export const listCategoriesAssignment = createOcAsyncThunk<
  RequiredDeep<ICategoryProductAssignment>[],
  string
>('ocProducts/listCategoriesAssignment', async (catalogId) => {
  const response = await Categories.ListProductAssignments(catalogId)
  return response.Items.map((item) => ({
    ...item,
    CatalogID: catalogId,
  }))
})

const ocProductCacheSlice = createSlice({
  name: 'ocProducts',
  initialState: {
    products: ocProductsAdapter.getInitialState(),
    categories: ocCategoriesAdapter.getInitialState(),
    categoriesProductAssignment: ocCategoriesProductAssignmentAdapter.getInitialState(),
    loading: false,
  },
  reducers: {
    cleanProductCache: (state) => {
      ocProductsAdapter.removeAll(state.products)
    },
    cacheProducts: (state, action: PayloadAction<RequiredDeep<BuyerProduct>[]>) => {
      ocProductsAdapter.upsertMany(state.products, action.payload)
    },
    cacheProduct: (state, action: PayloadAction<RequiredDeep<BuyerProduct>>) => {
      ocProductsAdapter.upsertOne(state.products, action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listProducts.fulfilled, (state, action) => {
      ocProductsAdapter.upsertMany(state.products, action.payload)
    })
    builder.addCase(getProduct.fulfilled, (state, action) => {
      ocProductsAdapter.upsertOne(state.products, action.payload)
    })
    builder.addCase(listCategories.pending, (state) => {
      state.loading = true
    })
    builder.addCase(listCategoriesAssignment.pending, (state) => {
      state.loading = true
    })
    builder.addCase(listCategories.fulfilled, (state, action) => {
      state.loading = false
      ocCategoriesAdapter.upsertMany(state.categories, action.payload)
    })
    builder.addCase(listCategoriesAssignment.fulfilled, (state, action) => {
      state.loading = false
      ocCategoriesProductAssignmentAdapter.upsertMany(
        state.categoriesProductAssignment,
        action.payload
      )
    })
  },
})

export const { cacheProducts, cacheProduct, cleanProductCache } = ocProductCacheSlice.actions

export default ocProductCacheSlice.reducer
