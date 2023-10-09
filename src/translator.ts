export type LocalizationSettings<K extends string> = {
	[key in K]?: Record<string, string>;
};

export class Translator<K extends string> {
	readonly defaultLanguage: K;
	readonly data: LocalizationSettings<K>;

	constructor(defaultLanguage: K, data: LocalizationSettings<K>) {
		this.data = data;
		this.defaultLanguage = defaultLanguage;
	}

	translate(key: string, language?: K): string | undefined {
		return this.data[language || this.defaultLanguage]?.[key];
	}

	t = this.translate;

	translateDocument(lang: K = this.getUserLang(), doc: Document = document) {
		const elements = doc.querySelectorAll('[translate]');
		elements.forEach((element) => {
			const key = element.getAttribute('translate-key');
			const attribute = element.getAttribute('translate-attribute');
			if (!key)
				throw 'Missing translate-key on element ' + JSON.stringify(element);

			if (attribute) {
				element.setAttribute(attribute, this.t(key, lang) || attribute);
			} else {
				element.innerHTML = this.t(key, lang) || element.innerHTML;
			}
		});
	}

	getUserLang(): K {
		const params = new URLSearchParams(window.location.search.toLowerCase());
		const lang = params.get('lang') as K;
		if (!lang || !this.data[lang]) {
			const navigatorLanguage = navigator.language.slice(-2).toLowerCase() as K;

			if (this.data[navigatorLanguage]) {
				params.set('lang', navigatorLanguage);
				window.location.search = params.toString();
				return navigatorLanguage;
			}

			return this.defaultLanguage;
		}

		return lang;
	}
}

export default Translator;
