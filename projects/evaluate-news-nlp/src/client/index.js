import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'

console.log(checkForName);

alert("I EXIST")
console.log("CHANGE!!");


export {
    checkForName,
    handleSubmit
};

document.getElementById('sentiment-form').addEventListener('submit', function(event) {
    // debugger;
     event.preventDefault(); // Prevent the default form submission
 
     const text = document.getElementById('text-input').value; // Get the text input value
 
     // Make a POST request to your server
    fetch('/analyze', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ text })
     })
     .then(response => response.json())
     .then(data => {
// Update the results on the page dynamically
      console.log(data);
      const resultsElement = document.getElementById('results');
      resultsElement.innerHTML = `
      <p>Polarity: ${data.polarity}</p>
      <p>Subjectivity: ${data.subjectivity}</p>
      <p>Text: ${data.text}</p>
      `;
     })
     .catch(error => {
       console.error(error);
     });
   });
