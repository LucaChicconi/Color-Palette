let colorsArray = []

// Objeto con traducciones
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

// Detectar idioma del navegador
function getClientLanguage() {
    const browserLanguage = navigator.language || navigator.userLanguage;
    const languageCode = browserLanguage.split('-')[0];
    return translations[languageCode] ? languageCode : 'en';
}

// Obtener idioma actual
let currentLanguage = getClientLanguage();

// Aplicar traducciones a la página
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translations[currentLanguage][key];
    });
}

// Aplicar traducciones al cargar la página
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
                <p class="color-code">${color.hex.value}</p>
                </div>
            </div>
            `;
        }
    ).join('');
}

document.getElementById('submit-btn').addEventListener('click', bringColors)

document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('color-code')) {
        const originalText = e.target.textContent;
        e.target.textContent = '¡Haz clic para copiar!';
        setTimeout(() => {
            e.target.textContent = originalText;
        }, 800);
    }
});

document.addEventListener('click', (e) => {
	if (e.target.classList.contains('color-code')) {
		const hexCode = e.target.textContent;
		navigator.clipboard.writeText(hexCode);
		
		const originalText = e.target.textContent;
		e.target.textContent = '¡Copiado!';
		
		setTimeout(() => {
			e.target.textContent = originalText;
		}, 800);
	}
});