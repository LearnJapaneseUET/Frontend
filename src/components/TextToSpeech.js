function textToSpeech(text) {
    // Check if the browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.error("SpeechRecognition is not supported in this browser.");
        return;
    }

    // Function to start speech recognition
    function startSpeechRecognition() {
        const recognition = new SpeechRecognition();

        // Set recognition properties
        recognition.lang = 'ja-JP'; // Set language to Japanese
        recognition.interimResults = false; // Return only final results
        recognition.maxAlternatives = 1; // Provide only one alternative

        // Event handler for when recognition results are returned
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            console.log("You said: " + transcript);
        };

        // Event handler for when recognition ends
        recognition.onend = function() {
            console.log("Speech recognition service disconnected");
        };

        // Event handler for errors
        recognition.onerror = function(event) {
            console.error("Error occurred in recognition: " + event.error);
        };

        // Start speech recognition
        recognition.start();
    }

    // Check if the browser supports speechSynthesis
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);

        // Set voice to Japanese Female if available
        const voices = window.speechSynthesis.getVoices();
        const japaneseVoice = voices.find(voice => voice.lang === 'ja-JP');
        if (japaneseVoice) {
            utterance.voice = japaneseVoice;
        }

        // Set properties
        utterance.rate = 1;   // Speed (1 is normal, 0.5 is slower, 2 is faster)
        utterance.pitch = 1;  // Pitch (1 is normal, 0 is the lowest, 2 is the highest)
        utterance.volume = 1; // Volume (0 is mute, 1 is the loudest)

        // Event handler when the speech ends
        utterance.onend = function() {
            startSpeechRecognition(); // Start speech recognition after the speech ends
        };

        // Speak the text
        window.speechSynthesis.speak(utterance);
    } else {
        console.error("speechSynthesis is not available.");
    }
}

export default textToSpeech;