function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Show inbox elements
  if (mailbox === 'sent') {
    document.querySelector('#emails-view').innerHTML += '<div id="email-list"></div>';
    fetch('/emails/sent')
    .then(response => response.json())
    .then(emails => {
    console.log(emails);
    document.querySelector('#email-list').innerHTML = '';
    for (const email of emails) {
        var sender = document.createElement('div');
        var subject = document.createElement('div');
        var timestamp = document.createElement('div');
        sender.innerHTML = email.sender;
        subject.innerHTML = email.subject;
        timestamp.innerHTML = email.timestamp;
        var line = document.createElement('hr');
        document.querySelector('#email-list').append(sender);
        document.querySelector('#email-list').append(subject);
        document.querySelector('#email-list').append(timestamp);
        document.querySelector('#email-list').append(line);
  }
  }); 
  } else {
    document.querySelector('#para').innerHTML = ''; 
  }

}

document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});