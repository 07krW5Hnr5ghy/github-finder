async function getRepoInfo(language){
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const request = await fetch(`https://api.github.com/search/repositories?q=${letters[getRandomInt(letters.length-1)]}+language:${language}`);
    const data = await request.json();
    if(data.items.length){
        return data.items[getRandomInt(data.items.length-1)];
    }else{
        return [];
    }
    
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
const infoWrapper = document.querySelector(".info-loading");
const refreshButton = document.querySelector(".refresh-button");

languages.forEach(language=>{
    const languageOption = document.createElement("option");
    languageOption.textContent = language.name;
    languageSelector.appendChild(languageOption);
});

refreshButton.addEventListener("click",async ()=>{
    infoWrapper.classList.add("info-loading");
    infoWrapper.classList.remove("info-wrapper");
    const loadingInfo = document.createElement("span");
    const spanName = document.createElement("span");
    const description = document.createElement("p");
    const footer = document.createElement("div");
    const languageDiv = document.createElement("div");
    const starsDiv = document.createElement("div");
    const forksDiv = document.createElement("div");
    const watchersDiv = document.createElement("div");
    infoWrapper.innerHTML = "";
    loadingInfo.textContent = "Loading please wait...";
    infoWrapper.appendChild(loadingInfo);
    const repoInfo = await getRepoInfo(languageSelector.value);
    infoWrapper.removeChild(loadingInfo);
    infoWrapper.classList.remove("info-loading");
    if(repoInfo.length){
        infoWrapper.classList.add("info-wrapper");
        spanName.textContent = repoInfo.name;
        spanName.classList.add("repo-name");
        description.textContent = repoInfo.description ?? "Description unavailable";
        description.classList.add("repo-desc");
        footer.classList.add("repo-stats");
        languageDiv.classList.add("language");
        const languageName = document.createElement("span");
        languageName.textContent = repoInfo.language;
        const languageColor = document.createElement("div");
        languageColor.classList.add("language-color");
        languageColor.style.background = languages.find(language=>language.name === repoInfo.language.toLowerCase()).color;
        languageDiv.appendChild(languageColor);
        languageDiv.appendChild(languageName);
        starsDiv.innerHTML=`<i class="fa-solid fa-star"></i><span>${repoInfo.stargazers_count}</span>`;
        starsDiv.classList.add("repo-stars");
        forksDiv.innerHTML=`<i class="fa-solid fa-code-fork"></i><span>${repoInfo.forks}</span>`;
        forksDiv.classList.add("repo-forks");
        watchersDiv.innerHTML=`<i class="fa-regular fa-eye"></i><span>${repoInfo.watchers}</span>`;
        watchersDiv.classList.add("repo-watchers");
        footer.appendChild(languageDiv);
        footer.appendChild(starsDiv);
        footer.appendChild(forksDiv);
        footer.appendChild(watchersDiv);
        infoWrapper.appendChild(spanName);
        infoWrapper.appendChild(description);
        infoWrapper.appendChild(footer);
    }else{
        infoWrapper.classList.add("info-error");
        infoWrapper.textContent = "Error fetching repositories";
    }
    
});