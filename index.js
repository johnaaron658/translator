const fs = require('fs');
const path = require('path');

const reverse = false;
const extractTranslationMap = (translationContent) => {
    const initialMap = JSON.parse(translationContent);
    if (reverse) {
        const reversedMap = {};
        for (const key in initialMap) {
            reversedMap[initialMap[key]] = key;
        }
        return reversedMap;
    }
    return initialMap;
}

const translationFilePath = path.join(__dirname, 'translations.json');
const targetDirPath = path.join(__dirname, 'target');

const translationContent = fs.readFileSync(translationFilePath, {encoding: 'utf-8'});
const translationMap = extractTranslationMap(translationContent);

const targetFiles = fs.readdirSync(targetDirPath);

targetFiles.forEach(file => { 
    const filePath = path.join(targetDirPath, file);
    let fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});

    const translationKeys = Object.keys(translationMap).sort((a, b) => b.length - a.length);

    for (const key of translationKeys) {
        const toReplace = translationMap[key];
        fileContent = fileContent.split(key).join(toReplace);
    }

    fs.writeFileSync(filePath, fileContent);
});
