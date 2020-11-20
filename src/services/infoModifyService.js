import axios from "axios";
import { token, URL } from './config'
export async function infoModify(payload) {
    var resp = await axios.put(`${URL}Modify/Info`,{
        headers: {
            authorization: token,
        },
        params: {
            userId: payload.userId,
            nickname: payload.nickname,
            gender: payload.gender,
            phoneNumber: payload.phoneNumber,
            majorId: payload.majorId,
            year: payload.year,
            degree: payload.degree,
        }
    });
    console.log("in getComment response", resp);
    return resp.data;
}