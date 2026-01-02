import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '2m', target: 100 }, // Ramp up to 100 users
        { duration: '5m', target: 100 }, // Stay at 100 users
        { duration: '2m', target: 0 },   // Scale down
    ],
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
    const res = http.get(BASE_URL);
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}
