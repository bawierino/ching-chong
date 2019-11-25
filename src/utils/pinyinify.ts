import { Word } from '../data/structures/word';

export const pinyinify: (word: Word) => string = (word) => word.characters.map((c) => c.pinyin).join('');
