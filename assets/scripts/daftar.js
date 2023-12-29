const allInputs = document.querySelectorAll('.input');
const emailInput = document.querySelector('.email-input');
const semesterInput = document.querySelector('.semester-input');
const ipkInput = document.querySelector('.ipk-input');
const pilihanInput = document.querySelector('.pilihan-input');
const uploadInput = document.querySelector('.upload-input');
const daftarBtn = document.querySelector('.daftar-btn');
const form = document.querySelector('form');

const dataMahasiswa = [];

// event untuk submit data pada form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const values = [];

    allInputs.forEach((input) => {
        values.push(input.value);
    })
    values.push(uploadInput.files[0].name);

    const reader = new FileReader();

    reader.onload = function (event) {
        const base64Content = event.target.result.split(',')[1];

        localStorage.setItem(uploadInput.files[0].name, base64Content);
    }

    reader.readAsDataURL(uploadInput.files[0]);

    dataMahasiswa.push(values);
    localStorage.setItem('dataMahasiswa', JSON.stringify(dataMahasiswa));

    window.location.href = '../../views/hasil.html';
});

// event untuk menampilkan IPK dan membuat inputan dan button disable atau enable
semesterInput.addEventListener('change', () => {
    if (semesterInput.value != 'Pilih') {
        const Ipk = randomIPK(2, 4);
        ipkInput.value = Ipk;
        if (ipkInput.value < 3) {
            pilihanInput.disabled = true;
            uploadInput.disabled = true;
            daftarBtn.disabled = true;
        } else {
            pilihanInput.disabled = false;
            uploadInput.disabled = false;
            daftarBtn.disabled = false;
        }
    }
});

// event mengecek format email
emailInput.addEventListener('input', () => {
    if (isValidEmail(emailInput.value)) {
        emailInput.style.borderColor = 'green';
    } else {
        emailInput.style.borderColor = 'red';
    }
});

// function untuk validasi format email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// function untuk memberi IPK 0-4 termasuk desimal
function randomIPK(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
}
