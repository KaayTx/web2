const express = require('express');
const {readAllTexts, readOneText, createOneText, deleteOneText, updateOneText, validatedLevel} = require('../models/texts');

const router = express.Router();

router.get('/', (req, res) => {

    const level = req?.query?.level;

    const textFound = readAllTexts(level);

    if(textFound === undefined) return res.sendStatus(400);
    return res.json(textFound);

});

router.get('/:id', (req, res) => {

    const textFound = readOneText(req?.params?.id);
    
    if(!textFound) return res.sendStatus(400);
    return res.json(textFound);

});


router.post('/', (req, res) => {
    const content = req?.body?.content?.trim()?.length !== 0 ? req.body.content : undefined;
    const level = req?.body?.level?.trim()?.length !== 0 ? req.body.level : undefined;

    if(!content || !level) return res.sendStatus(400);

    const newText = createOneText(content, level);
    
    return res.json(newText);

});


router.delete('/:id', (req, res) => {
    const deletedText = deleteOneText(req?.params?.id);

    if(!deletedText) return res.sendStatus(404);

    return res.json(deletedText);

});

router.put('/:id', (req, res) => {
    const content = req?.body?.content;
    const level = validatedLevel(req?.body?.level) ? req.body.level : undefined;

    if(!req.body || !content || !content.trim() || !level) return res.sendStatus(400);

    const updatedText = updateOneText(req?.params?.id, req?.body );

    if(!updatedText) return res.sendStatus(404);

    return res.json(updatedText);

});

module.exports = router;