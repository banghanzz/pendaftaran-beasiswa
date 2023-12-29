const allInputs = document.querySelectorAll('.input');
const emailInput = document.querySelector('#email');
const semesterInput = document.querySelector('#semester');
const ipkInput = document.querySelector('#ipk');
const pilihanInput = document.querySelector('#pilihanBeasiswa');
const uploadInput = document.querySelector('#uploadFile');
const daftarButton = document.querySelector('#daftarButton');
const form = document.querySelector('form');

const dataMahasiswa = [];

// Event submit data pada form
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Memasukkan semua input ke array
    const values = [];
    allInputs.forEach((input) => {
        values.push(input.value);
    })
    values.push(uploadInput.files[0].name);

    // Memasukkan file ke reader
    const reader = new FileReader();
    reader.onload = function (event) {
        const base64Content = event.target.result.split(',')[1];

        localStorage.setItem(uploadInput.files[0].name, base64Content);
    }

    reader.readAsDataURL(uploadInput.files[0]);

    // Memasukkan data ke localStorage
    dataMahasiswa.push(values);
    localStorage.setItem('dataMahasiswa', JSON.stringify(dataMahasiswa));

    window.location.href = '../../views/hasil.html';
});

// Event menampilkan IPK dan input/button disable/enable
semesterInput.addEventListener('change', () => {
    if (semesterInput.value != '') {
        const Ipk = randomIPK(2, 4);

        // Menampilkan IPK
        ipkInput.value = Ipk;

        // Disable/Enable Input dan Button
        if (ipkInput.value < 3) {
            pilihanInput.disabled = true;
            uploadInput.disabled = true;
            daftarButton.disabled = true;
        } else {
            pilihanInput.disabled = false;
            uploadInput.disabled = false;
            daftarButton.disabled = false;
        }
    }
});

// Event mengecek format email
emailInput.addEventListener('input', () => {
    if (isValidEmail(emailInput.value)) {
        emailInput.style.borderColor = 'green';
    } else {
        emailInput.style.borderColor = 'red';
    }
});

// Validasi format email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function Random IPK dalam desimal
function randomIPK(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
}
