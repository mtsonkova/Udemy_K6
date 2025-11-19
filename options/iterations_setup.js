import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    iterations: 50,
    vus:10,
};

export default function () {
    let res = http.get('https://example.com');
    check(res, {
        'is status 200': (r) => r.status === 200,
    });
    sleep(1);
}

