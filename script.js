let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// Function to render contacts
function renderContacts() {
  const contactRepeater = document.getElementById('contactRepeater');
  contactRepeater.innerHTML = '';
  contacts.forEach(contact => {
    const contactCard = document.createElement('div');
    contactCard.className = 'contact-card';
    contactCard.innerHTML = `
      <img src="${contact.image}" alt="${contact.name}" />
      <h2>${contact.name}</h2>
      <button onclick="gotoContactPage('${contact._id}')">View Contact</button>
    `;
    contactRepeater.appendChild(contactCard);
  });
}

// Function to goto contact page
function gotoContactPage(id) {
  window.location.href = `contact.html?id=${id}`;
}

// Load contacts from storage
function loadContacts() {
  renderContacts();
}

// Function to load contact details
function loadContactDetails() {
  const contactId = new URLSearchParams(window.location.search).get('id');
  const contact = contacts.find(contact => contact._id === contactId);
  if (contact) {
    document.getElementById('contact-image').src = contact.image;
    document.getElementById('contact-name').textContent = `${contact.firstName} ${contact.lastName}`;
    document.getElementById('contact-email').textContent = `Email: ${contact.email}`;
    document.getElementById('contact-phone').textContent = `Phone: ${contact.phoneNumber}`;
    document.getElementById('contact-birthday').textContent = `Birthday: ${contact.birthday}`;

    document.getElementById('sendEmailButton').addEventListener('click', () => {
      sendEmail(contact.email);
    });

    document.getElementById('removeContactButton').addEventListener('click', () => {
      showRemoveContactConfirmation(contactId);
    });
  }
}

// Function to show remove contact confirmation
function showRemoveContactConfirmation(contactId) {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'block';
  document.getElementById('yesButton').onclick = () => {
    removeContact(contactId);
    lightbox.style.display = 'none';
    window.location.href = 'index.html';
  };
  document.getElementById('noButton').onclick = () => {
    lightbox.style.display = 'none';
  };
}

// Function to send email
function sendEmail(email) {
  const emailContent = document.getElementById('emailContent').value;
  const emailStatus = document.getElementById('emailStatus');
  if (emailContent) {
    // Simulating email send
    setTimeout(() => {
      emailStatus.textContent = 'Email sent successfully!';
      emailStatus.style.color = 'green';
    }, 1000);
  } else {
    emailStatus.textContent = 'Please enter email content!';
    emailStatus.style.color = 'red';
  }
}

// Function to add a new contact
function addContact(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const birthday = document.getElementById('birthday').value;
  const image = document.getElementById('image').files[0];

  const reader = new FileReader();
  reader.onloadend = () => {
    const contact = {
      _id: `${Date.now()}`,
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1] || '',
      email: email,
      phoneNumber: phone,
      birthday: birthday,
      image: reader.result
    };

    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    window.location.href = 'index.html';
  };

  if (image) {
    reader.readAsDataURL(image);
  }
}

// Function to remove contact
function removeContact(id) {
  contacts = contacts.filter(contact => contact._id !== id);
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('contactRepeater')) {
    loadContacts();
  }
  if (document.getElementById('addContactForm')) {
    document.getElementById('addContactForm').addEventListener('submit', addContact);
  }
  if (document.getElementById('contact-page')) {
    loadContactDetails();
  }
});
