$(document).ready(function () {
	//Creates an array with all of dog breeds listed
	const generateBreedsArray = () => {
		const queryURL = 'https://dog.ceo/api/breeds/list/all';
		$.ajax({
			url: queryURL,
			method: 'GET'
		})
			.then((res) => {
				const puppersApi = res.message;
				let subBreedsArr = [];
				let breedsArr = [];

				// Used to seperate subbreeds and breeds
				for (const x in puppersApi) {
					switch (x) {
						case 'bulldog':
							for (let i = 0; i < puppersApi['bulldog'].length; i++) {
								subBreedsArr.push('bulldog/' + puppersApi['bulldog'][i]);
							}
							break;
						case 'hound':
							for (let i = 0; i < puppersApi['hound'].length; i++) {
								subBreedsArr.push('hound/' + puppersApi['hound'][i]);
							}
							break;
						case 'mastiff':
							for (let i = 0; i < puppersApi['mastiff'].length; i++) {
								subBreedsArr.push('mastiff/' + puppersApi['mastiff'][i]);
							}
							break;
						case 'mountain':
							for (let i = 0; i < puppersApi['mountain'].length; i++) {
								subBreedsArr.push('mountain/' + puppersApi['mountain'][i]);
							}
							break;
						case 'pointer':
							for (let i = 0; i < puppersApi['pointer'].length; i++) {
								subBreedsArr.push('pointer/' + puppersApi['pointer'][i]);
							}
							break;
						case 'poodle':
							for (let i = 0; i < puppersApi['poodle'].length; i++) {
								subBreedsArr.push('poodle/' + puppersApi['poodle'][i]);
							}
							break;
						case 'retriever':
							for (let i = 0; i < puppersApi['retriever'].length; i++) {
								subBreedsArr.push('retriever/' + puppersApi['retriever'][i]);
							}
							break;
						case 'schnauzer':
							for (let i = 0; i < puppersApi['schnauzer'].length; i++) {
								subBreedsArr.push('schnauzer/' + puppersApi['schnauzer'][i]);
							}
							break;
						case 'setter':
							for (let i = 0; i < puppersApi['setter'].length; i++) {
								subBreedsArr.push('setter/' + puppersApi['setter'][i]);
							}
							break;
						case 'sheepdog':
							for (let i = 0; i < puppersApi['sheepdog'].length; i++) {
								subBreedsArr.push('sheepdog/' + puppersApi['sheepdog'][i]);
							}
							break;
						case 'spaniel':
							for (let i = 0; i < puppersApi['spaniel'].length; i++) {
								subBreedsArr.push('spaniel/' + puppersApi['spaniel'][i]);
							}
							break;
						case 'terrier':
							for (let i = 0; i < puppersApi['terrier'].length; i++) {
								subBreedsArr.push('terrier/' + puppersApi['terrier'][i]);
							}
							break;
						default:
							breedsArr = Object.keys(puppersApi);
					}
				}

				// Array of values needed to be removed from breedsArr
				const removeValues = [
					'bulldog',
					'hound',
					'mastiff',
					'mountain',
					'pointer',
					'poodle',
					'retriever',
					'schnauzer',
					'setter',
					'sheepdog',
					'spaniel',
					'terrier'
				];
				// Remove specified values
				breedsArr = breedsArr.filter((i) => !removeValues.includes(i));
				// Combine arrays
				let puppersArr = subBreedsArr.concat(breedsArr);
				// Alphabetize array
				puppersArr.sort();

				// Generates a button for each array item
				for (let i = 0; i < puppersArr.length; i++) {
					const btnDiv = $(
						"<div class= 'btn-div col-lg-2 col-md-3 col-sm-4 col-6 text-left'>"
					);

					const add = $("<button class='btn breedBtn'>");
					add.attr('data-name', puppersArr[i]);
					add.attr('data-name', puppersArr[i]);

					add.text(puppersArr[i]);
					btnDiv.append(add);
					$('#breedsbuttons').append(btnDiv);
				}
			})
			.catch((error) => {
				// Handle error
				console.log(error);
			});
	};

	// Grabs pics from the dog ceo api and then displays them onto the screen
	function grabPics() {
		let breedType = $(this).attr('data-name');
		let queryURL1 = 'https://dog.ceo/api/breed/' + breedType + '/images';

		$.ajax({
			url: queryURL1,
			method: 'GET'
		}).then((res) => {
			let shuffledArr = [];

			// Clears div of any exisiting photos
			clearImages();

			for (let i = 0; i < 3; i++) {
				let imgArr = res.message;
				let randArr = imgArr[Math.floor(Math.random() * imgArr.length)];
				shuffledArr.push(randArr);
				let imgSrc = shuffledArr[i];

				let picsDiv = $("<div class= 'breed-pics col-md-4 text-center'>");
				let breedPics = $('<img>');

				breedPics.attr('class', 'img img-fluid pupperImg');
				breedPics.attr('src', imgSrc);

				//Displays the pics onto the screen
				picsDiv.append(breedPics);
				$('#picsHere').prepend(picsDiv);
			}

			$('html, body').animate(
				{
					scrollTop: $('.breedsDiv').offset().top
				},
				1000
			);
		});
	}

	// Clears images from picsHere div
	function clearImages() {
		$('#picsHere').empty();
	}

	// Calls api intially and generates buttons
	generateBreedsArray();

	// On click calls grabPics function
	$(document).on('click', '.breedBtn', grabPics);
});
