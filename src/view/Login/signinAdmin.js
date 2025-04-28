async function signin() {
    let hostkey = document.getElementById('hostkey').value;
    let currEmail = document.getElementById('email').value;
    let currPassword = document.getElementById('password').value;

    if (!currEmail || !currPassword || !hostkey) {
        alert('Invalid input');
        return;
    }

    const response = await axios.post(`${CONFIG.API_BASE_URL}/adminSignin`, {
        hostkey: hostkey,
        email: currEmail,
        password: currPassword
    });
    console.log(response);

    if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        console.log("go to the admin page");
        window.location.href = '../AdminProfile/Profile.html';
    } else {

        alert(response.data.message);
    }
}
