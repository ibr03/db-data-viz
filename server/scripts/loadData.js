import fs from 'fs';
import { parse } from 'csv-parse';
import DataModel from '../models/dataModel.js';

const csvFilePath = './scripts/test_data.csv';

const loadData = async () => {
    try {
        const stream = fs.createReadStream(csvFilePath);
        const csvData = [];

        const parser = stream.pipe(
            parse({
                columns: true, // Treat first row as header
                skip_empty_lines: true, // Skip empty lines
            })
        );
        
        for await (const record of parser) {
            // Assuming your CSV columns match the model fields
            const { idx, idx_2, patent_id, patent_text, phase, Date } = record;
            const rowData = {
              idx: parseInt(idx),
              idx_2: parseInt(idx_2),
              patent_id: parseInt(patent_id),
              patent_text,
              phase,
              Date, // Assuming Date is a string in the CSV
            };
      
            // Check if data already exists
            const existingData = await DataModel.findOne({
              where: {
                patent_id: rowData.patent_id, // Assuming 'patent_id' is the unique identifier
              },
            });
      
            if (!existingData) {
              await DataModel.create(rowData);
              csvData.push(rowData);
            }
        }           

        console.log('Data loaded successfully');
        console.log(csvData[0]);
        console.log(csvData[1]);
    } catch (error) {
        console.error('Error loading data:', error);
    }
};

export default loadData;