import {test,expect} from '@playwright/test';

test('get request', async({request})=>{

    let resp = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    // console.log(await response.body());
    let respStatus = resp.status();
    let respStatusTxt = resp.statusText();
    let respHeaders = resp.headers();
    let respHeadersArray = resp.headersArray();
    
    let response = await resp.json();
    
    await expect(respStatus).toBe(200);
    await expect(respStatusTxt).toBe('OK');
    await expect(resp.ok()).toBeTruthy();
    await expect(response).toHaveProperty('userId',1);
    console.log(await response.body);
    await expect(response.body).toContain('suscipit');
    // await expect(response.body).toContainText('suscipit');

})