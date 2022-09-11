import { reverseArray } from "./system/array.js";
import { fetchData, fetchElement } from "./system/fetch.js";
import { sterilize } from "./system/format.js";
import {
  setHtml,
  getInput,
  callInput,
  setInput,
  setValue,
  getValue,
  getParameter,
  gettHtml,
  setKey,
} from "./system/getSetters.js";
import { addListen } from "./system/listen.js";

const SERVER_URL = "https://horrid.fi/server/functions/";
const DATA_URL = SERVER_URL + "getData.php?id=";
const PAGE_URL = SERVER_URL + "getPage.php?title=";
const ELEMENT_URL = SERVER_URL + "getElement.php?id=";
const POST_COMMENT_PATH = SERVER_URL + "postComment.php?app=";
const GET_COMMENT_PATH = SERVER_URL + "getComment.php?title=";

const SELECTOR_ID = "chapterSelector";
const CHAPTER_LABEL = "Luku";

let chapterKey = "Evolve";
let newComment = "";

function setContent(content) {
  const fullTitle = getFullTitle();
  const title =
    fullTitle === "undefined"
      ? ""
      : fullTitle + " - " + CHAPTER_LABEL + " " + getChapter() + " - ";
  setHtml("title", title + content.title);
  const body = content.body
    .map((paragraph) => "<div>" + paragraph + "</div>")
    .join("");
  setHtml("textBody", body);
}

function getTitleIndex(titles) {
  let title = getParameter("title", "Evolve");
  title = title.charAt(0).toUpperCase() + title.slice(1);
  for (const i in titles) {
    if (titles[i].shortTitle === title) {
      return i;
    }
  }
  return 0;
}

function chapterSelectorInit(currentChapter, maxChapter) {
  let html = "";
  for (let i = 1; i <= maxChapter; i++) {
    html +=
      '<option class="text" value="' +
      i +
      '" id="' +
      i +
      '">' +
      CHAPTER_LABEL +
      " - " +
      i +
      "</option>";
  }
  setHtml(SELECTOR_ID, html);
  setInput(SELECTOR_ID, currentChapter);
  addListen("previous", goPreviousChapter);
  addListen("next", goNextChapter);
}

function chapterInit(i, titles) {
  chapterKey = titles[i].shortTitle;
  let chapter = getParameter(chapterKey, 1);
  const maxChapter = titles[i].chapters;
  if (chapter > maxChapter) {
    chapter = maxChapter;
  }
  chapter = chapter > 0 ? chapter : 1;
  chapterSelectorInit(chapter, maxChapter);
  return chapter;
}

function getTitle() {
  return localStorage.getItem("title").toLocaleLowerCase();
}

function getFullTitle() {
  return localStorage.getItem("fullTitle");
}

function getChapter() {
  return localStorage.getItem(chapterKey);
}

function setTitle(title, fullTitle) {
  setKey("title", title);
  setKey("fullTitle", fullTitle);
}

function setChapter(chapter) {
  setKey(chapterKey, chapter);
}

function setPage(titles) {
  const titleIndex = getTitleIndex(titles);
  const title = titles[titleIndex].shortTitle;
  const chapter = chapterInit(titleIndex, titles);
  const contentUrl =
    PAGE_URL + title.toLocaleLowerCase() + "&chapter=" + chapter;
  setTitle(title, titles[titleIndex].title);
  setChapter(chapter);
  fetchData(contentUrl, setContent);
  setMeta(title, chapter);
}

function fetchContent() {
  fetchData(DATA_URL + "titles", setPage);
}

function setMeta(title, chapter) {
  document.title = title;
  fetchElement(ELEMENT_URL + "banner", "banner");
  commentsInit();
}

function updateSettings() {
  setKey("font-size", getInput("fontSize"));
  const selectedChapter = getInput(SELECTOR_ID);
  if (getChapter() != selectedChapter) {
    setChapter(selectedChapter);
  }
  refreshPage();
}

function copyLink() {
  const link =
    "https://horrid.fi/evolve?title=" + getTitle() + "&chapter=" + getChapter();
  navigator.clipboard.writeText(link);
}

function settingsInit() {
  callInput(
    "fontSize",
    "font-size",
    getValue("font-size", document.documentElement, parseInt)
  );
  setValue("font-size", getInput("fontSize"), document.documentElement);
  addListen("updateSettings", updateSettings);
  addListen("copyLink", copyLink);
}

function postCommentUrl() {
  return POST_COMMENT_PATH + getTitle() + "&id=" + getChapter() + "&data=";
}

function refreshPage() {
  location.href = "./";
}

function appendComment() {
  const html = commentToElement(newComment) + gettHtml("comments");
  setHtml("comments", html);
}

function pushComment(body) {
  body = sterilize(body);
  const pushUrl = postCommentUrl() + body;
  newComment = body;
  fetch(pushUrl, appendComment());
}

function postComment() {
  const commentId = "commentBody";
  const commentBody = getInput(commentId);
  pushComment(commentBody);
  setInput(commentId, "");
}

function commentToElement(body) {
  return "<div class='input comment'>" + body + "</div>";
}

function setPostedComments(log) {
  const comments = reverseArray(log.index, log.logs);
  const html = comments.map((comment) => commentToElement(comment)).join("");
  setHtml("comments", html);
}

function setCommentForm(response) {
  const getUrl = GET_COMMENT_PATH + getTitle() + "&chapter=" + getChapter();
  if (response.status != "Success") {
    setHtml("commentForm", "");
    return;
  }
  addListen("postComment", postComment);
  fetchData(getUrl, setPostedComments);
}

function commentsInit() {
  fetchData(postCommentUrl(), setCommentForm);
}

function goPreviousChapter() {
  goChapter(-1);
}

function goNextChapter() {
  goChapter(1);
}

function goChapter(change) {
  const chapter = getChapter() + change;
  setChapter(chapter);
  refreshPage();
}

function main() {
  settingsInit();
  fetchContent();
}

main();
