'use strict';



const optArticleSelector ='.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

  function generateTitleLinks(){
  

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector)
    titleList.innerHTML = '';
    console.log(titleList)
   
        
    

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector)
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
    
    {const titleClickHandler = function(event){
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
    const links = document.querySelectorAll('.titles a');
      console.log(links)
      for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
    
    
  }
    
    
  }

generateTitleLinks();
