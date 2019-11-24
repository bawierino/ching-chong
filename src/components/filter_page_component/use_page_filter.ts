import { Word } from '../../data/structures/word';
import { joinify } from '../../utils/joinify';
import * as React from 'react';
import { hashify } from '../../utils/hashify';

export const usePageFilter: (
	initialResults: Word[],
	words: Word[],
	meaningFilterValue: string,
	pinYinFilterValue: string,
	useExactPinYin: boolean
) => { results: Word[]; resultsHash: string } = (
	initialResults: Word[],
	words: Word[],
	meaningFilterValue: string,
	pinYinFilterValue: string,
	useExactPinYin: boolean
) => {
	const [ results, setResults ] = React.useState(initialResults);
	React.useEffect(
		() => {
			let searchResults: Word[] = words;

			if (meaningFilterValue) {
				const searchTerm: string = meaningFilterValue.toLowerCase().replace(/ /g, '');

				searchResults = searchResults.filter((word) => {
					const candidate: string = (joinify(word.meaning) || '').toLowerCase().replace(/ /g, '');
					return candidate.includes(searchTerm);
				});
			}

			if (pinYinFilterValue) {
				const searchTerm: string = pinYinFilterValue
					.replace(/ /g, '')
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '');

				searchResults = searchResults.filter((word) => {
					const candidate: string = word.characters
						.map((character) => character.pinyin)
						.join('')
						.replace(/ /g, '')
						.normalize('NFD')
						.replace(/[\u0300-\u036f]/g, '')
						.toLowerCase();
					return useExactPinYin ? candidate === searchTerm : candidate.includes(searchTerm);
				});
			}

			setResults(searchResults);
		},
		[ results, useExactPinYin, meaningFilterValue, pinYinFilterValue, words ]
	);
	const resultsHash = hashify(JSON.stringify(results));
	return { results, resultsHash };
};
