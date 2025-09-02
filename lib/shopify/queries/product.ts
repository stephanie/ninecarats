import productFragment from '../fragments/product';

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductMediaQuery = /* GraphQL */ `
  query getProductMedia($handle: String!) {
    product(handle: $handle) {
      id
      handle
      media(first: 20) {
        edges {
          node {
            __typename
            ... on MediaImage {
              id
              image {
                url
                altText
                width
                height
              }
            }
            ... on Video {
              id
              sources {
                url
                format
                mimeType
              }
              previewImage {
                url
                altText
                width
                height
              }
            }
            ... on ExternalVideo {
              id
              embedUrl
              host
            }
          }
        }
      }
    }
  }
`;
