/*
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';
import { browserLocalPersistence, getAuth, setPersistence } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


console.log("1")
const firebaseConfig = {
  apiKey: "AIzaSyBYzmKtwaieGem-mLZ_x2BUrceJU7JIEX0",
  authDomain: "cbuserapp.firebaseapp.com",
  databaseURL:
    "https://cbuserapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cbuserapp",
  storageBucket: "cbuserapp.appspot.com",
  messagingSenderId: "878847920847",
  appId: "1:878847920847:web:176f626072a5caed5e85ba",
  measurementId: "G-G1Y3CMYRWV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
setPersistence(auth, browserLocalPersistence);
export const analytics = getAnalytics(app);

export default app;
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteField,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { v4 } from "https://jspm.dev/uuid";
console.log("2");

//Test environment
const firebaseConfig = {
  apiKey: "AIzaSyBYzmKtwaieGem-mLZ_x2BUrceJU7JIEX0",
  authDomain: "cbuserapp.firebaseapp.com",
  databaseURL:
    "https://cbuserapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cbuserapp",
  storageBucket: "cbuserapp.appspot.com",
  messagingSenderId: "878847920847",
  appId: "1:878847920847:web:176f626072a5caed5e85ba",
  measurementId: "G-G1Y3CMYRWV",
};

//Production environment
/*
const firebaseConfig = {
  apiKey: "AIzaSyDT1Pdezn7hgPgIcMQ25yzYIj51gBiVH-U",
  authDomain: "cbuserapp-production.firebaseapp.com",
  projectId: "cbuserapp-production",
  storageBucket: "cbuserapp-production.appspot.com",
  messagingSenderId: "193580959879",
  appId: "1:193580959879:web:32882ce1449ed83a795022",
  measurementId: "G-LN8XF3J5WK",
};
*/

// Initialize Firebase
// Initialize variables
//const auth = getAuth(app);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//export var transaction = {currencyCode: 'gbp', amount: 100};
console.log("3");
const focus = document.getElementById("custom_box");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const custom_box = document.getElementById("captcha");
const h5 = document.getElementById("custom_amount_text");
const pay = document.getElementById("Pay");
const pay_now = document.getElementById("submit");
const close_pay = document.getElementById("close_pay");
const pay_form = document.getElementById("payment-form");
const tip_tag = document.getElementById("tip_tag");
const tag = document.getElementById("tag");

const submit = document.getElementById("payLabel");

const checkbox = document.getElementById("checkbox1");

setTimeout(async function () {
  const checkboxRect = checkbox.getBoundingClientRect();

  const addDeliveryTop =
    checkboxRect.top + window.scrollY + checkboxRect.height + 180;
  const addDeliveryLeft = checkboxRect.left + window.scrollX + 15;

  const addDelivery = document.getElementById("addDeliveryContainer");
  addDelivery.style.position = "absolute";
  addDelivery.style.top = `${addDeliveryTop}px`;
  addDelivery.style.left = `${addDeliveryLeft}px`;
  //const userID = sessionStorage.getItem('ID');
  async function getItem(userId, key) {
    try {
      const docSnap = await getDoc(doc(db, "usersDelivery", userId));
      if (docSnap.exists()) {
        return docSnap.data()[key];
      } else {
        console.log("No data available");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }
  const userId = sessionStorage.getItem("userId");
  const numberofForms1 = await getItem(userId, "myVariable");

  //const numberofForms1 = localStorage.getItem(`${userID}myVariable`);

  console.log(numberofForms1);
  if (numberofForms1 < 10) {
    setTimeout(() => {
      addDelivery.style.display = "block";
    }, 500);
  }
  //addDelivery.style.display = "block";

  const numberingTop =
    checkboxRect.top + window.scrollY + checkboxRect.height - 80;
  let numberingLeft = checkboxRect.left + window.scrollX;

  const numbering = document.getElementById("numbering1");
  numbering.style.position = "absolute";
  numbering.style.top = `${numberingTop}px`;
  numberingLeft -= 35;
  numbering.style.left = `${numberingLeft}px`;
  numbering.style.display = "block";
  //
  const printLabel = document.getElementById("printLabel1");
  const printLabelRect = printLabel.getBoundingClientRect();

  const submitTop =
    printLabelRect.top + window.scrollY + printLabelRect.height - 155;
  const submitLeft = printLabelRect.left + window.scrollX;

  submit.style.position = "absolute";
  submit.style.top = `${submitTop}px`;
  submit.style.left = `${submitLeft}px`;
  submit.style.display = "block";
  //
  const signOut = document.getElementById("signOut");

  const signOutTop =
    printLabelRect.top + window.scrollY + printLabelRect.height - 150;
  let signOutLeft = printLabelRect.left + window.scrollX + 270;

  signOut.style.position = "absolute";
  signOut.style.top = `${signOutTop}px`;
  signOut.style.left = `${signOutLeft}px`;

  signOut.style.display = "block";
}, 50);
checkboxFillIn();
//window.addEventListener('DOMContentLoaded', () => {
function checkboxFillIn() {
  const userID = sessionStorage.getItem("ID");
  console.log(userID);
  if (userID === null) {
    //window.location.href = "https://delivery.wecarrybags.co.uk";
  }
  //const checkboxes = document.querySelectorAll('[id^="checkbox"]');
  //checkboxes.forEach(function(checkbox) {
  //checkbox.addEventListener("click", async function(event) {
  document.querySelectorAll("input, textarea").forEach((element) => {
    // Append the cloned fields to the clone container
    const digit = element.id.match(/\d+$/)[0];
    const checkbox = document.getElementById("checkbox" + digit);
    checkbox.addEventListener("click", async function (event) {
      if (!element.checkValidity()) {
        // Prevent checkbox from being checked
        event.preventDefault();
        // Uncheck the checkbox
        checkbox.checked = false;
        // Trigger form validation and show error messages
        element.reportValidity();
      }
      /*
    if (checkbox.checked){
      if (checkbox.disabled != true){
      localStorage.setItem('checkboxPayment', 'true')
      const digit = checkbox.id.match(/\d+$/)[0];
      const deliveryOptions = document.getElementById("deliveryOptions" + digit);
      const selectedOption = deliveryOptions.options[deliveryOptions.selectedIndex];
      }
      }
      */
    });
    if (
      element.type !== "checkbox" &&
      !element.id.startsWith("additionalNotes") &&
      !element.id.startsWith("shipAddressTwo") &&
      element.value === ""
    ) {
      checkbox.checked = false;
    }
  });

  //});
  /*
      printButtons.forEach(function(printButton) {
        printButton.addEventListener("click", async function(event) {
          
          
          event.preventDefault();
  
          const id = this.id; 
          const digit = id.match(/\d+$/)[0]; 
          //const checkboxes = document.querySelectorAll('[id^="checkbox"]');
  
          const checkbox = document.getElementById("checkbox"+digit)
          */
  //});
}
setInterval(checkboxFillIn, 1000);
//});

/*
window.addEventListener('DOMContentLoaded', () => {
// Might need userID - test which account gets shown after entering URL

const signedIn = localStorage.getItem('signedIn');
if (signedIn !== 'true') {
  window.location.href = "https://delivery.wecarrybags.co.uk";
}
});
*/

console.log("4");
const cloneContainer = document.getElementById("cloneContainer");
const originalContainer = document.getElementById("container");
const form = document.getElementById("form");
const addButton = document.getElementById("addDelivery");
const addDelivery = document.getElementById("addDeliveryContainer");
const numbering = document.getElementById("numbering");
//const numbering1 = document.getElementById("numbering1");
let counter = 1;
let counterButton = 0;
//let counterClone = 1;
console.log("5");

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(async () => {
    //const userID = sessionStorage.getItem('ID');
    async function getItem(userId, key) {
      try {
        const docSnap = await getDoc(doc(db, "usersDelivery", userId));
        if (docSnap.exists()) {
          return docSnap.data()[key];
        } else {
          console.log("No data available");
          return null;
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    }
    const userId = sessionStorage.getItem("userId");
    const numberofForms1 = await getItem(userId, "myVariable");
    //const numberofForms1 = localStorage.getItem(`${userID}myVariable`);
    console.log(numberofForms1);
    if (numberofForms1 > 9) {
      addDelivery.style.display = "none";
    }
    if (numberofForms1 !== null) {
      console.log("hello");
      const numberofForms = parseInt(numberofForms1);
      let counter = numberofForms;

      //document.addEventListener('DOMContentLoaded', () => {

      //Add Delivery button
      addButton.addEventListener("click", function () {
        console.log(counter);
        // Clone the existing form fields
        //pressButton();

        //const numbering1 = numbering
        //numbering1.style.position = 'absolute';
        //numbering1.style.top = `${numberingTop}px`;
        //numbering1.style.left = `${numberingLeft}px`;
        setTimeout(() => {
          const country = document.getElementById("shipCountry" + counter);
          country.value = "United Kingdom";
          country.disabled = true;

          const checkbox = document.getElementById("checkbox" + counter);
          const numbering = document.getElementById("numbering" + counter);

          const checkboxRect = checkbox.getBoundingClientRect();
          const numberingTop =
            checkboxRect.top + window.scrollY + checkboxRect.height - 80;
          let numberingLeft = checkboxRect.left + window.scrollX;
          if (counter === 10) {
            numberingLeft += -42;
          } else {
            numberingLeft += -35;
          }

          numbering.style.position = "absolute";
          numbering.style.top = `${numberingTop}px`;
          numbering.style.left = `${numberingLeft}px`;
          numbering.style.display = "block";
        }, 5);
        setTimeout(() => {
          function isScrollBarVisible() {
            return document.documentElement.scrollHeight > window.innerHeight;
          }

          // Function to adjust the position of elements when the scroll bar appears
          function adjustPositionWhenScrollBarAppears() {
            if (isScrollBarVisible()) {
              const numberings = document.querySelectorAll('[id^="numbering"]');
              numberings.forEach((numbers) => {
                const digit = numbers.id.match(/\d+$/)[0];
                const checkbox = document.getElementById("checkbox" + digit);
                const numbering = document.getElementById("numbering" + digit);
                const checkboxRect = checkbox.getBoundingClientRect();
                const numberingTop =
                  checkboxRect.top + window.scrollY + checkboxRect.height - 80;
                let numberingLeft = checkboxRect.left + window.scrollX;
                numberingLeft -= 35;
                numbering.style.position = "absolute";
                numbering.style.top = `${numberingTop}px`;
                numbering.style.left = `${numberingLeft}px`;

                numbering.style.display = "block";
              });
            }
          }
          const observer = new MutationObserver(
            adjustPositionWhenScrollBarAppears,
          );
          observer.observe(document.body, { childList: true, subtree: true });
        }, 2000);
        //numbering.textContent = counter + 1

        const addDeliveryRect = addDelivery.getBoundingClientRect();

        const addDeliveryTopPos =
          addDeliveryRect.top + window.scrollY + addDeliveryRect.height + 170;

        addDelivery.style.top = `${addDeliveryTopPos}px`;
        /*
    const numberingRect = numbering.getBoundingClientRect();
    const numberingTopPos = numberingRect.top + window.scrollY + numberingRect.height + 180; 

    numbering.style.top = `${numberingTopPos}px`;
    

    numbering1.style.display = "block";
    const numberingTopPos1 = numberingRect.top + window.scrollY + numberingRect.height - 180; 

    numbering1.style.top = `${numberingTopPos1}px`;
    */

        const clonedFields = form.cloneNode(true);

        counter++;

        if (counter === 10) {
          addDelivery.style.display = "none";
        }
        //counterClone++;
        //console.log(counterClone);
        //localStorage.setItem('counterClone', counterClone.toString());
        // Clear values of cloned input fields
        console.log(clonedFields);
        clonedFields
          .querySelectorAll("input, textarea, select, button")
          .forEach((element) => {
            // Append the cloned fields to the clone container
            const originalId = element.id;
            const digitIndex = originalId.search(/\d+$/); // Find the index of the last digit
            const baseId = originalId.slice(0, digitIndex); // Extract the base ID without the digit
            const newId = baseId + counter;
            //const newId = element.id + counter;
            element.classList.add("cloned-form");
            console.log(element);
            element.setAttribute("id", newId);

            if (
              element.tagName.toLowerCase() === "input" ||
              element.tagName.toLowerCase() === "textarea"
            ) {
              element.value = "";
            }
            if (element.type.toLowerCase() === "checkbox") {
              element.checked = false; // Uncheck the cloned checkbox
              element.value = "off";
            }
            if (element.tagName.toLowerCase() === "select") {
              element.selectedIndex = 0; // Reset selected index
            }

            element.classList.remove("no-click-cursor");

            if (element.tagName.toLowerCase() === "button") {
              element.classList.add("no-click-cursor"); // Reset selected index
            }
            element.disabled = false;
          });

        cloneContainer.appendChild(clonedFields);
        checkboxFillIn();

        //const userID = sessionStorage.getItem('ID');
        async function setItem(userId, key, value) {
          try {
            await setDoc(
              doc(db, "usersDelivery", userId),
              { [key]: value },
              { merge: true },
            );
            console.log("Data saved successfully.");
          } catch (error) {
            console.error("Error saving data:", error);
          }
        }
        const userId = sessionStorage.getItem("userId");
        setItem(userId, "myVariable", counter);

        //localStorage.setItem(`${userID}myVariable`, counter);

        pressButton();
      });
    } else {
      //Add Delivery button
      console.log("abc");
      let counter = 1;
      addButton.addEventListener("click", function () {
        console.log(counter);
        // Clone the existing form fields
        //pressButton();

        //const numbering1 = numbering
        //numbering1.style.position = 'absolute';
        //numbering1.style.top = `${numberingTop}px`;
        //numbering1.style.left = `${numberingLeft}px`;
        setTimeout(() => {
          const country = document.getElementById("shipCountry" + counter);
          country.value = "United Kingdom";
          country.disabled = true;

          const checkbox = document.getElementById("checkbox" + counter);
          const numbering = document.getElementById("numbering" + counter);

          const checkboxRect = checkbox.getBoundingClientRect();
          const numberingTop =
            checkboxRect.top + window.scrollY + checkboxRect.height - 80;
          let numberingLeft = checkboxRect.left + window.scrollX;
          if (counter === 10) {
            numberingLeft += -42;
          } else {
            numberingLeft += -35;
          }

          numbering.style.position = "absolute";
          numbering.style.top = `${numberingTop}px`;
          numbering.style.left = `${numberingLeft}px`;
          numbering.style.display = "block";
        }, 5);
        setTimeout(() => {
          function isScrollBarVisible() {
            return document.documentElement.scrollHeight > window.innerHeight;
          }

          // Function to adjust the position of elements when the scroll bar appears
          function adjustPositionWhenScrollBarAppears() {
            if (isScrollBarVisible()) {
              const numberings = document.querySelectorAll('[id^="numbering"]');
              numberings.forEach((numbers) => {
                const digit = numbers.id.match(/\d+$/)[0];
                const checkbox = document.getElementById("checkbox" + digit);
                const numbering = document.getElementById("numbering" + digit);
                const checkboxRect = checkbox.getBoundingClientRect();
                const numberingTop =
                  checkboxRect.top + window.scrollY + checkboxRect.height - 80;
                let numberingLeft = checkboxRect.left + window.scrollX;
                numberingLeft -= 35;
                numbering.style.position = "absolute";
                numbering.style.top = `${numberingTop}px`;
                numbering.style.left = `${numberingLeft}px`;

                numbering.style.display = "block";
              });
            }
          }
          const observer = new MutationObserver(
            adjustPositionWhenScrollBarAppears,
          );
          observer.observe(document.body, { childList: true, subtree: true });
        }, 2000);
        //numbering.textContent = counter + 1

        const addDeliveryRect = addDelivery.getBoundingClientRect();

        const addDeliveryTopPos =
          addDeliveryRect.top + window.scrollY + addDeliveryRect.height + 160;

        addDelivery.style.top = `${addDeliveryTopPos}px`;
        /*
    const numberingRect = numbering.getBoundingClientRect();
    const numberingTopPos = numberingRect.top + window.scrollY + numberingRect.height + 180; 

    numbering.style.top = `${numberingTopPos}px`;
    

    numbering1.style.display = "block";
    const numberingTopPos1 = numberingRect.top + window.scrollY + numberingRect.height - 180; 

    numbering1.style.top = `${numberingTopPos1}px`;
    */

        const clonedFields = form.cloneNode(true);

        counter++;

        if (counter === 10) {
          addDelivery.style.display = "none";
        }
        //counterClone++;
        //console.log(counterClone);
        //localStorage.setItem('counterClone', counterClone.toString());
        // Clear values of cloned input fields
        console.log(clonedFields);
        clonedFields
          .querySelectorAll("input, textarea, select, button")
          .forEach((element) => {
            // Append the cloned fields to the clone container
            const originalId = element.id;
            const digitIndex = originalId.search(/\d+$/); // Find the index of the last digit
            const baseId = originalId.slice(0, digitIndex); // Extract the base ID without the digit
            const newId = baseId + counter;
            //const newId = element.id + counter;
            element.classList.add("cloned-form");
            console.log(element);
            element.setAttribute("id", newId);

            if (
              element.tagName.toLowerCase() === "input" ||
              element.tagName.toLowerCase() === "textarea"
            ) {
              element.value = "";
            }
            if (element.type.toLowerCase() === "checkbox") {
              element.checked = false; // Uncheck the cloned checkbox
              element.value = "off";
            }
            if (element.tagName.toLowerCase() === "select") {
              element.selectedIndex = 0; // Reset selected index
            }

            element.classList.remove("no-click-cursor");

            if (element.tagName.toLowerCase() === "button") {
              element.classList.add("no-click-cursor"); // Reset selected index
            }
            element.disabled = false;
          });

        cloneContainer.appendChild(clonedFields);
        checkboxFillIn();
        pressButton();
        //const userID = sessionStorage.getItem('ID');
        //localStorage.setItem(`${userID}myVariable`, counter);
        async function setItem(userId, key, value) {
          try {
            await setDoc(
              doc(db, "usersDelivery", userId),
              { [key]: value },
              { merge: true },
            );
            console.log("Data saved successfully.");
          } catch (error) {
            console.error("Error saving data:", error);
          }
        }
        const userId = sessionStorage.getItem("userId");
        setItem(userId, "myVariable", counter);
      });
    }
  }, 1);
});
console.log("6");

//window.addEventListener('load', restoreFormState);
async function generateTextareaElementsFromLocalStorage(times) {
  let counter = 1;

  for (let i = 2; i <= times; i++) {
    const clonedFields = form.cloneNode(true);
    counter++;
    //document.addEventListener('DOMContentLoaded', () => {

    clonedFields
      .querySelectorAll("textarea, input, button, select")
      .forEach((element) => {
        // Append the cloned fields to the clone container
        const originalId = element.id;
        const digitIndex = originalId.search(/\d+$/); // Find the index of the last digit
        const baseId = originalId.slice(0, digitIndex); // Extract the base ID without the digit
        const newId = baseId + counter;
        //const newId = element.id + counter;
        element.classList.add("cloned-form");
        //console.log(element)
        element.setAttribute("id", newId);
      });

    cloneContainer.appendChild(clonedFields);

    setTimeout(() => {
      for (let i = 1; i <= times; i++) {
        const checkbox = document.getElementById("checkbox" + i);
        const numbering = document.getElementById("numbering" + i);

        const checkboxRect = checkbox.getBoundingClientRect();
        const numberingTop =
          checkboxRect.top + window.scrollY + checkboxRect.height - 80;
        let numberingLeft = checkboxRect.left + window.scrollX;
        if (counter === 10) {
          numberingLeft += -42;
        } else {
          numberingLeft += -35;
        }

        numbering.style.position = "absolute";
        numbering.style.top = `${numberingTop}px`;
        numbering.style.left = `${numberingLeft}px`;
        numbering.style.display = "block";
      }
    }, 50);

    //});
  }

  for (let i = 1; i <= 10; i++) {
    const textarea1 = document.getElementById("additionalNotes" + i);
    const delivery = document.getElementById("deliveryOptions" + i);
    const deliveryNotes = document.getElementById("deliveryNotes" + i);
    const productDescription = document.getElementById(
      "productDescription" + i,
    );
    const productPrice = document.getElementById("productPrice" + i);
    const postcode = document.getElementById("shipPostcode" + i);
    const city = document.getElementById("shipCity" + i);
    const addressTwo = document.getElementById("shipAddressTwo" + i);
    const addressOne = document.getElementById("shipAddressOne" + i);
    const recipientName = document.getElementById("recipientName" + i);
    const checkbox = document.getElementById("checkbox" + i);

    if (textarea1 !== null) {
      async function getItem(userId, key) {
        try {
          const docSnap = await getDoc(doc(db, "usersDelivery", userId));
          if (docSnap.exists()) {
            return docSnap.data()[key];
          } else {
            console.log("No data available");
            return null;
          }
        } catch (error) {
          console.error("Error retrieving data:", error);
        }
      }

      const userID = sessionStorage.getItem("ID");

      const userId = sessionStorage.getItem("userId");

      let texttarea1 = localStorage.getItem(userID + "additionalNotes" + i);
      textarea1.value = texttarea1;

      let delivery2 = localStorage.getItem(userID + "deliveryOptions" + i);
      delivery.selectedIndex = delivery2;

      let deliveryNotes1 = localStorage.getItem(userID + "deliveryNotes" + i);
      deliveryNotes.value = deliveryNotes1;

      let productDescription1 = localStorage.getItem(
        userID + "productDescription" + i,
      );
      productDescription.value = productDescription1;

      let productPrice1 = localStorage.getItem(userID + "productPrice" + i);
      productPrice.value = productPrice1;

      let postcode1 = localStorage.getItem(userID + "shipPostcode" + i);
      postcode.value = postcode1;

      let city1 = localStorage.getItem(userID + "shipCity" + i);
      city.value = city1;

      let address2 = localStorage.getItem(userID + "shipAddressTwo" + i);
      addressTwo.value = address2;

      let address1 = localStorage.getItem(userID + "shipAddressOne" + i);
      addressOne.value = address1;

      let recipientName1 = await getItem(userId, "recipientName" + i);
      recipientName.value = recipientName1;

      let checkbox1 = localStorage.getItem(userID + "checkbox" + i);
      checkbox.checked = checkbox1 === "true";

      /*
        document.querySelectorAll('input, textarea, select').forEach(element => {
          const digit = element.id.match(/\d+$/)[0]; 
          //const checkboxes = document.querySelectorAll('[id^="checkbox"]');
          //const printbutton = document.getElementById("printLabel"+digit)
          const checkbox = document.getElementById("checkbox" + digit)
          if (checkbox.value === 'paid'){
            element.classList.add('no-click-cursor');
            element.disabled = true;
          }
        });
        */
      document
        .querySelectorAll("input, textarea, select")
        .forEach((element) => {
          const digit = element.id.match(/\d+$/)[0];
          //const checkboxes = document.querySelectorAll('[id^="checkbox"]');

          //const checkbox = ("checkbox" + digit)

          //checkboxes.forEach(function(checkbox) {
          // Check if the checkbox is checked
          //if (checkbox.checked) {
          //checkbox.value = 'paid'
          const userID = sessionStorage.getItem("ID");

          const checkcheckbox = localStorage.getItem(
            `${userID}checkbox` + digit + 1,
          );
          //console.log(checkcheckbox)
          if (checkcheckbox === "truePaid") {
            const checkbox = document.getElementById("checkbox" + digit);
            //console.log(checkbox)
            checkbox.value = "paid";
            //checkbox.value = "statusPaid"
            //element.disabled = true;
            //element.classList.add('no-click-cursor');
          }
          //if (checkbox.value === 'statusPaid'){
          //element.disabled = true;

          //}

          //}
        });
      //Restore the paid status for paid forms
      //updateAction();
      //pressButton();
      //});
    }
  }
  updateAction();
  pressButton();
  setTimeout(async () => {
    const resize = counter * 220;
    const checkbox = document.getElementById("checkbox1");
    const checkboxRect = checkbox.getBoundingClientRect();

    const addDeliveryTop =
      checkboxRect.top + window.scrollY + checkboxRect.height + resize - 40;
    const addDeliveryLeft = checkboxRect.left + window.scrollX + 15;

    const addDelivery = document.getElementById("addDeliveryContainer");
    addDelivery.style.position = "absolute";
    addDelivery.style.top = `${addDeliveryTop}px`;
    addDelivery.style.left = `${addDeliveryLeft}px`;
    //const userID = sessionStorage.getItem('ID');
    async function getItem(userId, key) {
      try {
        const docSnap = await getDoc(doc(db, "usersDelivery", userId));
        if (docSnap.exists()) {
          return docSnap.data()[key];
        } else {
          console.log("No data available");
          return null;
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    }
    const userId = sessionStorage.getItem("userId");
    const numberofForms1 = await getItem(userId, "myVariable");
    //const numberofForms1 = localStorage.getItem(`${userID}myVariable`);
    console.log(numberofForms1);
    if (numberofForms1 < 10) {
      addDelivery.style.display = "block";
    }
    //addDelivery.style.display = "block";
  }, 500);
}

console.log("7");

//document.addEventListener('DOMContentLoaded', function() {
//function myFunction() {
function handleInputEvent(event) {
  console.log(event.target.id);
  for (let i = 1; i <= 10; i++) {
    const textarea1 = document.getElementById("additionalNotes" + i);
    const delivery = document.getElementById("deliveryOptions" + i);
    const deliveryNotes = document.getElementById("deliveryNotes" + i);
    const productDescription = document.getElementById(
      "productDescription" + i,
    );
    const productPrice = document.getElementById("productPrice" + i);
    const postcode = document.getElementById("shipPostcode" + i);
    const city = document.getElementById("shipCity" + i);
    const addressTwo = document.getElementById("shipAddressTwo" + i);
    const addressOne = document.getElementById("shipAddressOne" + i);
    const recipientName = document.getElementById("recipientName" + i);
    const checkbox = document.getElementById("checkbox" + i);

    if (textarea1 !== null) {
      async function setItem(userId, key, value) {
        try {
          await setDoc(
            doc(db, "usersDelivery", userId),
            { [key]: value },
            { merge: true },
          );
          console.log("Data saved successfully.");
        } catch (error) {
          console.error("Error saving data:", error);
        }
      }

      const userID = sessionStorage.getItem("ID");

      const userId = sessionStorage.getItem("userId");

      const textarea11 = textarea1.value;
      localStorage.setItem(`${userID}additionalNotes` + i, textarea11);

      const delivery1 = delivery.selectedIndex;
      localStorage.setItem(`${userID}deliveryOptions` + i, delivery1);

      const deliveryNotes3 = deliveryNotes.value;
      localStorage.setItem(`${userID}deliveryNotes` + i, deliveryNotes3);

      const productDescription3 = productDescription.value;
      localStorage.setItem(
        `${userID}productDescription` + i,
        productDescription3,
      );

      const productPrice3 = productPrice.value;
      localStorage.setItem(`${userID}productPrice` + i, productPrice3);

      const postcode3 = postcode.value;
      localStorage.setItem(`${userID}shipPostcode` + i, postcode3);

      const city3 = city.value;
      localStorage.setItem(`${userID}shipCity` + i, city3);

      const addressTwo3 = addressTwo.value;
      localStorage.setItem(`${userID}shipAddressTwo` + i, addressTwo3);

      const addressOne3 = addressOne.value;
      localStorage.setItem(`${userID}shipAddressOne` + i, addressOne3);

      if (event.target.id.includes("recipientName")) {
        const recipientName3 = recipientName.value;
        setItem(userId, "recipientName" + i, recipientName3);
      }

      const checkbox3 = checkbox.checked;
      localStorage.setItem(`${userID}checkbox` + i, checkbox3);
    }
  }

  //}
}
//setInterval(myFunction, 1000);
//});

/*
function handleInputEvent(event) {
  console.log('Input field used:', event.target);
  // Your custom logic here
}
*/

document.addEventListener("input", (event) => {
  if (event.target.tagName === "INPUT") {
    handleInputEvent(event);
  }
});

// Function to save the state of duplicated forms
//function saveFormState(counterClone) {
//localStorage.setItem(counterClone, 'true');

//const clonedForms = document.querySelectorAll('.cloned-form');

//const formState = [];

//clonedForms.forEach(clonedForm => {

// Extract relevant data from the cloned form and store it in an object
//const formData = {
//test: apple,
//recipientName: clonedForm.querySelector('[id^="RecipientName"]').value,
// Add more properties as needed

// Save display-related information
//display: {
//style: clonedForm.getAttribute('style'), // Save inline styles
//classList: Array.from(clonedForm.classList), // Save CSS classes
// Add more display-related properties as needed
//}
//};

//formState.push(formData);
//});

// Store the form state in localStorage
//localStorage.setItem('formState', JSON.stringify(formState));
//}
/*
// Function to restore the state of duplicated forms
function restoreFormState() {
  const savedCounterClone = localStorage.getItem('counterClone');
  //console.log(counterClone)
  //const savedCounter = localStorage.getItem('counterClone');
  //if (savedCounter) {
    if (savedCounterClone !== null) {
      // If a value was retrieved, update the counterClone variable
      counterClone = parseInt(savedCounterClone);
      console.log(counterClone);
  }
  */
//console.log(formState)
//}

//const savedFormState = localStorage.getItem('formState');
//if (savedFormState) {
//console.log("savedFormState has responded")

//const formState = JSON.parse(savedFormState);
//const parsedFormState = JSON.parse(savedFormState);
//formState = parsedFormState;
/*
    formState.forEach((formData, index) => {
      // Select the cloned form corresponding to the current index
      const clonedForm = document.querySelector(`.cloned-form${index}`);

      // Restore the form data to the cloned form elements
      clonedForm.querySelector('[id^="RecipientName"]').value = formData.recipientName;
      // Restore more properties as needed

      // Restore display-related information
      if (formData.display) {
        // Restore inline styles
        clonedForm.setAttribute('style', formData.display.style);
        
        // Restore CSS classes
        clonedForm.classList = formData.display.classList.join(' ');
        // Restore more display-related properties as needed
      }
    });
    */
//}

window.addEventListener("DOMContentLoaded", async () => {
  // Doesn't need userID
  const clearForms = localStorage.getItem("clearForms");

  if (clearForms === "true") {
    console.log("false");
    localStorage.removeItem("clearForms");
    //const counter = 1;
    //localStorage.setItem('myVariable', counter);
    const userID = sessionStorage.getItem("ID");

    localStorage.removeItem(`${userID}myVariable`);
    //const numberofForms11 = localStorage.getItem('myVariable');
    //const numberofFormss = parseInt(numberofForms11)
    for (let i = 1; i <= 10; i++) {
      localStorage.removeItem(`${userID}printLabel` + i);
    }
    //Reason for why page must have "clear forms" button clicked in order to function properly(?)
    let counter = 1;
    //counter = 1;
    //console.log(numberofFormss)
    console.log(counter);

    localStorage.setItem(`${userID}myVariable`, counter);

    async function setItem(userId, key, value) {
      try {
        await setDoc(
          doc(db, "usersDelivery", userId),
          { [key]: value },
          { merge: true },
        );
        console.log("Data saved successfully.");
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }

    const userId = sessionStorage.getItem("userId");
    setItem(userId, "myVariable", counter);

    //Function to set multiple keys simultaneously
    async function setItems(userId, keys, value) {
      if (!Array.isArray(keys)) {
        keys = [keys];
      }

      // Construct the data object
      const data = keys.reduce((obj, key) => {
        obj[key] = value;
        return obj;
      }, {});

      try {
        await setDoc(doc(db, "usersDelivery", userId), data, { merge: true });
        console.log("Data saved successfully.");
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
    //To uncomment
    /*
    for (let i = 1; i <= 10; i++) {
    setItems(userId, ['recipientName' +  i], "")
  }
  */
    setTimeout(() => {
      pressButton();
    }, 4000);
  } else {
    localStorage.removeItem("clearForms");
    //const userID = sessionStorage.getItem('ID');
    async function getItem(userId, key) {
      try {
        const docSnap = await getDoc(doc(db, "usersDelivery", userId));
        if (docSnap.exists()) {
          return docSnap.data()[key];
        } else {
          console.log("No data available");
          return null;
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    }
    const userId = sessionStorage.getItem("userId");
    const numberofForms1 = await getItem(userId, "myVariable");
    //const numberofForms1 = localStorage.getItem(`${userID}myVariable`);
    const numberofForms = parseInt(numberofForms1);
    console.log(numberofForms);
    generateTextareaElementsFromLocalStorage(numberofForms);
  }
});

console.log("8");
// Event listener to save form state before refreshing the page
//window.addEventListener('beforeunload', saveFormState);

// Event listener to restore form state when the page loads

const clearFormsButton = document.getElementById("clearFormsButton");
document.addEventListener("DOMContentLoaded", () => {
  clearFormsButton.addEventListener("click", function () {
    //const userID = sessionStorage.getItem('ID');
    localStorage.setItem("clearForms", "true");
    const checkboxes = document.querySelectorAll('[id^="checkbox"]');
    checkboxes.forEach(function (checkbox) {
      const checkbox1234 = checkbox.id;
      const userID = sessionStorage.getItem("ID");

      localStorage.removeItem(userID + checkbox1234 + 1, "truePaid");
    });

    location.reload(true);
    /*
    const clonedForms = document.querySelectorAll('.cloned-form');
    clonedForms.forEach(clonedForm => {
        clonedForm.remove(); // Remove cloned form from the DOM

      // Delete cloned forms
    const clonedH3Elements = document.querySelectorAll('h3');
    clonedH3Elements.forEach(clonedH3 => {
        clonedH3.remove(); // Remove cloned h3 element from the DOM
    });
  });
  */
  });
});
console.log("9");
window.addEventListener("resize", async function () {
  //const userID = sessionStorage.getItem('ID');
  async function getItem(userId, key) {
    try {
      const docSnap = await getDoc(doc(db, "usersDelivery", userId));
      if (docSnap.exists()) {
        return docSnap.data()[key];
      } else {
        console.log("No data available");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }
  const userId = sessionStorage.getItem("userId");
  const numberofForms1 = await getItem(userId, "myVariable");
  //const numberofForms1 = localStorage.getItem(`${userID}myVariable`);
  const numberofForms = parseInt(numberofForms1);
  if (numberofForms !== null) {
    counter = numberofForms;
    console.log(counter);
  }
  const resize = counter * 220;
  if (window.innerWidth > 768) {
    const checkbox = document.getElementById("checkbox1");
    const checkboxRect = checkbox.getBoundingClientRect();

    const addDeliveryTop =
      checkboxRect.top + window.scrollY + checkboxRect.height + resize - 40;
    const addDeliveryLeft = checkboxRect.left + window.scrollX + 15;

    const addDelivery = document.getElementById("addDeliveryContainer");
    addDelivery.style.position = "absolute";
    addDelivery.style.top = `${addDeliveryTop}px`;
    addDelivery.style.left = `${addDeliveryLeft}px`;
    ///
    const printLabel = document.getElementById("printLabel1");
    const printLabelRect = printLabel.getBoundingClientRect();

    const submitTop =
      printLabelRect.top + window.scrollY + printLabelRect.height - 155;
    let submitLeft = printLabelRect.left + window.scrollX;

    const submit = document.getElementById("payLabel");
    submit.style.position = "absolute";
    submit.style.top = `${submitTop}px`;
    submit.style.left = `${submitLeft}px`;
    ///
    const signOutTop =
      printLabelRect.top + window.scrollY + printLabelRect.height - 150;
    let signOutLeft = printLabelRect.left + window.scrollX + 270;

    const signOut = document.getElementById("signOut");
    signOut.style.position = "absolute";
    signOut.style.top = `${signOutTop}px`;
    signOut.style.left = `${signOutLeft}px`;

    const numberings = document.querySelectorAll('[id^="numbering"]');
    numberings.forEach((numbers) => {
      const digit = numbers.id.match(/\d+$/)[0];
      const checkbox = document.getElementById("checkbox" + digit);
      const numbering = document.getElementById("numbering" + digit);
      const checkboxRect = checkbox.getBoundingClientRect();
      const numberingTop =
        checkboxRect.top + window.scrollY + checkboxRect.height - 80;
      let numberingLeft = checkboxRect.left + window.scrollX;
      numberingLeft -= 35;
      numbering.style.position = "absolute";
      numbering.style.top = `${numberingTop}px`;
      numbering.style.left = `${numberingLeft}px`;
    });
    ///

    ///
    /*
const numberingTop = checkboxRect.top + window.scrollY + checkboxRect.height - 70; 
const numberingLeft = checkboxRect.left + window.scrollX - 21; 

const numbering = document.getElementById("numbering");
numbering.style.position = 'absolute';
numbering.style.top = `${numberingTop}px`;
numbering.style.left = `${numberingLeft}px`;
*/
  } else {
    const checkbox = document.getElementById("checkbox1");
    const checkboxRect = checkbox.getBoundingClientRect();

    const addDeliveryTop =
      checkboxRect.top + window.scrollY + checkboxRect.height + 170;
    const addDeliveryLeft = checkboxRect.left + window.scrollX + 15;

    const addDelivery = document.getElementById("addDeliveryContainer");
    addDelivery.style.position = "absolute";
    addDelivery.style.top = `${addDeliveryTop}px`;
    addDelivery.style.left = `${addDeliveryLeft}px`;
    ///
    const printLabel = document.getElementById("printLabel1");
    const printLabelRect = printLabel.getBoundingClientRect();

    const submitTop =
      printLabelRect.top + window.scrollY + printLabelRect.height - 140;
    const submitLeft = printLabelRect.left + window.scrollX;

    const submit = document.getElementById("payLabel");
    submit.style.position = "absolute";
    submit.style.top = `${submitTop}px`;
    submit.style.left = `${submitLeft}px`;
  }
});

console.log("10");

/*
const generateOrderNumber = () => {
  let id = "";

  while (id.length !== 13) {
    let uuid = v4();
    for (const chr of uuid) {
      const int = parseInt(chr);
      if (!isNaN(int) && int !== 0) {
        if (id.length === 13) {
          break;
        }
        id = id + chr;
      }
    }
  }

  const orderNumber = id.substring(0, 13);
  return orderNumber;
};
*/

function updateAction() {
  console.log("updateAction loading...");

  //document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll("input, textarea, select").forEach((element) => {
    const digit = element.id.match(/\d+$/)[0];
    //const checkboxes = document.querySelectorAll('[id^="checkbox"]');
    //const printbutton = document.getElementById("printLabel"+digit)
    const checkbox = document.getElementById("checkbox" + digit);
    if (checkbox.value === "paid") {
      element.classList.add("no-click-cursor");
      element.disabled = true;
    }
  });

  const printButtons = document.querySelectorAll('[id^="printLabel"]');
  printButtons.forEach((printButton) => {
    //const id = this.id;
    const digit = printButton.id.match(/\d+$/)[0];
    //const checkboxes = document.querySelectorAll('[id^="checkbox"]');
    //const printbutton = document.getElementById("printLabel"+digit)
    const checkbox = document.getElementById("checkbox" + digit);
    if (checkbox.value === "paid") {
      printButton.classList.remove("no-click-cursor");
    }
  });

  const downloadButtons = document.querySelectorAll('[id^="downloadLabel"]');
  downloadButtons.forEach((downloadButton) => {
    //const id = this.id;
    const digit = downloadButton.id.match(/\d+$/)[0];
    //const checkboxes = document.querySelectorAll('[id^="checkbox"]');
    //const printbutton = document.getElementById("printLabel"+digit)
    const checkbox = document.getElementById("checkbox" + digit);
    if (checkbox.value === "paid") {
      downloadButton.classList.remove("no-click-cursor");
    }
  });
  //}
}
async function pressButton() {
  //const userID = sessionStorage.getItem('ID');
  async function getItem(userId, key) {
    try {
      const docSnap = await getDoc(doc(db, "usersDelivery", userId));
      if (docSnap.exists()) {
        return docSnap.data()[key];
      } else {
        console.log("No data available");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }
  const userId = sessionStorage.getItem("userId");
  const counter1 = await getItem(userId, "myVariable");
  //const counter1 = localStorage.getItem(`${userID}myVariable`);

  //document.addEventListener('DOMContentLoaded', () => {
  const printButtons = document.querySelectorAll('[id^="printLabel"]');
  printButtons.forEach(function (printButton) {
    printButton.addEventListener("click", async function (event) {
      event.preventDefault();

      const id = this.id;
      const digit = id.match(/\d+$/)[0];

      //const checkboxes = document.querySelectorAll('[id^="checkbox"]');
      for (let i = 2; i <= 10; i++) {
        let j = i.toString();
        if (counterButton > 1 && counter1 === j && digit !== j) {
          console.log("it's being returned");
          console.log("Counter:" + counter1);
          console.log("Digit:" + digit);
          return;
        } else {
          console.log("Counter:" + counter1);
          console.log("Digit:" + digit);
          console.log("else case");
        }
      }
      const checkbox = document.getElementById("checkbox" + digit);
      if (checkbox.value === "paid") {
        //if (checkbox.checked){
        //generateOrderNumber();

        const recipientName = document.getElementById(
          "recipientName" + digit,
        ).value;
        const deliveryNotes = document.getElementById(
          "deliveryNotes" + digit,
        ).value;
        const additionalNotes = document.getElementById(
          "additionalNotes" + digit,
        ).value;
        const address1 = document.getElementById(
          "shipAddressOne" + digit,
        ).value;
        const address2 = document.getElementById(
          "shipAddressTwo" + digit,
        ).value;
        const address3 = document.getElementById("shipCity" + digit).value;
        const address4 = document.getElementById("shipPostcode" + digit).value;
        const deliveryOptionElement = document.getElementById(
          "deliveryOptions" + digit,
        );
        const deliveryOption =
          deliveryOptionElement.options[deliveryOptionElement.selectedIndex];
        const selectedOption = deliveryOption.text;
        let address = `${address1}\n${address3}\n${address4}\n${"United Kingdom"}`;

        if (address2 !== "") {
          address = `${address1}\n${address2}\n${address3}\n${address4}\n${"United Kingdom"}`;
        }

        const userID = sessionStorage.getItem("ID");

        const storeName = localStorage.getItem(`${userID}storeName`);

        //const orderNumbersMap = {};
        function generateOrderNumber() {
          console.log("Generating...");
          let id = "";

          while (id.length !== 13) {
            let uuid = v4();
            for (const chr of uuid) {
              const int = parseInt(chr);
              if (!isNaN(int) && int !== 0) {
                if (id.length === 13) {
                  break;
                }
                id = id + chr;
              }
            }
          }

          const orderNumber = id.substring(0, 13);
          return orderNumber;
        }
        const check1 = localStorage.getItem(`${userID}printLabel` + digit);
        if (check1 === null) {
          const newOrderNumbers = generateOrderNumber();
          console.log(newOrderNumbers);
          localStorage.setItem(`${userID}printLabel` + digit, newOrderNumbers);
        }

        /*
  if (!orderNumbersMap[digit]) {
    console.log(orderNumbersMap)
    console.log("3333")
    // If the order number doesn't exist for this button, generate a new one
    const newOrderNumber = generateOrderNumber();
    orderNumbersMap[digit] = newOrderNumber + digit;
    console.log(orderNumbersMap)
  }
  
  // Use the existing order number for the button
  const orderNumber = orderNumbersMap[digit];
  */
        const orderNumber = localStorage.getItem(`${userID}printLabel` + digit);
        // Log the order number for debugging
        console.log("Order Number:", orderNumber);
        //return orderNumber;

        console.log(recipientName);
        // Prepare data sent to API
        const data = {
          deliveryAddress: address,
          customerName: recipientName,
          serviceType: selectedOption,
          orderNumber: orderNumber,
          storeName: storeName,
          deliveryNotes: deliveryNotes,
          adminNotes: additionalNotes,
        };

        // Then send it
        const response = await fetch(
          "https://backend.wecarrybags.co.uk/api/v1/partner/create-delivery-label",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );

        // Convert the response into a Blob (binary large object)
        // which we can display
        const pdf = await response.blob();
        const blob = new Blob([pdf], { type: "application/pdf" });

        // Create a local URL for the blob
        const url = URL.createObjectURL(blob);

        // Load the blob into the iframe
        const frame = document.getElementById("pdfFrame");
        pdfFrame.src = url;

        setTimeout(function () {
          frame.contentWindow.print();
          //do what you need here
        }, 700);
      } else {
        event.preventDefault();
      }
    });
  });

  counterButton++;
  console.log("counterButton after increment:" + counterButton);
  const downloadButtons = document.querySelectorAll('[id^="downloadLabel"]');
  // Download buttons
  downloadButtons.forEach(function (downloadButton) {
    downloadButton.addEventListener("click", async function (event) {
      event.preventDefault();
      const id = this.id;
      const digit = id.match(/\d+$/)[0];

      //const checkboxes = document.querySelectorAll('[id^="checkbox"]');
      for (let i = 2; i <= 10; i++) {
        let j = i.toString();
        if (counterButton > 1 && counter1 === j && digit !== j) {
          console.log("it's being returned");
          console.log("Counter:" + counter1);
          console.log("Digit:" + digit);
          return;
        } else {
          console.log("Counter:" + counter1);
          console.log("Digit:" + digit);
          console.log("else case");
        }
      }
      const checkbox = document.getElementById("checkbox" + digit);
      if (checkbox.value === "paid") {
        //if (checkbox.checked){
        const recipientName = document.getElementById(
          "recipientName" + digit,
        ).value;
        const deliveryNotes = document.getElementById(
          "deliveryNotes" + digit,
        ).value;
        const additionalNotes = document.getElementById(
          "additionalNotes" + digit,
        ).value;
        const address1 = document.getElementById(
          "shipAddressOne" + digit,
        ).value;
        const address2 = document.getElementById(
          "shipAddressTwo" + digit,
        ).value;
        const address3 = document.getElementById("shipCity" + digit).value;
        const address4 = document.getElementById("shipPostcode" + digit).value;
        const deliveryOptionElement = document.getElementById(
          "deliveryOptions" + digit,
        );
        const deliveryOption =
          deliveryOptionElement.options[deliveryOptionElement.selectedIndex];
        const selectedOption = deliveryOption.text;

        let address = `${address1}\n${address3}\n${address4}\n${"United Kingdom"}`;
        if (address2 !== "") {
          address = `${address1}\n${address2}\n${address3}\n${address4}\n${"United Kingdom"}`;
        }

        const userID = sessionStorage.getItem("ID");
        const storeName = localStorage.getItem(`${userID}storeName`);

        function generateOrderNumber() {
          console.log("Generating...");
          let id = "";

          while (id.length !== 13) {
            let uuid = v4();
            for (const chr of uuid) {
              const int = parseInt(chr);
              if (!isNaN(int) && int !== 0) {
                if (id.length === 13) {
                  break;
                }
                id = id + chr;
              }
            }
          }

          const orderNumber = id.substring(0, 13);
          return orderNumber;
        }

        const check1 = localStorage.getItem(`${userID}printLabel` + digit);
        if (check1 === null) {
          const newOrderNumbers = generateOrderNumber();
          console.log(newOrderNumbers);
          localStorage.setItem(`${userID}printLabel` + digit, newOrderNumbers);
        }

        const orderNumber = localStorage.getItem(`${userID}printLabel` + digit);

        // Prepare data sent to API
        const data = {
          deliveryAddress: address,
          customerName: recipientName,
          serviceType: selectedOption,
          orderNumber: orderNumber,
          storeName: storeName,
          deliveryNotes: deliveryNotes,
          adminNotes: additionalNotes,
        };

        // Then send it
        const response = await fetch(
          "https://backend.wecarrybags.co.uk/api/v1/partner/create-delivery-label",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );

        // Convert the response into a Blob (binary large object)
        // which we can display
        const pdf = await response.blob();
        const blob = new Blob([pdf], { type: "application/pdf" });

        // Create a local URL for the blob
        const url = URL.createObjectURL(blob);

        // Load the blob into the iframe
        const frame = document.getElementById("pdfFrame");
        pdfFrame.src = url;

        setTimeout(function () {
          //frame.contentWindow.print();
          const downloadLink = document.createElement("a");
          downloadLink.href = url;
          downloadLink.download = storeName + "-" + orderNumber;
          downloadLink.click();
          //do what you need here
        }, 700);
      } else {
        event.preventDefault();
      }
    });
  });
  /*
    }else{
      const printButtons = document.querySelectorAll('[id^="printLabel"]');
      printButtons.forEach(function(printButton) {
      printButton.addEventListener("click", async function(event) {
    
      event.preventDefault();
      });
    });
    const downloadButtons = document.querySelectorAll('[id^="downloadLabel"]');
      downloadButtons.forEach(function(downloadButton) {
      downloadButton.addEventListener("click", async function(event) {
    
      event.preventDefault();
      });
    });
    }
    */
  //});

  //});
  //});
} /////////
//setInterval((pressButton), 3000);
console.log("11");
//updateAction();

// Listen for the storage event to update the action when 'redirectOccurred' changes
window.addEventListener("storage", function (event) {
  const userID = sessionStorage.getItem("ID");
  if (event.key === `${userID}redirectOccurred`) {
    // Call updateAction to update the action based on the new value
    console.log("Redirect occurred");
    updateAction1();
  }
});

console.log("12");
function updateAction1() {
  console.log("updateAction1");
  //Doesn't need userID?
  const userID = sessionStorage.getItem("ID");

  const redirectOccurred = localStorage.getItem(`${userID}redirectOccurred`);
  if (redirectOccurred === "true") {
    console.log("redirect is true");
    const checkboxes = document.querySelectorAll('[id^="checkbox"]');
    checkboxes.forEach(function (checkbox) {
      // Check if the checkbox is checked
      if (checkbox.checked) {
        console.log("for checked checkboxes...");
        checkbox.value = "paid";
        checkbox.disabled = true;
        const checkbox123 = checkbox.id;
        const userID = sessionStorage.getItem("ID");

        localStorage.setItem(`${userID}` + checkbox123 + 1, "truePaid");
        console.log("localStorage of truePaid should be set...");
      }
    });

    const userID = sessionStorage.getItem("ID");

    localStorage.removeItem(`${userID}redirectOccurred`);
    updateAction();
    //pressButton();
    //window.removeEventListener('storage', pressButton);
  }
}

console.log("13");

// shouldn't need?
const buttona = document.getElementById("buttona");
document.addEventListener("DOMContentLoaded", () => {
  buttona.addEventListener("click", function (event) {
    event.preventDefault();
    const userID = sessionStorage.getItem("ID");

    localStorage.removeItem(`${userID}redirectOccurred`);
  });
});

async function sendRequest() {
  const deliveryNotes = document.getElementById("deliveryNotes").value;
  const recipientName = document.getElementById("recipientName").value;
  const address1 = document.getElementById("shipAddress1");
  const address2 = document.getElementById("shipAddress1");
  const addressCity = document.getElementById("shipCity");
  const addressPostcode = document.getElementById("shipPostcode").value;
  const addressCountry = "United Kingdom";

  full_name = document.getElementById("full_name");

  if (validate_address(addressPostcode) == false) {
    alert("Postcode is incorrect");
    return;
    // Don't continue running the code
  }

  const url = "https://backend.wecarrybags.co.uk/api/v1/ebay/create-order";
  const body = {
    deliveryAddress: addressPostcode,
    customerName: recipientName,
    serviceType: "string3",
    deliveryNotes: deliveryNotes,
    orderNumber: "string5",
    storeName: "string6",
    adminNotes: "string7",
  };

  const response = await fetch(url, {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("data from endpoint: ");
  const data = await response.json();

  console.log(data);
}

document.addEventListener("DOMContentLoaded", () => {
  const button1 = document.getElementById("submit");
  button1.addEventListener("click", sendRequest);
});

console.log("14");

/*

  async function sendRequestPrint() {
    const deliveryNotes = document.getElementById("DeliveryNotes").value
    const recipientName = document.getElementById("RecipientName").value
    const address1 = document.getElementById("ShipAddress1")
    const address2 = document.getElementById("ShipAddress1")
    const addressCity = document.getElementById("ShipCity")
    const addressPostcode = document.getElementById("ShipPostcode").value
    const addressCountry = "United Kingdom"

    const url = "https://backend.wecarrybags.co.uk/api/v1/partner/create-delivery-label";
    const body = {deliveryAddress: "addressPostcode",
    customerName: "recipientName",
    serviceType: "string3",
    orderNumber: "deliveryNotes",
    storeName: "string5",
    deliveryNotes: "string6",
    adminNotes: "string7",
    unipass: "a"};

    const response = await fetch(url, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("data from endpoint: ")
    const data = await response.json();

    console.log(data);
  }


  document.addEventListener('DOMContentLoaded', () => {
    const buttonn = document.getElementById("print");
    buttonn.addEventListener("click", sendRequestPrint)
  });

//

*/

/*
// Function that loads the PDF into the iframe
async function load(event) {
  event.preventDefault();
  // Prepare data sent to API
  const data = {
    deliveryAddress: "my address",
    customerName: "my customer name",
    serviceType: "Home",
    orderNumber: "#123-my-order-number",
    storeName: "my-store-name",
  };

  // Then send it
  const response = await fetch(
    "https://backend.wecarrybags.co.uk/api/v1/partner/create-delivery-label",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  // Convert the response into a Blob (binary large object)
  // which we can display
  const pdf = await response.blob();
  const blob = new Blob([pdf], { type: "application/pdf" });

  // Create a local URL for the blob
  const url = URL.createObjectURL(blob);

  // Load the blob into the iframe
  const frame = document.getElementById("pdfFrame");
  pdfFrame.src = url;

  setTimeout(function(){
    frame.contentWindow.print();
    //do what you need here
}, 1000);
}
*/
/*
document.addEventListener("DOMContentLoaded", () => {
  const printButton = document.getElementById("printLabel");
  const condition = printLabel.classList.contains('no-click-cursor');

  printButton.addEventListener("click", async function(event) {
    if (condition) {
      event.preventDefault();
  } else {
    event.preventDefault();
  // Prepare data sent to API
  const data = {
    deliveryAddress: "my address",
    customerName: "my customer name",
    serviceType: "Home",
    orderNumber: "#123-my-order-number",
    storeName: "my-store-name",
  };

  // Then send it
  const response = await fetch(
    "https://backend.wecarrybags.co.uk/api/v1/partner/create-delivery-label",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  // Convert the response into a Blob (binary large object)
  // which we can display
  const pdf = await response.blob();
  const blob = new Blob([pdf], { type: "application/pdf" });

  // Create a local URL for the blob
  const url = URL.createObjectURL(blob);

  // Load the blob into the iframe
  const frame = document.getElementById("pdfFrame");
  pdfFrame.src = url;

  setTimeout(function(){
    frame.contentWindow.print();
    //do what you need here
  }, 700);
  } 
  });
});
*/

function preventBack() {
  // Push a dummy state on page load
  window.history.pushState(null, "", window.location.href);

  // Add an event listener for the popstate event
  window.addEventListener("popstate", function () {
    // Push the state again to ensure back navigation is disabled
    window.history.pushState(null, "", window.location.href);

    // Optional: Display a message or take any other action
  });
}

// Call the function to prevent back navigation on page load
window.onload = preventBack;

function validate_address(addressPostcode) {
  expression =
    /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/;
  if (expression.test(addressPostcode) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

close_pay.addEventListener("click", function (event) {
  event.preventDefault();
  submit.style.display = "block";
  close_pay.style.display = "none";
  pay_form.style.display = "none";
  //transaction.amount = 100
  //console.log(transaction.amount);
});
console.log("15");

document.addEventListener("DOMContentLoaded", () => {
  const signOut = document.getElementById("signOut");
  signOut.addEventListener("click", function () {
    //localStorage.removeItem('signedIn');
    window.location.href = "https://delivery.wecarrybags.co.uk";
  });
});

//Get store's name

async function getStoreName() {
  // Convert email to lower case
  // since all emails in firebase are in lower case too.
  const userID = sessionStorage.getItem("ID");
  const email = localStorage.getItem(`${userID}email`);
  console.log(email);
  const loginEmail = email.toLowerCase();

  // Set up query to retrieve store with this email.
  const q = query(
    // Query the stores collection
    collection(db, "stores"),
    // Where email is equal to variable loginEmail
    where("email", "==", loginEmail),
  );

  // Send query to Firebase to retrieve a snapshot
  const storeSnap = await getDocs(q);

  // Check if there is at least one store in the snapshot.
  // storeSnap.docs is an array containing all of the different stores
  // which the query matched with.
  if (storeSnap.docs.length > 0) {
    // Get first store matched by query. (There should only be one.)
    const storeDoc = storeSnap.docs[0];
    // Get the data for the store
    const storeData = storeDoc.data();
    // "title" property in storeData object is the store's name.
    const name = storeData.title; //
    console.log(name);
    const userID = sessionStorage.getItem("ID");
    localStorage.setItem(`${userID}storeName`, name);
    //localStorage.removeItem('email');
  } else {
    // No stores with this email. Show error.
  }
}
setTimeout(() => {
  getStoreName();
}, 2000);

//

document.addEventListener("DOMContentLoaded", () => {
  submit.addEventListener("click", async function (event) {
    event.preventDefault();
    let transactionAmount = 0;
    let totalPayment = 0;
    const userID = sessionStorage.getItem("ID");

    localStorage.removeItem(`${userID}checkboxPayment`);
    const checkboxes = document.querySelectorAll('[id^="checkbox"]');
    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        if (checkbox.disabled != true) {
          const userID = sessionStorage.getItem("ID");
          localStorage.setItem(`${userID}checkboxPayment`, "true");
          const digit = checkbox.id.match(/\d+$/)[0];
          const deliveryOptions = document.getElementById(
            "deliveryOptions" + digit,
          );
          const selectedOption =
            deliveryOptions.options[deliveryOptions.selectedIndex];
          transactionAmount = selectedOption.value;
          console.log(transactionAmount);
          totalPayment += parseInt(transactionAmount);
        }
      }
    });
    //Doesn't need userID?

    const checkboxPayment = localStorage.getItem(`${userID}checkboxPayment`);
    if (checkboxPayment === null) {
      alert("Please select a form by clicking on its checkbox before you pay");
      return;
    }
    console.log(totalPayment);

    localStorage.setItem(`${userID}totalPayment`, totalPayment);

    const printLabel = document.getElementById("printLabel1");
    const printLabelRect = printLabel.getBoundingClientRect();
    const submit = document.getElementById("payLabel");
    const submitTop =
      printLabelRect.top + window.scrollY + printLabelRect.height - 155;
    const submitLeft = printLabelRect.left + window.scrollX;

    submit.style.position = "absolute";
    submit.style.top = `${submitTop}px`;
    submit.style.left = `${submitLeft}px`;
    window.open(
      "https://delivery.wecarrybags.co.uk/payment",
      "_blank",
      `width=600,height=500', left = ${submitLeft}px, top = ${submitTop}px`,
    );
  });
});
//console.log(totalPayment)
//export {totalPayment};
console.log("16");
