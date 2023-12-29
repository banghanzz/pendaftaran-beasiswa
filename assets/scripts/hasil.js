const dataContainer = document.querySelector('.data-container');

// event yang bekerja saat DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('dataMahasiswa')) {
        const data = JSON.parse(localStorage.getItem('dataMahasiswa'));
        const base64Content = localStorage.getItem(data[0][6]);

        let html = '';

        // melakukan perulangan pada data
        for (let i = 0; i < data.length; i++) {
            html += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${data[0][0]}</td>
                <td>${data[0][1]}</td>
                <td>${data[0][2]}</td>
                <td>${data[0][3]}</td>
                <td>${data[0][4]}</td>
                <td>${data[0][5]}</td>
                <td><a href="data:application/octet-stream;base64,${base64Content}" download="${data[0][6]}">${data[0][6]}</a></td>
                <td>Belum diverifikasi</td>
            </tr>
            `;
        }

        dataContainer.innerHTML = html;
    }
});