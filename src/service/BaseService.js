export default class BaseService {
    BASE_URL = 'http://localhost:8080/'

    endpoint(path, queryParams = '') {
        return this.BASE_URL + path + queryParams
    }

}
