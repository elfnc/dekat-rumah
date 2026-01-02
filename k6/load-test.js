import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 20 },
        { duration: '1m', target: 20 },
        { duration: '30s', target: 0 },
    ],
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
    const res = http.get(BASE_URL);

    check(res, { 'status was 200': (r) => r.status == 200 });

    // Visit product page
    const resProduct = http.get(`${BASE_URL}/produk`);
    check(resProduct, { 'status was 200': (r) => r.status == 200 });

    sleep(1);
}
