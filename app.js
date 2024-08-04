// codeMirror mode switching
var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "text/x-c++src",
    theme: "dracula",
    autoCloseBrackets: true,
    lineNumbers: true,
});

var width = window.innerWidth;
editor.setSize(0.7 * width, "500px");

const languageSelect = document.getElementById('language-select');
let languageId;
languageSelect.addEventListener('change', () => {
    const selectedLanguage = languageSelect.value;
    if (selectedLanguage === 'Java') {
        editor.setOption("mode", "text/x-java");
        languageId = 62;
    } else if (selectedLanguage === 'Python') {
        editor.setOption("mode", "text/x-python");
        languageId = 71;
    } else if (selectedLanguage === 'C++') {
        editor.setOption("mode", "text/x-c++src");
        languageId = 54;
    } else if (selectedLanguage === 'JavaScript') {
        editor.setOption("mode", "javascript");
    } else {
        editor.setOption("mode", "text/x-python"); 
        languageId = 63;
    }
});

let runButton = document.getElementById("submit-code");
runButton.addEventListener("click",()=>{
    console.log(document.getElementById("editor").value);
})
// runButton.addEventListener("click", () => {
//     // Disable the button to prevent multiple clicks
//     runButton.disabled = true;

//     // Get the code, language_id, and any necessary input
//     let code = document.getElementById("editor").value; // Replace with your code
//     let language_id = languageId; 
//     let input = document.getElementById("input").value; // Optional input

//     // Prepare the data to be sent to Judge0
//     let submissionData = {
//         source_code: code,
//         language_id: language_id,
//         stdin: input
//     };

//     // Send the request to Judge0 API
//     fetch("https://judge0.p.rapidapi.com/submissions", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "X-RapidAPI-Key": "8b48dfb2d5mshc8d04921d946ebbp1688aajsn71c11bdb6e70", // Replace with your RapidAPI key
//             "X-RapidAPI-Host": "judge0.p.rapidapi.com"
//         },
//         body: JSON.stringify(submissionData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         let token = data.token;
//         // Wait for the result
//         return new Promise(resolve => setTimeout(resolve, 1000)).then(() => token);
//     })
//     .then(token => {
//         return fetch(`https://judge0.p.rapidapi.com/submissions/${token}`, {
//             method: "GET",
//             headers: {
//                 "X-RapidAPI-Key": "8b48dfb2d5mshc8d04921d946ebbp1688aajsn71c11bdb6e70", // Replace with your RapidAPI key
//                 "X-RapidAPI-Host": "judge0.p.rapidapi.com"
//             }
//         });
//     })
//     .then(response => response.json())
//     .then(result => {
//         // Print the result output
//         console.log(result.stdout);
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     })
//     .finally(() => {
//         // Re-enable the button after 1 second
//         setTimeout(() => {
//             runButton.disabled = false;
//         }, 3000);
//     });
// });
