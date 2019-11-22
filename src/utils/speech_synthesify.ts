let voice: SpeechSynthesisVoice | undefined;
function loadVoice(): void {
	voice = speechSynthesis.getVoices().reverse().find((v) => v.lang.includes('zh') && v.lang.includes('CN'));
}
loadVoice();
speechSynthesis.onvoiceschanged = (e) => {
	loadVoice();
	speechSynthesis.onvoiceschanged = null;
};

export const speechSynthesify: (message: string) => void = (message) => {
	if (canSpeechSynthesify()) {
		const utterance = new SpeechSynthesisUtterance(message);
		utterance.voice = voice as SpeechSynthesisVoice;
		speechSynthesis.speak(utterance);
	}
};

export const canSpeechSynthesify: () => boolean = () => {
	return 'speechSynthesis' in window && voice !== undefined;
};
