/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"pFa9F48aMDmuoMRv","label":"Home Lab","bookmarks":[{"id":"ia4Jk6GWB1jwn0qE","label":"Proxmox","url":"https://192.168.1.128:8006/"},{"id":"U1gI8kRZ4BMX99d8","label":"Portainer","url":"https://192.168.1.129:9443/"}]},{"id":"QdsP7K4cXsEztxY2","label":"Entertainment","bookmarks":[{"id":"YSWZmYDulk2w4Jpt","label":"YouTube","url":"https://www.youtube.com"},{"id":"M6oeufr9KZxqk4pf","label":"Twitch","url":"https://www.twitch.tv"}]},{"id":"kG2x5crvviNEJP2F","label":"Social","bookmarks":[{"id":"PDctzAUDscW3LH1w","label":"Twitter","url":"https://www.x.com"},{"id":"mVGVKClmRqf3i0Co","label":"Reddit","url":"https://old.reddit.com"}]},{"id":"JUsS8NipCeyusLoR","label":"Code","bookmarks":[{"id":"paepjnDULt78DxDi","label":"GitHub","url":"https://github.com/CodyBense"},{"id":"Qvcw4IMC33JoNPIY","label":"Nix","url":"https://mynixos.com"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
