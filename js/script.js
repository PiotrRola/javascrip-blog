'use strict';
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
  optArticleTagsSelector = '.post-tags .list';
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
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    
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


function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector)
  console.log(articles)
  let html = '';
  /* START LOOP: for every article: */
  for(let article of articles){
    console.log(article)
    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    console.log(titleList);
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
      const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(tagHTML)
      
      
      /* add generated code to html variable */
      html = html + tagHTML
      console.log(html)

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
  /* END LOOP: for every article: */
  }
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
  const allTagLinks = document.querySelectorAll('list .a')
  console.log(allTagLinks)
  /* START LOOP: for each link */
  for (let allTagLink of allTagLinks){
    /* add tagClickHandler as event listener for that link */
    allTagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();




