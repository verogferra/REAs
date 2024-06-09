// BatexeGo v3 Juan José de Haro

// Define los textos que se ven en pantalla. Reemplazar el texto entre comillas

  // Textos del menú desplegable
   const defaultText = 'Parámetros por defecto:'; //Descripción de la opción por defecto
    const standardText = 'Fuente estándar'; // Fuente original del documento

    const dyslexicDesc = 'Dislexia:'; // Descripción de la opción OpenDyslexic
    const dyslexicText = 'OpenDyslexic';

    const hyperlegibleDesc = 'Deficiencias visuales:'; // Descripción de la opción Atkinson Hyperlegible
    const hyperlegibleText = 'Atkinson Hyperlegible';

    const highLegibilityDesc = 'Alta legibilidad:'; // Descripción de las opciones de alta legibilidad
    const opensansText = 'OpenSans';
    const robotoText = 'Roboto';
    const latoText = 'Lato';
    const montserratText = 'Montserrat';

  // Botones aumentar y disminuir fuente
    const increaseFontText = 'A+'; // Botón para incrementar la fuente
    const increaseFontTitle = 'Incrementa la fuente'; // Texto emergente al pasar el ratón

    const decreaseFontText = 'A-'; // Botón para reducir la fuente
    const decreaseFontTitle = 'Reduce la fuente'; // Texto emergente al pasar el ratón

  // Botón para traducir
    const translateText = '🌐'; // Texto para el botón de traducción de Google
    const translateTitle = 'Traduce la página'; // Texto emergente al pasar el ratón

  // Botón para leer / detener la lectura en voz alta
    let readText = 'Leer'; // Botón para leer en voz alta el contenido de la página
    const readTextTitle ='Lee en voz alta la selección o la página entera'; // Texto emergente al pasar el ratón

    const stopText = 'Detener'; // Texto del botón para detener la lectura
    const stopTextTitle = 'Detiene la lectura'; // Texto emergente al pasar el ratón

  // Botones para que los botones estén siempre visibles
    let floatingFix = 'Fijar'; // Texto del botón flotante cuando está sobre el texto
    let floatingFixTitle = 'Fija la barra de botones en la parte superior'; // Texto emergente al pasar el ratón

    let floatingFloat = 'Flotar'; //Texto del botón flotante cuando está fijo en la parte superior
    let floatingFloatTitle = 'La barra permanecerá siempre visible';


  // Enlace +Info
    const infoText = '+Info'; // Texto del enlace +Info
    const infoTextLink = 'https://batexego.bilateria.org'; // Destino del enlace de +Info

// Fin


  readText = `${readText} (${document.documentElement.lang})`; //Se añade el idioma al botón Leer


  let originalFont;
  let currentFontSize;
  let originalFontSize;
  let isReading = false;
  let utterance = new SpeechSynthesisUtterance();
  let googleTranslateWidgetVisible = localStorage.getItem('googleTranslateWidgetVisible');

  function setFont(font) {
  document.body.style.fontFamily = font;
  localStorage.setItem('font', font);
  }

  function setFontSize(size) {
  currentFontSize = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'));
  currentFontSize += size;
  document.body.style.fontSize = currentFontSize + 'px';
  localStorage.setItem('fontSize', currentFontSize + 'px');
  }



function toggleGoogleTranslateWidget() {
  if (!googleTranslateWidgetVisible) {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.id = 'google-translate-script';
    document.head.appendChild(script);

    const googleTranslateElement = document.createElement('div');
    googleTranslateElement.id = 'google_translate_element';
    googleTranslateElement.style.position = 'fixed';
    googleTranslateElement.style.top = '0';
    googleTranslateElement.style.right = '0';
    googleTranslateElement.style.zIndex = '1000';
    document.body.appendChild(googleTranslateElement);

    window.googleTranslateElementInit = function() {
      new google.translate.TranslateElement({pageLanguage: 'auto', layout: google.translate.TranslateElement.FloatPosition.TOP_RIGHT}, 'google_translate_element');
    };

    googleTranslateWidgetVisible = true;

  } else {
    const script = document.getElementById('google-translate-script');
    script.remove();

    const googleTranslateElement = document.getElementById('google_translate_element');
    googleTranslateElement.remove();

    googleTranslateWidgetVisible = false;
  }
  localStorage.setItem('googleTranslateWidgetVisible',googleTranslateWidgetVisible);
}




  document.addEventListener('DOMContentLoaded', () => {

    googleTranslateWidgetVisible = JSON.parse(localStorage.getItem('googleTranslateWidgetVisible'));
  if(googleTranslateWidgetVisible) {
    googleTranslateWidgetVisible = false;
    toggleGoogleTranslateWidget();
  }



    originalFont = window.getComputedStyle(document.body).getPropertyValue('font-family');
    localStorage.setItem('originalFont', originalFont);
    let font = localStorage.getItem('font');
    if (!font) {
    font = originalFont;
    }
    document.body.style.fontFamily = font;

    let fontSize = localStorage.getItem('fontSize');
    originalFontSize = window.getComputedStyle(document.body).getPropertyValue('font-size');
    localStorage.setItem('originalFontSize', originalFontSize);
    if (!fontSize) {
    fontSize = originalFontSize
    localStorage.setItem('fontSize', fontSize);
    }
    document.body.style.fontSize = fontSize;

    const fontButtonContainer = document.createElement('div');
    fontButtonContainer.classList.add('fontButtonContainer');

    const selectContainer = document.createElement('div');
    selectContainer.classList.add('select-container');
    const select = document.createElement('select');
    select.classList.add('z-index');
    const standardOption = document.createElement('option');
    standardOption.value = 'standard';
    standardOption.text = standardText;

    const defaultFontOptGroup = document.createElement('optgroup');
    defaultFontOptGroup.label = defaultText;
    defaultFontOptGroup.appendChild(standardOption);

    select.appendChild(defaultFontOptGroup);


    const dyslexicOption = document.createElement('option');
    dyslexicOption.value = 'dyslexic';
    dyslexicOption.text = dyslexicText;
    select.add(dyslexicOption);

    const dyslexicOptGroup = document.createElement('optgroup');
    dyslexicOptGroup.label = dyslexicDesc;
    dyslexicOptGroup.appendChild(dyslexicOption);
    select.appendChild(dyslexicOptGroup);

    const hyperlegibleOption = document.createElement('option');
    hyperlegibleOption.value = 'hyperlegible';
    hyperlegibleOption.text = hyperlegibleText;
    select.add(hyperlegibleOption);

    const hyperlegibleOptGroup = document.createElement('optgroup');
    hyperlegibleOptGroup.label = hyperlegibleDesc;
    hyperlegibleOptGroup.appendChild(hyperlegibleOption);
    select.appendChild(hyperlegibleOptGroup);

    const opensansOption = document.createElement('option');
    opensansOption.value = 'Open Sans';
    opensansOption.text = opensansText;
    select.add(opensansOption);

    const robotoOption = document.createElement('option');
    robotoOption.value = 'Roboto';
    robotoOption.text = robotoText;
    select.add(robotoOption);

    const latoOption = document.createElement('option');
    latoOption.value = 'Lato';
    latoOption.text = latoText;
    select.add(latoOption);

    const montserratOption = document.createElement('option');
    montserratOption.value = 'Montserrat';
    montserratOption.text = montserratText;
    select.add(montserratOption);


    const highLegibilityOptGroup = document.createElement('optgroup');
    highLegibilityOptGroup.label = highLegibilityDesc;
    highLegibilityOptGroup.appendChild(latoOption);
    highLegibilityOptGroup.appendChild(montserratOption);
    highLegibilityOptGroup.appendChild(opensansOption);
    highLegibilityOptGroup.appendChild(robotoOption);



    select.appendChild(highLegibilityOptGroup);

    // Seleccionar la opción correspondiente al cargar la página
    if (font === originalFont) { // Nueva condición
    select.selectedIndex = 0; // Nueva línea
    } else if (font === 'OpenDyslexic') {
    select.selectedIndex = 1;
    } else if (font === 'Atkinson Hyperlegible') {
    select.selectedIndex = 2;
    } else if (font === 'Roboto') {
    select.selectedIndex = 6;
    } else if (font === 'Lato') {
    select.selectedIndex = 3;
    } else if (font === 'Open Sans') {
    select.selectedIndex = 5;
    } else if (font === 'Montserrat') {
    select.selectedIndex = 4;
    }

    select.addEventListener('change', () => {
    const font = select.value;
    if (font === 'standard') {
    setFont(originalFont);
    fontSize = originalFontSize;
    localStorage.setItem('fontSize', fontSize);
    document.body.style.fontSize = localStorage.getItem('originalFontSize');
    } else if (font === 'dyslexic') {
    setFont('OpenDyslexic');
    } else if (font === 'hyperlegible') {
    setFont('Atkinson Hyperlegible');
    } else if (font === 'Open Sans') {
    setFont('Open Sans');
    } else if (font === 'Roboto') {
    setFont('Roboto');
    } else if (font === 'Lato') {
    setFont('Lato');
    }  else if (font === 'Montserrat') {
    setFont('Montserrat');
    }
    });

    selectContainer.appendChild(select);
    fontButtonContainer.appendChild(selectContainer);


    const increaseFontButton = document.createElement('button');
    increaseFontButton.classList.add('font-button');
    increaseFontButton.textContent = increaseFontText;
    increaseFontButton.setAttribute('title', increaseFontTitle);
    increaseFontButton.addEventListener('click', () => setFontSize(1));
    fontButtonContainer.appendChild(increaseFontButton);

    const decreaseFontButton = document.createElement('button');
    decreaseFontButton.classList.add('font-button');
    decreaseFontButton.textContent = decreaseFontText;
    decreaseFontButton.setAttribute('title', decreaseFontTitle);
    decreaseFontButton.addEventListener('click', () => setFontSize(-1));
    fontButtonContainer.appendChild(decreaseFontButton);

    const translateButton = document.createElement('button');
    translateButton.classList.add('font-button');
    translateButton.textContent = translateText;
    translateButton.setAttribute('title', translateTitle);
    translateButton.addEventListener('click', toggleGoogleTranslateWidget);
    fontButtonContainer.appendChild(translateButton);

  // Botón para leer en voz alta
    const readButton = document.createElement('button');
    readButton.classList.add('font-button');
    readButton.textContent = readText;
    readButton.setAttribute('title', readTextTitle);

    readButton.addEventListener('click', () => {
    let selectedText = window.getSelection().toString();
    let text = '';
    let lang = document.documentElement.lang;
    if (selectedText !== '') {
      text = selectedText;
      let selectedNode = window.getSelection().anchorNode;
      while (selectedNode && selectedNode.nodeType !== Node.ELEMENT_NODE) {
        selectedNode = selectedNode.parentNode;
      }
      if (selectedNode) {
        const selectedLang = selectedNode.getAttribute('lang');
        if (selectedLang) {
          lang = selectedLang;
        }
      }
    } else {
      text = document.body.innerText;
      const bodyLang = document.body.getAttribute('lang');
      if (bodyLang) {
        lang = bodyLang;
      }
    }

    utterance.lang = lang;
    utterance.text = text;

    if (!isReading) {
      isReading = true;
      readButton.textContent = `${stopText} (${lang})`;
      readButton.setAttribute('title', stopTextTitle);
      speechSynthesis.speak(utterance);
    } else {
      isReading = false;
      readButton.textContent = readText;
      readButton.setAttribute('title', readTextTitle);
      speechSynthesis.cancel();
    }

    utterance.addEventListener('end', () => {
      isReading = false;
      readButton.textContent = readText;
      readButton.setAttribute('title', readTextTitle);
    });
  });

    fontButtonContainer.appendChild(readButton);

  // Botón para que la barra esté siempre visible
    const floatingButton = document.createElement('button');
    floatingButton.classList.add('font-button');
    floatingButton.textContent = floatingFloat;
    floatingButton.setAttribute('title', floatingFloatTitle);
    floatingButton.addEventListener('click', () => {
    if (floatingButton.textContent === floatingFix) {
      fontButtonContainer.style.position = 'static';
      floatingButton.textContent = floatingFloat;
      floatingButton.setAttribute('title', floatingFloatTitle);
      localStorage.setItem('floatState', 'static');
    } else {
      fontButtonContainer.style.position = 'fixed';
      floatingButton.textContent = floatingFix;
      floatingButton.setAttribute('title', floatingFixTitle);
      localStorage.setItem('floatState', 'fixed');
    }
  });



    let floatState = localStorage.getItem('floatState');
    if (!floatState) {
      floatState = 'static';
      floatingButton.textContent = floatingFix;
      floatingButton.setAttribute('title', floatingFixTitle);
    }
    if (floatState === 'fixed') {
      fontButtonContainer.style.position = 'fixed';
      floatingButton.textContent = floatingFix;
      floatingButton.setAttribute('title', floatingFixTitle);
    } else {
      fontButtonContainer.style.position = 'static';
      floatingButton.textContent = floatingFloat;
      floatingButton.setAttribute('title', floatingFloatTitle);
    }

    localStorage.setItem('floatState', floatState);

  fontButtonContainer.appendChild(floatingButton);


    const infoLink = document.createElement('a');
    infoLink.textContent = infoText;
    infoLink.href = infoTextLink;
    infoLink.target = '_blank';
    infoLink.style.marginLeft = '8px';
    infoLink.style.fontSize = '12px';
    fontButtonContainer.appendChild(infoLink);


    infoLink.classList.add('z-index');

    document.body.insertBefore(fontButtonContainer, document.body.firstChild);

  });
