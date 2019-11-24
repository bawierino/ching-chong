import * as React from 'react';
import { Word } from '../../data/structures/word';
import { useCheckbox } from '../../hooks/use_checkbox';
import { useTextInput } from '../../hooks/use_text_input';
import { DetailedWordCardComponent } from '../detailed_word_card_component';
import { WordCardComponent } from '../word_card_component';
import { usePageFilter } from './use_page_filter';
import { routerService } from '../../services/router_service';
import { useScrollTopPersistance } from '../../hooks/use_scroll_top_persistance';

export function FilterPageComponent(words: Word[]): JSX.Element {
	const hasDetailedWord = routerService.hasPath();

	const { saveScrollTop } = useScrollTopPersistance(!hasDetailedWord);

	const meaningFilterTextInput = useTextInput('');
	const pinYinFilterTextInput = useTextInput('');
	const exactPinYinCheckbox = useCheckbox(false);
	const hidePinYinCheckbox = useCheckbox(false);
	const hideMeaningCheckbox = useCheckbox(false);

	const results = usePageFilter(
		[],
		words,
		meaningFilterTextInput.value,
		pinYinFilterTextInput.value,
		exactPinYinCheckbox.checked
	);

	function renderPageFilters(): JSX.Element {
		return (
			<div className="filter-bar">
				{hasDetailedWord ? (
					<button onClick={routerService.navigateBack}>←</button>
				) : (
					<React.Fragment>
						{
							<button disabled={!canResetFilters()} onClick={resetFilters}>
								Reset filters
							</button>
						}
						<input
							placeholder="Filter by meaning"
							onChange={meaningFilterTextInput.onChange}
							value={meaningFilterTextInput.value}
							type={meaningFilterTextInput.type}
						/>
						<input
							placeholder="Filter by pin yin"
							onChange={pinYinFilterTextInput.onChange}
							value={pinYinFilterTextInput.value}
							type={pinYinFilterTextInput.type}
						/>
						<input
							checked={exactPinYinCheckbox.checked}
							type={exactPinYinCheckbox.type}
							onChange={exactPinYinCheckbox.onChange}
							title="Enable exact pinyin filtering. Ignores tones."
						/>
						<input
							checked={hidePinYinCheckbox.checked}
							type={hidePinYinCheckbox.type}
							onChange={hidePinYinCheckbox.onChange}
							title="Hide pinyin"
						/>
						<input
							checked={hideMeaningCheckbox.checked}
							type={hideMeaningCheckbox.type}
							onChange={hideMeaningCheckbox.onChange}
							title="Hide meaning"
						/>
					</React.Fragment>
				)}
			</div>
		);
	}

	function canResetFilters(): boolean {
		return (
			!!meaningFilterTextInput.value ||
			!!pinYinFilterTextInput.value ||
			!!exactPinYinCheckbox.checked ||
			!!hideMeaningCheckbox.checked ||
			!!hidePinYinCheckbox.checked
		);
	}

	function resetFilters(): void {
		if (canResetFilters()) {
			meaningFilterTextInput.setValue('');
			pinYinFilterTextInput.setValue('');
			exactPinYinCheckbox.setChecked(false);
			hidePinYinCheckbox.setChecked(false);
			hideMeaningCheckbox.setChecked(false);
		}
	}

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
						hidePinYin={hidePinYinCheckbox.checked}
						hideMeaning={hideMeaningCheckbox.checked}
					/>
				))}
			</React.Fragment>
		);
	}

	function renderDetailedWord(): JSX.Element {
		if (hasDetailedWord) {
			const id = getDetailedWordId();
			return (
				<DetailedWordCardComponent
					word={getWordById(id)}
					id={id}
					onSubCharacterClick={(id) => {
						handleCardClick(id);
					}}
				/>
			);
		} else {
			return <React.Fragment />;
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
		document.documentElement.scrollTop = 0;
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
				{renderPageFilters()}
				<div className="words">{hasDetailedWord ? renderDetailedWord() : renderResults()} </div>
			</div>
		</React.Fragment>
	);
}
