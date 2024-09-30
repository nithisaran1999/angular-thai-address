/**
 * Address database entry.
 *
 * (For storing raw data from address database)
 *
 * @export
 * @interface AddressEntry
 */
export default interface AddressEntry {
	/**
	 * District (ตำบล)
	 *
	 * @type {string}
	 */
	district: string;

	/**
	 * Amphoe (อำเภอ)
	 *
	 * @type {string}
	 */
	amphoe: string;

	/**
	 * Province (จังหวัด)
	 *
	 * @type {string}
	 */
	province: string;

	/**
	 * Zip Code (รหัสไปรษณีย์)
	 *
	 * @type {number}
	 */
	zipcode: number;

	/**
	 * Optional District Code (รหัสตำบล)
	 *
	 * @type {string | undefined}
	 */
	district_code?: string;

	/**
	 * Optional Amphoe Code (รหัสอำเภอ)
	 *
	 * @type {string | undefined}
	 */
	amphoe_code?: string;

	/**
	 * Optional Province Code (รหัสจังหวัด)
	 *
	 * @type {string | undefined}
	 */
	province_code?: string;
}
