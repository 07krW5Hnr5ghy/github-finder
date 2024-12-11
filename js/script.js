async function getRepoInfo(){
    const request = await fetch("https://api.github.com/search/repositories?language:javascript");
    const data = request.json();
    console.log(data);
}

getRepoInfo();