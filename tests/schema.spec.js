import {test,expect} from '@playwright/test';
import {Ajv} from 'ajv';

test('schema validation', async({request})=>{
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    const responseBody = await response.json();

    const jsonSchema = {
      type: "object",
      properties: {
        userId: {
          type: "integer",
        },
        id: {
          type: "integer",
        },
        title: {
          type: "string",
        },
        body: {
          type: "string",
        },
      },
      required: ["userId", "id", "title", "body"],
    };

    console.log(responseBody);

    const ajv = new Ajv();
    const validate = ajv.compile(jsonSchema);

    const result = validate(responseBody);

    await expect(result,JSON.stringify(validate.errors)).toBeTruthy();
})