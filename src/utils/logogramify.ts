import { Word } from '../data/structures/word';

export const logogramify: (word: Word) => string = (word) => word.characters.map((c) => c.logogram).join('');
