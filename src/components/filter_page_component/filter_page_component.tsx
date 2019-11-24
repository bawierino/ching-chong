import * as React from 'react';
import { Word } from '../../data/structures/word';
import { routerService } from '../../services/router_service';
import { DetailedWordCardComponent } from '../detailed_word_card_component';
import { WordCardComponent } from '../word_card_component';
import { FilterBar, getFilterBarApi } from './filter_bar';
import { useIntuitiveFilterPageScrolling } from './use_intuitive_filter_page_scrolling';
import { useForceUpdate } from '../../hooks/use_force_update';
import { useForceUpdateOnUrlChange } from '../../hooks/use_force_update_on_url_change';

export function FilterPageComponent(words: Word[]): JSX.Element {
	const forceUpdate = useForceUpdate();
	useForceUpdateOnUrlChange();

	const hasDetailedWord = routerService.hasPath();

	const { getResults, shouldHideMeaning, shouldHidePinYin } = getFilterBarApi();

	const results = !!getResults ? getFilterBarApi().getResults() : words;
	const hidePinYin = !!shouldHidePinYin ? shouldHidePinYin() : false;
	const hideMeaning = !!shouldHideMeaning ? shouldHideMeaning() : false;

	const { saveScrollTop } = useIntuitiveFilterPageScrolling(!hasDetailedWord);

	function renderResults(): JSX.Element {
		return (
			<React.Fragment>
				{results.map((result) => (
					<WordCardComponent
						id={result.id}
						onClick={(id) => {
							saveScrollTop();
							handleCardClick(id);
						}}
						{...result}
						key={result.id}
						hidePinYin={hidePinYin}
						hideMeaning={hideMeaning}
					/>
				))}
			</React.Fragment>
		);
	}

	function renderDetailedWord(): JSX.Element {
		if (hasDetailedWord) {
			const id = getDetailedWordId();
			return <DetailedWordCardComponent word={getWordById(id)} id={id} onSubCharacterClick={handleCardClick} />;
		} else {
			return undefined;
		}
	}

	function getWordById(id: string): Word {
		// check if word is in the results because the set is smaller than all words
		const wordFromResults = results.find((word) => word.id === id);
		if (wordFromResults) {
			return wordFromResults;
		} else {
			// check if word is in set of all words
			const wordFromAllWords = words.find((word) => word.id === id);
			if (wordFromAllWords) {
				return wordFromAllWords;
			} else {
				throw new Error(`Word for id ${id} not found`);
			}
		}
	}

	function handleCardClick(id: string): void {
		routerService.navigateToPath(id);
	}

	function getDetailedWordId(): string {
		if (hasDetailedWord) {
			return routerService.getPath();
		}
		return undefined;
	}

	return (
		<React.Fragment>
			<div className="filter-page">
				<FilterBar isBackButtonMode={hasDetailedWord} words={words} onFiltersChanged={forceUpdate} />
				<div className="words">{hasDetailedWord ? renderDetailedWord() : renderResults()} </div>
			</div>
		</React.Fragment>
	);
}
