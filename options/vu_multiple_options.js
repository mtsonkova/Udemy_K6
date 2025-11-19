import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
       vusMax: 20,
    stages: [
        { duration: '0', target: 5 } , // immediately start with 5 users
        { duration: '30s', target: 10 }, // ramp up to 10 users
        { duration: '1m', target: 20 }, // ramp up to 20 users
        { duration: '1m', target: 20 },  // hold 20 users
        { duration: '30s', target: 10 },  // ramp down to 10 users
        { duration: '30s', target: 0 },  // ramp down to 0 users

    ],
};
export default function () {
    let res = http.get('https://example.com');
    check(res, {
        'is status 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
    });
    sleep(1);
}