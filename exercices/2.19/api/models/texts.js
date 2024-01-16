// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, ('/../data/texts.json'));

function readAllTexts(level){
    const texts = parse(jsonDbPath);
    if(level === undefined) return texts;

    if(!validatedLevel(level)) return undefined;

    const filteredTexts = texts.filter((text) => text.level === level);
    return filteredTexts;
};

function validatedLevel(level){
    const existingLevels = ['easy', 'medium', 'hard'];
    return existingLevels.some((existingLevel) => existingLevel === level);
};


function readOneText(id){
    const texts = parse(jsonDbPath);

    const foundId = texts.find((text) => text.id === id);
    if(foundId < 0) return undefined;

    return texts[foundId];

};

function createOneText(content, level){
    const texts = parse(jsonDbPath);

    const newText = {
        id: uuidv4(),
        content,
        level,
    };

    texts.push(newText);
    
    serialize(jsonDbPath, texts);

    return newText;

};

function deleteOneText(id){
    const texts = parse(jsonDbPath);

    const foundID = texts.find((text) => text.id === id);
    if(foundID < 0) return undefined;

    const deletedTexts = texts.splice(foundID, 1);
    const deletedText = deletedTexts[0];

    serialize(jsonDbPath, texts);

    return deletedText;


};

function updateOneText(id, newValues){
    const texts = parse(jsonDbPath);

    const indexFound = texts.find((text) => text.id === id);

    if(indexFound < 0) return undefined;

    const updatedText = {...texts[indexFound], ...newValues };
    texts[indexFound] = updatedText;
    serialize(jsonDbPath, texts);

    return updatedText;
};

module.exports = {readAllTexts, readOneText, createOneText, deleteOneText, updateOneText, validatedLevel};