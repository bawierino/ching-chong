import React from 'react';
import './App.css';
import { FilterPageComponent } from './components/filter_page_component/filter_page_component';
import { words } from './data/words';

export function App() {
	return <div className="app">{FilterPageComponent(Object.values(words).map((value) => value))}</div>;
}
