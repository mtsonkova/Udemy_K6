import http from 'k6/http';
import {sleep, check} from 'k6';

export let options = {
   duration: '1m',
};

export default function () {
   let res = http.get('https://example.com');
   check(res, {
       'status is 200': (r) => r.status === 200,
   });
   sleep(1);
}