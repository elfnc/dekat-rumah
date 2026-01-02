import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1, // Only need 1 user to verify logic
    iterations: 1,
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
    // 1. Try to access PROTECTED route without session
    // We disable redirect following to check the 307 response from Middleware
    const params = { redirects: 0 };

    console.log(`Checking protected route: ${BASE_URL}/admin`);
    const resProtected = http.get(`${BASE_URL}/admin`, params);

    // Expecting 307 Temporary Redirect (standard NextAuth middleware behavior)
    check(resProtected, {
        'Protected route returns 307 (Redirect)': (r) => r.status === 307,
        'Redirects to login': (r) => r.headers['Location'] && r.headers['Location'].includes('signin')
    });

    if (resProtected.status !== 307) {
        console.error(`Expected 307, got ${resProtected.status}`);
    }

    // 2. Try to access PUBLIC route
    console.log(`Checking public route: ${BASE_URL}/`);
    const resPublic = http.get(`${BASE_URL}/`);

    check(resPublic, {
        'Public route returns 200': (r) => r.status === 200
    });
}
