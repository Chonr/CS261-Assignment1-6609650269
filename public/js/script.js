document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    if (passwordField.type === 'password') {
        passwordField.type = 'text'; // Show password
        eyeIcon.classList.remove('ri-eye-off-fill'); 
        eyeIcon.classList.add('ri-eye-fill'); 
    } else {
        passwordField.type = 'password'; // Hide password
        eyeIcon.classList.remove('ri-eye-fill'); 
        eyeIcon.classList.add('ri-eye-off-fill'); 
    }
});


function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (!username || !password) {
        alert("Please fill in both username and password."); 
        return; 
    }

    const isNumericUsername = /^\d{10}$/.test(username);
    const containsNonNumeric = /[^0-9]/.test(username);

    if (isNumericUsername && role !== 'student') {
        alert("Please select a valid role."); 
        return; 
    }

    if (containsNonNumeric && role !== 'lecturer') {
        alert("Please select a valid role."); 
        return; 
    }

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TU5ce4207d6fb3085aba32c5a74e72aa711e9e07ad870eb799d80eb6330f460223e6ddf0d1dabcfca1cf64daecc8900a42'
        },
        body: JSON.stringify({ "UserName" : username, "PassWord" : password })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;

        let details = '';
        
        if (data.status) {
            if (data.type === 'student') {
                details += `
                    Status: ${data.status}
                    Type: ${data.type}
                    Username: ${data.username}
                    Status: ${data.tu_status}
                    Status ID: ${data.statusid || 'N/A'}
                    Display Name (TH): ${data.displayname_th}
                    Display Name (EN): ${data.displayname_en}
                    Email: ${data.email}
                    Department: ${data.department || 'N/A'}
                    Faculty: ${data.faculty || 'N/A'}
                `;
            } else if (data.type === 'employee') {
                details += `
                    Status: ${data.status}
                    Type: ${data.type}
                    Username: ${data.username}
                    Display Name (TH): ${data.displayname_th}
                    Display Name (EN): ${data.displayname_en}
                    Work Status: ${data.StatusWork} (${data.StatusWork == '0' ? 'ลาออก' : data.StatusWork == '1' ? 'ปฏิบัติงาน' : 'ไม่ปฏิบัติงาน'})
                    Employee Status: ${data.StatusEmp}
                    Email: ${data.email}
                    Department: ${data.department || 'N/A'}
                    Organization: ${data.organization || 'N/A'}
                `;
            }
    
            document.getElementById('response').innerText = details;
            document.getElementById('response').style.display = 'block'; 
        } else {
            document.getElementById('message').innerText = `${data.message}`;
            document.getElementById('response').style.display = 'none'; 
        }
    })
    .catch(error => console.error('Error:', error));

    
}

function requestForm() {
    location.reload();
}

function logout() {
    localStorage.removeItem('token'); 
    alert("You have been logged out."); 
    
    document.getElementById('username').value = ''; 
    document.getElementById('password').value = ''; 
    document.getElementById('role').selectedIndex = 0;

    document.getElementById('message').innerText = '';
}
