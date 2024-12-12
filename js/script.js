async function getRepoInfo(language){
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const request = await fetch(`https://api.github.com/search/repositories?q=${letters[getRandomInt(letters.length-1)]}+language:${language}`);
    const data = await request.json();
    console.log(data);
    console.log(data.items[getRandomInt(data.items.length-1)]);
    return data.items[getRandomInt(data.items.length-1)];
}

function getRandomInt(max){
    return Math.floor(Math.random()*max);
}

const languages = [
    {
        name:"javascript",
        color:"#f1e05a"
    },
    {
        name:"python",
        color:"#3572a5"
    },
    {
        name:"java",
        color:"#b07219"
    }
    ,
    {
        name:"ruby",
        color:"#701516"
    },
    {
        name:"php",
        color:"#4f5d95"
    },
    {
        name:"go",
        color:"#00add8"
    },
    {
        name:"c++",
        color:"#f34b7d"
    }
];
const languageSelector = document.querySelector(".language-selector");
const infoWrapper = document.querySelector(".info-wrapper");
const refreshButton = document.querySelector(".refresh-button");

languages.forEach(language=>{
    const languageOption = document.createElement("option");
    languageOption.textContent = language.name;
    languageSelector.appendChild(languageOption);
});

refreshButton.addEventListener("click",async ()=>{
    const loadingInfo = document.createElement("span");
    const repoDiv = document.createElement("div");
    const spanName = document.createElement("span");
    const description = document.createElement("p");
    const footer = document.createElement("div");
    const languageDiv = document.createElement("div");
    const starsDiv = document.createElement("div");
    const forksDiv = document.createElement("div");
    const watchsDiv = document.createElement("div");
    infoWrapper.innerHTML = "";
    loadingInfo.textContent = "Loading please wait...";
    infoWrapper.appendChild(loadingInfo);
    const repoInfo = await getRepoInfo(languageSelector.value);
    infoWrapper.removeChild(loadingInfo);
    spanName.textContent = repoInfo.name;
    description.textContent = repoInfo.description;
    const languageName = document.createElement("span");
    languageName.textContent = repoInfo.language;
    const languageColor = document.createElement("div");
    languageColor.classList.add("language-color");
    console.log(languages.find(language=>language.name===repoInfo.language.toLowerCase()));
    languageColor.style.background = languages.find(language=>language.name === repoInfo.language.toLowerCase()).color;
    languageDiv.appendChild(languageColor);
    languageDiv.appendChild(languageName);
    starsDiv.innerHTML=`<i class="fa-solid fa-star"></i><span>${repoInfo.stargazers_count}</span>`;
    forksDiv.innerHTML=`<i class="fa-solid fa-code-fork"></i><span>${repoInfo.forks}</span>`;
    watchsDiv.innerHTML=`<i class="fa-regular fa-eye"></i><span>${repoInfo.watchers}</span>`;
    footer.appendChild(languageDiv);
    footer.appendChild(starsDiv);
    footer.appendChild(forksDiv);
    footer.appendChild(watchsDiv);
    repoDiv.appendChild(spanName);
    repoDiv.appendChild(description);
    repoDiv.appendChild(footer);
    infoWrapper.appendChild(repoDiv);
});