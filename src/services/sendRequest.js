import 'isomorphic-unfetch';

const URL = process.env.ROOT_URL || `https://swapi.dev/api/`;

export async function sendRequest(path, options = {}) {
    const headers = { ...(options.headers || {}), 'Content-type': 'application/json; charset=UTF-8' };

    const response = await fetch(`${URL}${path}`, {
        method: 'GET',
        ...options,
        headers,
    });
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data;
}
export async function sendMultipleRequest(paths, options = {}) {

    const headers = { ...(options.headers || {}), 'Content-type': 'application/json; charset=UTF-8' };
    const request = [];
    paths.forEach(path => {
        request.push(fetch(path.replace('http', 'https'), {
            method: 'GET',
            ...options,
            headers,
        }))
    });
    return new Promise((resolve, reject) => {
        Promise.all(request).then(values => {
            const promiseArray = values.map(async (value) => await value.json());
            Promise.all(promiseArray).then(fdata => {
                fdata.sort((a,b)=>{
                    return (new Date(a.release_date).getTime() - new Date(b.release_date).getTime()) 
                })
                resolve(fdata)
            })
        }).catch(err => {
            reject(err)
        });
    })
}
