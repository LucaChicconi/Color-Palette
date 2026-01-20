let colorsArray = []

function bringColors(){
    const chosenColor = document.getElementById('chosen-color').value.replace('#','')
    const chosenScheme = document.getElementById('chosen-scheme').value
    console.log(chosenColor,chosenScheme)
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${chosenColor}&mode=${chosenScheme}`)
    .then(response => response.json())
    .then(data => {
    colorsArray = data.colors
    renderColors()
    }
    )
}


function renderColors(){
    return document.getElementById('color-palette').innerHTML = colorsArray.map(
        (color)=> {
            return `
            <div class ="container">
                <div class = "color" style = "background-color: ${color.hex.value}">
                <p>${color.hex.value}</p>
                </div>
            </div>
            `;
        }
    ).join('');
}

document.getElementById('submit-btn').addEventListener('click', bringColors)
document.addEventListener('click', (e) => {
	if (e.target.dataset.hex) {
		const spanEl = e.target.querySelector('span');
		spanEl.textContent = 'Copied!';

		navigator.clipboard.writeText(e.target.dataset.hex);

		setTimeout(() => {
			spanEl.textContent = 'Copy';
		}, 800);
	}
});