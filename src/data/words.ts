import { Word } from './structures/word';
import { characters } from './characters';
import { hashify } from '../utils/hashify';

type RawWordsObject = { [propName: string]: Omit<Word, 'characters' | 'id'> };
type WordsObject = { [propName: string]: Word };

const rawWords: RawWordsObject = {
	你好: { meaning: 'hello' },
	再见: { meaning: [ 'bye', 'goodbye' ] },
	什么: { meaning: 'what', remarks: 'replace with word you are asking for' },
	一二三四: { meaning: '1, 2, 3, 4', remarks: 'IH AH SEN TZÜÜÜ' }
};

function buildWords(rawWords: RawWordsObject): WordsObject {
	const result: WordsObject = {};
	Object.entries(characters).forEach((entry) => {
		result[entry[0]] = { characters: [ entry[1] ], ...entry[1] };
	});
	Object.entries(rawWords).forEach((entry) => {
		result[entry[0]] = {
			...entry[1],
			characters: entry[0].split('').map((characterIdentifier) => characters[characterIdentifier]),
			id: hashify(entry[0])
		};
	});
	return result;
}

export const words = buildWords(rawWords);
