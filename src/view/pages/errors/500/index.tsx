import { ErrorLayout } from "../../../layouts";


function Error500Page() {
  return <ErrorLayout
    statusCode={500}
    title={"Бэкенд лёг"}
    description={"Наш искуственный интеллект не выдержал вашего напора..."}
    backButtonTitle={"..."}
  />
}

export default Error500Page;