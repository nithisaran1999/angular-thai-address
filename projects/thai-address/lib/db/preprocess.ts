import AddressEntry from '../../types/AddressEntry';

/**
 * Preprocess data from JSON database.
 *
 * @param {any} data Data from JSON database.
 * @returns {AddressEntry[]} Processed data.
 */
export default function preprocess(data: any): AddressEntry[] {
	let lookup: string[] = [];
	let words: string[] = [];
	let expanded: AddressEntry[] = [];
	let useLookup = false;

	const translate = (text: any): string => {
		if (!useLookup) return text;

		if (typeof text === 'number') {
			text = lookup[text];
		}

		return text.replace(/[A-Z]/ig, (m: string) => {
			const ch = m.charCodeAt(0);
			return words[ch < 97 ? ch - 65 : 26 + ch - 97];
		});
	};

	if (data.lookup && data.words) {
		useLookup = true;
		lookup = data.lookup.split('|');
		words = data.words.split('|');
		data = data.data;
	}

	if (!Array.isArray(data) || !data.length || !Array.isArray(data[0])) {
		return data; // Return non-compacted database as is
	}

	// Process compacted database
	for (const provinces of data) {
		const startIndex = provinces.length === 3 ? 2 : 1;

		for (const amphoes of provinces[startIndex]) {
			for (const districts of amphoes[startIndex]) {
				const districtList = Array.isArray(districts[startIndex]) ? districts[startIndex] : [districts[startIndex]];

				for (const zipcode of districtList) {
					const entry: AddressEntry = {
						district: translate(districts[0]),
						amphoe: translate(amphoes[0]),
						province: translate(provinces[0]),
						zipcode,
					};

					if (startIndex === 2) { // Geographic database
						entry.district_code = districts[1] || undefined;
						entry.amphoe_code = amphoes[1] || undefined;
						entry.province_code = provinces[1] || undefined;
					}

					expanded.push(entry);
				}
			}
		}
	}

	return expanded;
}