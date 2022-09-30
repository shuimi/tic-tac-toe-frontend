export const updateQueryParamsWithoutNavigation = (
  queryKey: string,
  queryValue: string,
) => {
  const currentSearchParams = new URLSearchParams(window.location.search)
  const oldQuery = currentSearchParams.get(queryKey) ?? ''
  if (queryValue === oldQuery) return

  if (queryValue) {
    currentSearchParams.set(queryKey, queryValue)
  } else {
    currentSearchParams.delete(queryKey)
  }
  const newUrl = [window.location.pathname, currentSearchParams.toString()]
    .filter(Boolean)
    .join('?')

  window.history.replaceState(null, '', newUrl)
}
