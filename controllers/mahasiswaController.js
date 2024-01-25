const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/',(req, res) => {
    db.query('SELECT * FROM mahasiswa',(error, result) => {
        if (error){
            console.error('Error fetching mahasiswa: ',error)
            res.status(500).json({message: ' Internal Server Error'});
    } else {
        res.json(result);
    }
 });
});

router.put('/:nim',(req, res)=>{
    const mahasiswaNim = req.params.nim;
    const {nama, gender, prodi, alamat } = req.body;
    db.query('UPDATE mahasiswa SET nama = ?,gender = ?,prodi= ?,alamat = ? where nim = ? ',
    [nama, gender, prodi, alamat, mahasiswaNim],(error)=>{
        if (error){
            console.error('Error updating mahasiswa: ', error);
            res.status(500).json({message: 'Internal Server Error' });
        } else{
            res.json('Updating mahasiswa Succesfullys');
        }
    });
});

router.get('/:nim',(req, res)=>{
    const mahasiswaId = req.params.nim;
    db.query('SELECT * FROM mahasiswa WHERE nim = ?', [mahasiswaId],(error, result)=>{
        if (error) {
            console.error('Error updating mahasiswa: ', error);
            res.status(500).json({message: 'Internal Server Error' });
        } else if (result.length === 0 ) {
            res.status(404).json({ message: 'Mahasiswa not Found'});
        } else {
            res.json(result[0]);
        }
    });
});

router.post('/:nim', (req, res) => {
    const { nim, nama, gender, prodi, alamat } = req.body;
    db.query('INSERT INTO mahasiswa VALUES (nim, nama, gender, prodi, alamat) VALUES (?, ?, ?, ?, ?)',
        [nim, nama, gender, prodi, alamat], (error) => {
            if (error) {
                console.error('Error adding mahasiswa: ', error);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.json('Adding mahasiswa successfully');
            }
        });
});

router.delete('/:nim', (req, res) => {
    const mahasiswaNim = req.params.nim;
    db.query('DELETE FROM mahasiswa WHERE nim = ?', [mahasiswaNim], (error) => {
        if (error) {
            console.error('Error deleting mahasiswa: ', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json('Deleting mahasiswa successfully');
        }
    });
});


module.exports = router;