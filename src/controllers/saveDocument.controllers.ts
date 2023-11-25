import fs from 'fs';
import path from 'path';
import { savePath } from '../config';

export const saveDocument = async (req: any, res: any) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const sourcePath = req.file.path;
    const destinationPath = path.join(savePath, req.file.originalname);
    

    fs.rename(sourcePath, destinationPath, (error: any) => {
        if (error) {
            return res.status(500).send('Error while saving the file');
        }

        return res.status(201).send('File uploaded successfully');
    });
};

export const getDocument = async (req: any, res: any) => {
    console.log(req.params.filename);
    const filePath = path.join(savePath, req.params.filename);

    res.download(filePath, req.params.filename, (error: any) => {
        if (error) {
            console.log(error);
        }
    });
}