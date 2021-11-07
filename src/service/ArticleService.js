import axios from "axios";
import BaseService from "./BaseService";

export default class ArticleService extends BaseService {
    subPath = "article";

    getTableUrl(queryParams = "") {
        return this.endpoint(this.subPath, queryParams);
    }

    getDataArticle(queryParams = "") {
        return axios.get(
            this.getTableUrl(queryParams)
        ).then(res => res.data)
    }

    createPosts(body) {
        return axios
            .post(
                this.endpoint(this.subPath),
                body
            )
            .then((res) => res.data);
    }

    getCountStatus(status) {
        return axios.get(
            this.endpoint(this.subPath, "/count?status=" + status)
        ).then(res => res.data)
    }

    deletePost(id) {
        return axios.delete(
            this.endpoint(this.subPath, "/" + id)
        ).then(res => res.data)
    }
}
