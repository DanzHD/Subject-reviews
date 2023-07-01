console.log("hello");
const baseURL = "https://studentvip.com.au/unimelb/subjects/";

function AddSubjectListeners() {
  let listings = document.querySelectorAll(".search-result-item__anchor");
  listings.forEach((listing) => {
    let code = listing.querySelector('.search-result-item__header .search-result-item__code').textContent.toString();
    if (!isSubject(code)) return;

    if (!listing.getAttribute('listener')) {
      listing.addEventListener('mouseover', () => {
        let code = listing.querySelector('.search-result-item__header .search-result-item__code').textContent.toString();
        console.log(code);
        let subjectURL = baseURL + code;
        let rating = getRating(subjectURL);
        rating.then ((a) => {
          console.log(a);
        });


      });
      listing.setAttribute('listener', true);
    }
  });
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
  if (!rating) return null;

  let stars = rating.children;
  let numberOfStars = 0;
  const MAX_RATING = 5
  if (!stars) return null;
  if (stars[0].matches(".fa.fa-arrow-down.fa-3x")) return null;
  
  for (let i = 0; i < MAX_RATING; i++) {
    if (stars[i].matches(".fas.fa-star") === true) {
      numberOfStars++;
    }
  }

  return numberOfStars;

}

async function getRating(subjectURL) {
  const responseText = await chrome.runtime.sendMessage({url: subjectURL});

  let rating = getReviewsRating(responseText.doc);
  
  return rating;
};


function isSubject(code) {
  console.log("In isSubject");
  if (code.length != 9) {
    return false;
  }

  // Check if not all letters
  if (/[^a-z]/i.test(code.slice(0, 4))) {
    return false;
  }

  // check if number
  if (isNaN(code.slice(4, 9))) {
    return false;
  }
  return true;

}

