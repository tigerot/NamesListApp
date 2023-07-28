import axios from "axios";

const baseUrl = "http://localhost:1453/api"
export default {
    apiRequests(url = baseUrl + '/Names') {
        return {
            fetchAll: () => axios.get(url + '/getall'),
            fetchById: (nameId) => axios.get(url + '/getbyid' + nameId),
            create: (newRecord) => axios.post(url + '/add', newRecord),
            update: (updateRecord) => axios.put(url + '/update', updateRecord),
            delete: (deleteRecord) => axios.delete(url + '/delete', deleteRecord),
            incrementCount: (incrementRecord) => axios.put(url+ '/incrementcount', incrementRecord),
            //changeGroup: (changeGroupRecord) => axios.put(url+ '/changegroup', changeGroupRecord),
            //changeName: (changeNameRecord) => axios.put(url+ '/changename', changeNameRecord)
        }
    }
};