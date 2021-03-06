'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorsListLink: Handlebars.compile(document.querySelector('#template-authors-list-link').innerHTML)
}
const titleClickHandler = function(event){
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);
  event.preventDefault();
  
  /* [DONE]remove class 'active' from all article links  */
      const activeLinks = document.querySelectorAll('.titles a.active');

      for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
      }

  /*[DONE]add class 'active' to the clicked link */
      console.log('clickedElement:', clickedElement);
      clickedElement.classList.add('active');
  /*[DONE] remove class 'active' from all articles */
      const activeArticles = document.querySelectorAll('.posts article');

      for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
      }

  /* [DONE]get 'href' attribute from the clicked link */
      const articleSelector = clickedElement.getAttribute('href')
      console.log(articleSelector)
 
  /* [DONE]find the correct article using the selector (value of 'href' attribute) */
      const targetArticle = document.querySelector(clickedElement.getAttribute('href'))
      console.log(targetArticle)
  /* [DONE]add class 'active' to the correct article */
      targetArticle.classList.add('active');


}



const optArticleSelector ='.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';
 
  function generateTitleLinks(customSelector = ''){
  

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector)
    titleList.innerHTML = '';
    console.log(titleList)
   
        
    

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    
    for(let article of articles){
      
      console.log(article)
      const articleId = article.getAttribute('id')
      console.log(articleId)
      
    
    /* get the article id */
    
    
    
    
 
    
    
       

    /* find the title element */ /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle)
    
    

    /* create HTML of the link */
    
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log(linkHTML)

    html = html + linkHTML;
    console.log(html)
    
    }

    /* insert link into titleList */
    titleList.innerHTML = html;
    
    const links = document.querySelectorAll('.titles a');
  console.log(links)
  for(let link of links){
  link.addEventListener('click', titleClickHandler);
  }
    
    
}

generateTitleLinks();


function calculateTagsParams(tags){
   const params = {max: '0' , min: '999999' };
   
   for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }

    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
  
 } 
 function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector)
  console.log(articles)
  let html = '';
  /* START LOOP: for every article: */
  for(let article of articles){
    console.log(article)
    /* find tags wrapper */
    const tagArticleList = article.querySelector(optArticleTagsSelector);
    console.log(tagArticleList);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray)
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log(tag)
      /* generate HTML of the link */
      
      const linkHTMLData = {id: tag, title: tag};
      const tagHTML = templates.tagLink(linkHTMLData);
      console.log(tagHTML)
      
      
      /* add generated code to html variable */
      html = html + tagHTML
      console.log(html)
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagArticleList.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  console.log(tagList)
  
  
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  /*let allTagsHTML = '';*/
  const allTagsData = {tags: []};
  
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
    
  
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
/* [NEW] END LOOP: for each tag in allTags: */

/*[NEW] add HTML from allTagsHTML to tagList */
tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
}

generateTags();


function tagClickHandler(event){
  /*DONE prevent default action for this event */
  event.preventDefault();
  /*DONE make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag link was clicked!');
  /*DONE make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href')
  console.log(href)
  /*DONE make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag)
  /*DONE find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags);
  /*DONE START LOOP: for each active tag link */
    for(let activeTag of activeTags){
      /*DONE remove class active */
      activeTag.classList.remove('active');
      /*DONE END LOOP: for each active tag link */
    }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(tagLinks)
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active')
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  
}

function addClickListenersToTags(){
  /* find all links to tags */
  const allTagLinks = document.querySelectorAll('.post-tags a, .list.tags a')
  console.log(allTagLinks)
  /* START LOOP: for each link */
  for (let allTagLink of allTagLinks){
    /* add tagClickHandler as event listener for that link */
    allTagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();








function generateAuthors(){
  let allAuthors = {};
  /* find all Authors */
  const articles = document.querySelectorAll(optArticleSelector)
  console.log(articles)
  /* START LOOP: for every article: */
  for(let article of articles){
    console.log(article)
    /* find authors wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorsWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get authors from data-author attribute */
    const author = article.getAttribute('data-author');
    console.log(author);

      /* generate HTML of the author link */
      
    const linkHTMLData = {id: author, title: author};
    const authorLinkHTML = templates.authorLink(linkHTMLData);



      /* add generated code to html variable */
      html = html + authorLinkHTML
      /* [NEW] check if this link is NOT already in allAuthors */

      if(!allAuthors.hasOwnProperty(author)){
      /*   [NEW] add generated code to allAuthors object */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    /* insert HTML of all the links into the author wrapper */
    authorsWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector('.authors');
  /* [NEW] create variable for all links HTML code */
  
  const allAuthorsData = {authors: []};
  /* [NEW] START LOOP: for each author in allAuthors: */
  for (let author in allAuthors) {
    /* [NEW] generate code of a link and add it to allAuthorsHTML */

    
      allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author]
    });
  }
  
  /* [NEW] add html from allAuthorsHTML to authorList */

  
    authorsList.innerHTML = templates.authorsListLink(allAuthorsData);
    console.log(allAuthorsData);
}

generateAuthors();

function authorClickHandler(event){
 /*DONE prevent default action for this event */
 event.preventDefault();
 /*DONE make new constant named "clickedElement" and give it the value of "this" */
 const clickedElement = this;
 console.log('Author link was clicked!');
 /*DONE make a new constant "href" and read the attribute "href" of the clicked element */
 const href = clickedElement.getAttribute('href')
 console.log(href)
 /*DONE make a new constant "tag" and extract tag from the "href" constant */
 const author = href.replace('#author-', '');
 console.log(author)
 /*DONE find all authors links with class active */
 const activeAuthorsLinks = document.querySelectorAll('a.active[href^="#author-"]');
 console.log(activeAuthorsLinks);
 /*DONE START LOOP: for each active tag link */
   for(let activeAuthorLink of activeAuthorsLinks){
     /*DONE remove class active */
     activeAuthorLink.classList.remove('active');
     /*DONE END LOOP: for each active tag link */
   }

 /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorLinks)
 /* START LOOP: for each found tag link */
 for (let authorLink of authorLinks){
   /* add class active */
   authorLink.classList.add('active')
   /* END LOOP: for each found tag link */
 }
 /* execute function "generateTitleLinks" with article selector as argument */
 generateTitleLinks('[data-author="' + author + '"]');
 

} 

function addClickListenersToAuthors(){
   /* find all links to authors */
   const allAuthorLinks = document.querySelectorAll('.post-author a')
   console.log(allAuthorLinks)
   /* START LOOP: for each link */  
   for (let allAuthorLink of allAuthorLinks){
     /* add tagClickHandler as event listener for that link */
     allAuthorLink.addEventListener('click', authorClickHandler);
   /* END LOOP: for each link */
   }  
 }

 addClickListenersToAuthors();