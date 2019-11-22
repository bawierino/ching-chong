export const speechSynthesify: (message: string) => void = (message) => {
	const utterance = new SpeechSynthesisUtterance(message);
	utterance.voice = speechSynthesis.getVoices()[20];
	speechSynthesis.speak(utterance);
};
