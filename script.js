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

async function getReviewsRating(subjectCode) {
  
  console.log("In getReviewsRating");
  const url = "https://studentvip.com.au/unimelb/subjects/" + subjectCode;
  let numberOfStars = fetch(url)
    .then(response => response.text())
    .then(responseText => {

      let parser = new DOMParser();
      let reviewDoc = parser.parseFromString(responseText, "text/html");
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
    });
    return numberOfStars;

}
getReviewsRating("COMP20008");