import {test,expect} from '@playwright/test';
import {parse} from 'csv-parse/sync';
import fs from 'fs';

test.describe('parking lot cost', ()=>{
  const testData = parse(fs.readFileSync('./test-data/parking.csv','utf-8'),{columns:true,skip_empty_lines:true});
  for (let data of testData){
    test(`test ${data.testName}`, async ({request})=>{
          let options = {
            headers:{'Content-Type':'application/json'},
            data:JSON.stringify({
            parkType: data.parkingLot,
            entryDate: data.startDate+'T'+data.startTime,
            exitDate: data.endDate+'T'+data.endTime
            })
          };

          const response = await request.post('https://practice.expandtesting.com/webpark/calculate-cost', options);

          // console.log(response.status());
          // console.log(response.statusText());
          // console.log(response.headersArray());
          // console.log(response.ok());

          const responseBody = await response.json();

          // console.log(responseBody);

          await expect(responseBody.cost).toEqual(parseInt(data.expectedResult));
      })
    }
})