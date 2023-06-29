console.log("hello");

function AddSubjectListeners() {
  let subjects = document.querySelectorAll(".search-result-item__anchor");
  subjects.forEach((subject) => {

      if (!subject.getAttribute('listener')) {
        subject.addEventListener('mouseover', () => console.log("hovering"));
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
  mutations.forEach( (mutation) => {
    AddSubjectListeners();
  })
});
obsever.observe(wrapper, config);

