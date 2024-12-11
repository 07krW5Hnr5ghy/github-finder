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

const languages = ["javascript","python","java","ruby","php","go","c++"];
const languageSelector = document.querySelector(".language-selector");
const infoWrapper = document.querySelector(".info-wrapper");
const refreshButton = document.querySelector(".refresh-button");

languages.forEach(language=>{
    const languageOption = document.createElement("option");
    languageOption.textContent = language;
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
    languageDiv.innerHTML=`<span>${repoInfo.language}</span>`;
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