class ResumeService {

    constructor() {
        this.fullUrl = 'https://vue-http-b38a4-default-rtdb.asia-southeast1.firebasedatabase.app/resume.json';
        this.url = `https://vue-http-b38a4-default-rtdb.asia-southeast1.firebasedatabase.app/`;
    }
    insert(data){
        return fetch(this.fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                person: data
            })
        })
    }

    getAll() {
        return fetch(this.fullUrl).then(res => {
            if (!res.ok) {
                throw new Error('get All failed');
            }
            return res;
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    return Object.keys(data).map(key => {
                        return {
                            id: key,
                            ...data[key],
                        }
                    });
                }
            })
            .catch(e => {
                console.warn(e);
            })
    }

    delete(id) {
        return fetch(`${this.url}/resume/${id}.json`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Not deleted')
                }
                return response.json()
            })
            .catch(e => {
                console.warn(e)
            })
    }

    static getInstance() {
        const data = [];
        return function () {
            if (data.length > 0) {
                return data[0];
            } else {
                const obj = new ResumeService();
                data.push(obj);
                return obj;
            }
        }
    }
}

export const resumeInstance = ResumeService.getInstance();