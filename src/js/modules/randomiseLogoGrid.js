
const enterpriseLogos = document.getElementById('js-enterprise-logos');

if ( enterpriseLogos !== null ){
	const imgs = Array.from(enterpriseLogos.querySelectorAll('img'));

	// fisher yates algorithm (1938)
	const shuffleArray = (array) => {
		for(let i = (array.length - 1); i > 0; i--){
			const j = Math.floor(Math.random() * i);
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	};

	// shuffle them!
	shuffleArray(imgs);

	// rebuild DOM in new order
	imgs.forEach( img => {
		enterpriseLogos.append( img );
	});
}


