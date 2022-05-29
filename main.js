var Languages = [
    "ar-SA",
    "bn-BD",
    "bn-IN",
    "cs-CZ",
    "da-DK",
    "de-AT",
    "de-CH",
    "de-DE",
    "el-GR",
    "en-AU",
    "en-CA",
    "en-GB",
    "en-IE",
    "en-IN",
    "en-NZ",
    "en-US",
    "en-ZA",
    "es-AR",
    "es-CL",
    "es-CO",
    "es-ES",
    "es-MX",
    "es-US",
    "fi-FI",
    "fr-BE",
    "fr-CA",
    "fr-CH",
    "fr-FR",
    "he-IL",
    "hi-IN",
    "hu-HU",
    "id-ID",
    "it-CH",
    "it-IT",
    "jp-JP",
    "ko-KR",
    "nl-BE",
    "nl-NL",
    "no-NO",
    "pl-PL",
    "pt-BR",
    "pt-PT",
    "ro-RO",
    "ru-RU",
    "sk-SK",
    "sv-SE",
    "ta-IN",
    "ta-LK",
    "th-TH",
    "tr-TR",
    "zh-CN",
    "zh-HK",
    "zh-TW"
]


var RestrictedWords = [];

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

window.onload = function() {

    var select = document.getElementById("languages");
    select.name = "languages";
    select.id = "languages"
    
    for (const val of Languages)
    {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
    }
};

document.getElementById("startSpeech").onclick = function() {
    if(recognition.State = "finished") {
        recognition.lang =  document.getElementById("languages").value;
        recognition.start();
        console.log('Ready to receive a color command.');
    }
}

recognition.addEventListener('start', function() {
    recognition.State = "listening";
});

recognition.addEventListener('end', function() {
    recognition.State = "finished";
});

recognition.onresult = function(event) {
    let text = event.results[0][0].transcript;
    for(var i = 0; i < RestrictedWords.length; i++) {
        if(event.results[0][0].transcript.includes(RestrictedWords[i])) {
            text = text.replace(RestrictedWords[i], "*****");
            console.log(text);
        }
    }
  document.getElementById("output").innerText = text;
  console.log(text);
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}


function AddBadWord() {
    let badWord = document.getElementById("badWordInput").value;
    if(badWord == "*****") 
    {
        return 0;
    }
    RestrictedWords.push(badWord);
    var listElement = document.createElement("li");
    listElement.innerText = badWord;
    document.getElementById("badWordList").append(listElement);
}

function clearBadWords() {
    RestrictedWords = [];
    document.getElementById("badWordList").innerHTML = "<th>Bet Words List</th>"
}
