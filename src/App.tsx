import React from 'react';
import './App.css';
import { FilterPageComponent } from './components/filter_page_component/filter_page_component';
import { words } from './data/words';
import { useRouterInitialization } from './hooks/use_router_initialization';
import { Word } from './data/structures/word';

export function App() {
	useRouterInitialization();

	return (
		<div className="app">
			{FilterPageComponent(
				Object.values(words).map((value) => value).sort((a, b) => {
					function getPinyin(word: Word): string {
						return word.characters.map((w) => w.pinyin).join('');
					}

					return getPinyin(a).localeCompare(getPinyin(b));
				})
			)}
		</div>
	);
}
