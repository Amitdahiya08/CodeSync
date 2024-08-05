var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "text/x-c++src",
    theme: "dracula",
    autoCloseBrackets: true,
    lineNumbers: true,
    value: "//write your code here..."
});

var width = window.innerWidth;
editor.setSize(0.7 * width, "500px");

const languageSelect = document.getElementById('language-select');
let languageId = 54; // default to C++
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

let inputBox=document.getElementById("input");
let OutputBox=document.getElementById("output");

let runButton = document.getElementById("submit-code");
runButton.addEventListener("click", () => {
    runButton.disabled = true;

    let code = editor.getValue();
    let input = inputBox.value;

    let submissionData = {
        source_code: code,
        language_id: languageId,
        stdin: input
    };

    console.log("Submission Data:", submissionData);

    fetch("https://judge0-ce.p.rapidapi.com/submissions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "8b48dfb2d5mshc8d04921d946ebbp1688aajsn71c11bdb6e70",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        },
        body: JSON.stringify(submissionData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // console.log("Submission Response Data:", data);
        let token = data.token;
        if (!token) {
            throw new Error('Failed to get a valid token');
        }
        return new Promise(resolve => setTimeout(resolve, 3000)).then(() => token);
    })
    .then(token => {
        return fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "8b48dfb2d5mshc8d04921d946ebbp1688aajsn71c11bdb6e70",
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
            }
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(result => {
        // console.log("Result Output:", result.stdout);
        OutputBox.value=result.stdout;
    })
    .catch(error => {
        console.error("Error:", error);
    })
    .finally(() => {
        setTimeout(() => {
            runButton.disabled = false;
        }, 3000);
    });
});