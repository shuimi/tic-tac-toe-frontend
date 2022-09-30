import { NavigateFunction, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { updateQueryParamsWithoutNavigation } from "../tools/query-params";

export const useRouting = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const [searchParams] = useSearchParams()

  const go: NavigateFunction = navigate

  const up = () => navigate('..')
  const back = () => navigate(-1)
  const root = () => navigate('/')

  return {
    go: { up, back, root, to: go },
    queryParams: searchParams,
    updateParams: updateQueryParamsWithoutNavigation,
    location: location,
    params: params
  }
}