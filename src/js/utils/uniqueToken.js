/**
 * Unique tokens, use a generator to always create unique tokens
 * token will always return a unique token
 */
function* UniqueToken(){
	let id = 1;
	while (true){
		++id;
		yield `bl${id}`;
	}
}

const tokenIterator = UniqueToken();
export const getUniqueToken = () => tokenIterator.next().value;