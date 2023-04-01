import axios from "@/utils/request";

const http = {
    get:(url,params)=>axios.get(url,{params}),
    post:(url,params)=>axios.post(url,params),
    delete:(url,params)=>axios.delete(url,params),
    upload:(url,file)=>axios.post(url,file,{
        headers:{'Content-Type':'multipart:form-data'}
    })
}
export default http;