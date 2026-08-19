import {test,expect} from '@playwright/test';

let options = {
    headers:{
        'Content-Type':'application/json; charset=UTF-8'
    },
    data:{
    title: 'foo',
    body: 'bar',
    userId: 1,
    }
}

test('post request', async ({request})=>{
    let response = await request.post('https://jsonplaceholder.typicode.com/posts',options);
    let respStatus = response.status();
    let respText = response.statusText();
    let resp = response.ok();
    let respHeaders = response.headers();
    let respHeadersArray = response.headersArray();

    let responseBody = await response.json();

    await expect(responseBody).not.toBeNull();
    await expect(respStatus).toBe(201);
    await expect(respText).toContain('Created');
    await expect(resp).toBeTruthy();
    await expect(respHeaders).not.toBeNull();
    await expect(respHeadersArray).not.toBeNull();
    
    await expect(responseBody).toHaveProperty('body');
    console.log(responseBody.title);
    console.log(responseBody.body);
    console.log(responseBody);
})