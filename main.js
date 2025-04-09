// Contact Constructor
function Contact(name, phone, email, address) {
  this.name = name;
  this.phone = phone;
  this.email = email;
  this.address = address;
}

// Contact List Array
let contactList = [];

// Function to create a new row element
const createNewRow = (name, phone, email, address, index) => {
  const row = document.createElement("li");
  row.classList.add("row");

  const firstCell = document.createElement("div");
  firstCell.innerText = name;

  const secondCell = document.createElement("div");
  secondCell.innerText = phone;

  const thirdCell = document.createElement("div");
  thirdCell.innerText = email;

  const fourthCell = document.createElement("div");
  fourthCell.innerText = address;

  row.appendChild(firstCell);
  row.appendChild(secondCell);
  row.appendChild(thirdCell);
  row.appendChild(fourthCell);

  if (index !== -1) {
    const removeButton = document.createElement("button");
    removeButton.innerText = "X";
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", () => {
      removeContact(index);
    });
    row.appendChild(removeButton);
  }

  return row;
};

// Function to remove a contact
const removeContact = (index) => {
  contactList.splice(index, 1);
  // Update localStorage after removal
  localStorage.setItem("contacts", JSON.stringify(contactList));
  displayContacts();
};

const clearContacts = () => {
  const contactListElement = document.getElementById("contact-list");
  while (contactListElement.firstChild) {
    contactListElement.removeChild(contactListElement.firstChild);
  }
};

const displayContacts = () => {
  const contactListElement = document.getElementById("contact-list");
  clearContacts();

  // Append the title row
  contactListElement.appendChild(
    createNewRow("Name", "Phone", "Email", "Address", -1)
  );

  // Append the contact rows
  contactList.forEach((contact, index) => {
    contactListElement.appendChild(
      createNewRow(
        contact.name,
        contact.phone,
        contact.email,
        contact.address,
        index
      )
    );
  });
};

// Function to add the new contact
const addContact = () => {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  if (/\d/.test(name)) {
    document.getElementById("title").innerText = "Name can't contain numbers.";
    document.getElementById("title").style.color = "red";
    return;
  }

  if (/[a-zA-Z]/.test(phone)) {
    document.getElementById("title").innerText =
      "Phone field can't contain letters.";
    document.getElementById("title").style.color = "red";
    return;
  }

  const contact = new Contact(name, phone, email, address);
  contactList.push(contact);

  // Update localStorage
  localStorage.setItem("contacts", JSON.stringify(contactList));

  displayContacts();

  // Reset the input fields after adding the contact
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("address").value = "";
};

// Function to load contacts from localStorage
const loadContacts = () => {
  const savedContacts = localStorage.getItem("contacts");
  if (savedContacts) {
    contactList = JSON.parse(savedContacts);
    displayContacts();
  }
};

// Function to setup event listeners
const setupEventListeners = () => {
  const form = document.getElementById("addContactForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addContact();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  loadContacts(); // Load contacts from localStorage on page load
  setupEventListeners();
});
