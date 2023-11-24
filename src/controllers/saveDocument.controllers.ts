/*import { Request, Response } from "express";

export const saveDocument = async (req: Request, res: Response) => {
    const { doc_name, doc_description, doc_file, usr_id } = req.body;
    const document = await DocumentModel.saveDocument(
        doc_name,
        doc_description,
        doc_file,
        usr_id
    );
    if (document) {
        res.status(201).json({ message: "Documento creado con éxito" });
    } else {
        res.status(400).json({ message: "Error al crear el documento" });
    }
};*/