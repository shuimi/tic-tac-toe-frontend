import { ErrorLayout } from "../../../layouts";


function Error404Page() {
  return <ErrorLayout
    statusCode={404}
    title={"Ой... а я куда-то еду..."}
    description={"Страницы не существует"}
    backButtonTitle={"Хочу домой"}
  />
}

export default Error404Page;