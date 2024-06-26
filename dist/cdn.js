/*! cdn.js v1.0.0 | (c) Leon406 | Apache License 2.0 */
const DOMESTIC_CDNS = [
    "//cdn.staticfile.org/:package/:version/:file",
    "//lib.baomitu.com/:package/:version/:file",
    "//npm.elemecdn.com/:package@:version/dist/:file",
    "//lf3-cdn-tos.bytecdntp.com/cdn/expire-1-y/:package/:version/:file",
    "//unpkg.zhimg.com/:package@:version/dist/:file",
    "//cdnjs.loli.net/ajax/libs/:package/:version/:file",
    "//cdn.bootcdn.net/ajax/libs/:package/:version/:file",
];

const ABROAD_CDNS = [
    "//cdnjs.cloudflare.com/ajax/libs/:package/:version/:file",
    "//unpkg.com/:package@:version/dist/:file",
    "//cdn.jsdelivr.net/npm/:package@:version/dist/:file",
    "//cdn.jsdelivr.net/gh/:repo/:package@:version/dist/:file",
];

function makeCdnUrl(pkg, version, file) {
    let urls = []
    for (let cdn of DOMESTIC_CDNS) {
        let url = cdn.replace(":package", pkg)
            .replace(":version", version)
            .replace(":file", file)
        urls.push(url);
    }
    return urls;
}

function makeAbroadCdnUrl(pkg, version, file, repo = "") {
    let urls = []
    repo = repo || pkg
    for (let cdn of ABROAD_CDNS) {
        let url = cdn.replace(":package", pkg).replace(":version", version).replace(":file", file).replace(":repo", repo)
        urls.push(url);
    }
    return urls;
}

function head(url, xhr = null) {
    console.log(url)
    let sendDate = (new Date()).getTime();
    xhr = xhr || new XMLHttpRequest();
    xhr.open("HEAD", !window.location.protocol.startsWith("http") && url.startsWith("//") ? "https://" + url : url, false);
    try {
        xhr.send();
        let time = (new Date()).getTime() - sendDate;
        return xhr.status === 200 ? time : -1
    } catch (err) {
        return -1;
    }
}

function findFastestCdn(pkg, version, file, fallback, timeout = 5000, repo = "") {
    let domestic = makeCdnUrl(pkg, version, file);
    let abroad = makeAbroadCdnUrl(pkg, version, file, repo);
    let urls = domestic.concat(abroad);
    let okUrl = new Map();
    let xhr = new XMLHttpRequest();
    let start = new Date().getTime()
    for (let url of urls) {
        let time = head(url, xhr)
        if (time > 0) {
            okUrl.set(url, time)
            if (time < 100)
                break;
        }
        if (new Date().getTime() - start > timeout) break
    }
    if (okUrl.size > 0) {
        let sortedList = Array.from(okUrl);
        sortedList.sort(function (a, b) {
            return a[1] - b[1]
        })
        return sortedList[0][0];
    } else {
        console.warn("fallback use local====");
        return fallback;
    }
}

function loadCdnResource(pkg, version, file, fallback, timeout = 5000, repo = "") {
    writeScript(findFastestCdn(pkg, version, file, fallback, timeout, repo))
}

function writeScript(url) {
    const prefix = url.startsWith("//") && window.location.protocol ==="file:" ? "https:" :""
    document.write('<script src="' +prefix+ url + '"></script>')
}
