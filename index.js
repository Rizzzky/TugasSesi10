const mahasiswaNim = '2022004000';
const updateData = {
    nama: 'Messi',
    gender: 'L',
    prodi: 'SI',
    alamat: 'Cibolang'
};

fetch(`http://localhost:3000/mahasiswa/${mahasiswaNim}`,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(console => console.error('Error', error));