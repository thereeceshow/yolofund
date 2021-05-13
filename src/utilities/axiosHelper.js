import axios from 'axios'

export function axiosHelper(props) {
    const {
        method = 'get',
        url = '/',
        data = {},
        token = '',
        successMethod = r => console.log(r),
        failureMethod = e => console.log(e),
    } = props;

    const apiUrl = 'https://yolo-reece.codeanyapp.com'

    return axios({
        method,
        url: apiUrl + url,
        headers: {
            'Authorization':  'Bearer ' + token,
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        },
        data
    })
    .then(successMethod)
    .catch(failureMethod)
}