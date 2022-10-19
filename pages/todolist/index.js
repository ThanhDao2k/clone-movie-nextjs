import useSWR, {SWRConfig} from "swr"
import axios from "axios";
import {url} from "../../components/api/API";
import TodoList from "../../components/TodoList";

const fetcher = (url) => fetch(url).then((res) => res.json());

export async function getServerSideProps(context) {
    const la = await fetcher(url)
    return {
        props: {
            fallback: {
                [url]: la
            }
        }
    }
}

export function Todo() {
    const {data} = useSWR(url, fetcher())
    return <div>
        <TodoList data={data}/>
    </div>
}

function index({fallback}) {
    return <SWRConfig value={{fallback}}>
        <Todo/>
    </SWRConfig>
}

export default index