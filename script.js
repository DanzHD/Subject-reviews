console.log("hello");

function AddSubjectListeners() {
  let subjects = document.querySelectorAll(".search-result-item__anchor");
  subjects.forEach((subject) => {

      if (!subject.getAttribute('listener')) {
        subject.addEventListener('mouseover', () => {
          console.log("testing");
          
        });
        subject.setAttribute('listener', true);
      }
    }
  );
}
AddSubjectListeners();
/* Adds listeners on new subject refreshes */
const wrapper = document.querySelector('.search-results-wrapper');
const config = {attributes: true, attributeFilter: ['class']};
const obsever = new MutationObserver( (mutations) => {
  mutations.forEach( () => {
    AddSubjectListeners();
  })
});
if (wrapper) obsever.observe(wrapper, config);

async function getReviewsRating(docText) {
  
  console.log("In getReviewsRating");
  let parser = new DOMParser();
  let reviewDoc = parser.parseFromString(docText, "text/html");
  let rating = reviewDoc.querySelector('.rating');
  let stars = rating.children;
  let numberOfStars = 0;
  const MAX_RATING = 5
  for (let i = 0; i < MAX_RATING; i++) {

    if (stars[i].matches(".fas.fa-star") === true) {
      numberOfStars++;
    }
  }

  return numberOfStars;

}
(async () => {
  const responseText = await chrome.runtime.sendMessage({url: "https://studentvip.com.au/unimelb/subjects/COMP20008"});
  
  let rating = getReviewsRating(responseText.doc);
  console.log(rating);
  
})();
//console.log(getReviewsRating("COMP20008"));
