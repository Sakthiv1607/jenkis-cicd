document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  // Check if username and password are valid
  
    // Successful login
   if (username == "admin" && password == "1505") {
        open('3.html');
	}
  else if (username == "vickas" && password == "vickas") {
        window.open('3.html');}
  else if (username == "indumathi" && password == "indumathi") {
        window.open('3.html');}
  else if (username == "karthiga" && password == "karthiga") {
        window.open('3.html');}
  else if (username == "vasanthkannan" && password == "vasanthkannan") {
        window.open('3.html');}
  else if (username == "prasannakumar" && password == "prasannakumar") {
        window.open('3.html');}
  else if (username == "vijay" && password == "vijay") {
        window.open('3.html');}
  else if (username == "vasanthkumar" && password == "vasanthkumar") {
        window.open('3.html');}
  else if (username == "sabari" && password == "sabari") {
        window.open('3.html');}
  else if (username == "suryaprakash" && password == "suryaprakash") {
        window.open('3.html');}
  else {
    // Invalid login
    alert('Invalid username or password');
  }
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('regUsername').value;
  
  const password = document.getElementById('regPassword').value;
  

  // Check if all fields are filled
  if (username && email && password && confirmPassword) {
    // Check if passwords match
    if (password === confirmPassword) {
      // Successful registration
      alert('Registration Successful');
      // Reset the form
      document.getElementById('registrationForm').reset();
    } else {
      // Passwords don't match
      alert('Passwords do not match');
    }
  } else {
    // Missing fields
    alert('Please fill in all fields');
  }
});
