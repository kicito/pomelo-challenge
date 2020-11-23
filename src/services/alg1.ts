import { Alg1Input, Alg1InputElem } from '../../types/typings';
import BinaryHeap from './BinaryHeap';

// flatten an Alg1Input to an array of Alg1InputElem
// note: this code use shallow copying method to create the result.
export function flatten(input: Alg1Input): Alg1InputElem[] {
	const result = [];
	for (const key in input) {
		const inputElemArray = input[key];
		for (const inputElem of inputElemArray) {
			result.push({ ...inputElem });
		}
	}
	return result;
}

export function transform(input: Alg1Input): Alg1InputElem[] {
    
    // Flatten the input into array
	const flattened: Alg1InputElem[] = flatten(input);
	const result: Alg1InputElem[] = [];

    // Construct an BinaryHeap of Alg1InputElem. Using inverse of level value as a scoring value.
    // The higher value(child nodes) will be place before the lower one(parent nodes). 
	const heap = new BinaryHeap<Alg1InputElem>(function (node: Alg1InputElem) {
		return -node.level;
	});

    // push input to heap
	for (const inputElem of flattened) {
		heap.push(inputElem);
	}

    // An array for storing element that needs to be linked to it's parent
    let missingParentElements: Alg1InputElem[] = [];
    
    // Here we use bottom up approach to construct the tree. so the elements in heap is only visited one. :)
	while (heap.size() > 0) {
		let currElem: Alg1InputElem = heap.pop();

		if (missingParentElements.length > 0) {
			// Find elements that is a child of this element
			const children = missingParentElements.filter(
				elem => elem.parent_id == currElem.id
            );
            // Perform linking between child/parent 
			currElem.children = currElem.children.concat(children);
            // Remove liked child from the missingParent array. 
			missingParentElements = missingParentElements.filter(
				elem => elem.parent_id != currElem.id
			);
		}

        // it is a child node, push to the missing parent array.
		if (currElem.level !== 0) {
			missingParentElements.push(currElem);
		}

		// it is a root node, push to the result array.
		if (currElem.level == 0) {
			result.push({ ...currElem });
		}
	}

	// TODO: throw an error when input is incomplete eg. missing parent node, missing root node. 
	return result;
}
