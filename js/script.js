async function getRepoInfo(){
    const request = await fetch("https://api.github.com/search/repositories?q=a+language:javascript");
    const data = await request.json();
    console.log(data);
}

getRepoInfo();
const languages = ["javascript","python","java","ruby","php","go","c++"];
const languageSelector = document.querySelector(".language-selector");

languages.forEach(language=>{
    const languageOption = document.createElement("option");
    languageOption.textContent = language;
    languageSelector.appendChild(languageOption);
});