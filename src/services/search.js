// 获取课程信息
import axios from "axios";
import { URL} from './config'
/**
 * 获取课程信息
 */
export async function search(payload) {
    console.log("in search", payload)
    var resp = await axios.get(`${URL}Search/SearchCourse`, {
            headers:{
                Authorization: payload.token,
            },
            params:{
               keywords: payload.searchKey,
            },
    });
    console.log("in result",resp);
    return resp.data.result;
}

