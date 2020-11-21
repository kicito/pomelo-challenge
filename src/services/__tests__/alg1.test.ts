import { transform } from '../alg1';
import mockingInput from '../../assets/alg1_in.json';

test('transforming input should match output in test case', () => {
	const result: Alg1InputElem[] = transform(mockingInput);
	expect(result).toHaveLength(1);
	expect(result[0].id).toBe(10);
	expect(result[0].level).toBe(0);
	for (const elem of result[0].children) {
		expect(elem.parent_id).toBe(10);
		expect(elem.level).toBe(1);
		if (elem.id == 12) {
			expect(elem.children).toHaveLength(2);
			for (const subElem of elem.children) {
				expect(subElem.level).toBe(2);
				expect(subElem.parent_id).toBe(elem.id);
				expect([17, 15]).toContain(subElem.id);
			}
		} else if (elem.id == 18) {
			expect(elem.children).toHaveLength(0);
		} else if (elem.id == 13) {
			expect(elem.children).toHaveLength(1);
			expect(elem.children[0].level).toBe(2);
			expect(elem.children[0].id).toBe(16);
			expect(elem.children[0].parent_id).toBe(13);
		} else {
			fail();
		}
	}
});
