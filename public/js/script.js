function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (!username || !password) {
        alert("Please fill in both username and password."); // แจ้งเตือนให้กรอกข้อมูล
        return; // หยุดการทำงานของฟังก์ชัน
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
    })
    .catch(error => console.error('Error:', error));

}

function call_REST_API_Hello() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert("Please fill in both username and password."); // แจ้งเตือนให้กรอกข้อมูล
        return; // หยุดการทำงานของฟังก์ชัน
    }

    const url = (
        'http://localhost:3000/hello?' + 
        new URLSearchParams({ myName: username, lastName: password }).toString()
    );
    
    fetch(url)
    .then(response => response.text())
    .then(text => {
        document.getElementById('message').innerText = text;
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
}
