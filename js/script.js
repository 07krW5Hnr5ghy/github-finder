async function getRepoInfo(){
    const request = await fetch("https://api.github.com/search/repositories?q=a+language:javascript");
    const data = await request.json();
    console.log(data);
}

getRepoInfo();