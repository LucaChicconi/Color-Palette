let colorsArray = []

const translations = {
    es: {
        monochrome: 'Monocromático',
        'monochrome-dark': 'Monocromático-Oscuro',
        'monochrome-light': 'Monocromático-Claro',
        analogic: 'Análogo',
        complement: 'Complementario',
        'analogic-complement': 'Análogo-Complementario',
        triad: 'Tríada',
        button: 'Obtener paleta de colores'
    },
    en: {
        monochrome: 'Monochrome',
        'monochrome-dark': 'Monochrome-dark',
        'monochrome-light': 'Monochrome-light',
        analogic: 'Analogic',
        complement: 'Complement',
        'analogic-complement': 'Analogic-Complement',
        triad: 'Triad',
        button: 'Get color scheme'
    }
};

function getClientLanguage() {
    const browserLanguage = navigator.language || navigator.userLanguage;
    const languageCode = browserLanguage.split('-')[0];
    return translations[languageCode] ? languageCode : 'en';
}

let currentLanguage = getClientLanguage();

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translations[currentLanguage][key];
    });
}

applyTranslations();

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
                <p class="color-code" data-hex-code="${color.hex.value}">${color.hex.value}</p>
                </div>
            </div>
            `;
        }
    ).join('');
}

document.getElementById('submit-btn').addEventListener('click', bringColors)

// Variables para rastrear timeouts activos
let activeTimeout = null;
let activeElement = null;

document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('color-code')) {

        if (activeTimeout) {
            clearTimeout(activeTimeout);
        }
        
        const originalText = e.target.getAttribute('data-hex-code');
        e.target.textContent = 'Copiar';
        activeElement = e.target;
        
        activeTimeout = setTimeout(() => {
            if (activeElement === e.target) {
                e.target.textContent = originalText;
                activeTimeout = null;
                activeElement = null;
            }
        }, 800);
    }
});

document.addEventListener('click', (e) => {
	if (e.target.classList.contains('color-code')) {
	
		if (activeTimeout) {
			clearTimeout(activeTimeout);
		}
		
		const hexCode = e.target.getAttribute('data-hex-code');
		navigator.clipboard.writeText(hexCode);
		
		e.target.textContent = '¡Copiado!';
		activeElement = e.target;
		
		activeTimeout = setTimeout(() => {
			if (activeElement === e.target) {
				e.target.textContent = hexCode;
				activeTimeout = null;
				activeElement = null;
			}
		}, 800);
	}
});