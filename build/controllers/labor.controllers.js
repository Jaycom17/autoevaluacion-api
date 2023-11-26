"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLabor = exports.updateLabor = exports.showLaborList = exports.showLaborById = exports.showLaborByName = exports.createLabor = void 0;
const labor_model_1 = require("../models/labor.model");
const LaborModel = new labor_model_1.Labor();
const queryString = require('querystring');
const createLabor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tl_descripcion, lab_nombre, lab_horas } = req.body;
    const labor = yield LaborModel.createLabor(tl_descripcion, lab_nombre, lab_horas);
    if (!labor) {
        res.status(400).json({ status: 'error', message: 'Error al crear la labor' });
    }
    else {
        res.status(201).json({ status: 'ok', message: 'Labor creada correctamente' });
    }
});
exports.createLabor = createLabor;
const showLaborByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //En caso de que el nombre tenga espacios, estos se codifican para que no haya error
    const decodedName = queryString.unescape(req.params.name);
    const labor = yield LaborModel.showLaborByName(decodedName);
    if (labor === null) {
        res.status(500).json({ error: 'Error al buscar labor por nombre' });
    }
    else if (labor === false) {
        res.status(404).json({ message: 'Labor no encontrada por nombre' });
    }
    else {
        res.status(201).json(labor);
    }
});
exports.showLaborByName = showLaborByName;
const showLaborById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const labor = yield LaborModel.showLaborById(parseInt(req.params.id));
    if (labor === null) {
        res.status(500).json({ error: 'Error al buscar labor por ID' });
    }
    else if (labor === false) {
        res.status(404).json({ message: 'Labor no encontrada por ID' });
    }
    else {
        res.status(201).json(labor);
    }
});
exports.showLaborById = showLaborById;
const showLaborList = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const labor = yield LaborModel.showLaborList();
    if (labor === null) {
        res.status(500).json({ error: 'Error al buscar labor(es)' });
    }
    else if (labor === false) {
        res.status(404).json({ message: 'No se encontraron labores' });
    }
    else {
        res.status(201).json(labor);
    }
});
exports.showLaborList = showLaborList;
const updateLabor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tl_descripcion, lab_nombre, lab_horas } = req.body;
    const labor = yield LaborModel.updateLabor(parseInt(req.params.id), tl_descripcion, lab_nombre, lab_horas);
    if (labor === null) {
        res.status(500).json({ status: 'error', message: 'Error al actualizar la labor' });
    }
    else if (labor === false) {
        res.status(404).json({ status: 'error', message: 'Labor no encontrada para actualizar' });
    }
    else {
        res.status(201).json({ status: 'ok', message: 'Labor actualizada con éxito' });
    }
});
exports.updateLabor = updateLabor;
const deleteLabor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const labor = yield LaborModel.deleteLabor(parseInt(req.params.id));
    if (!labor) {
        res.status(400).json({ status: 'error', message: 'Error al eliminar la labor' });
    }
    else {
        res.status(201).json({ status: 'ok', message: 'Labor eliminada correctamente' });
    }
});
exports.deleteLabor = deleteLabor;
