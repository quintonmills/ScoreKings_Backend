const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());


const players = [
 {
 id: 1,
 name: 'Eli Ellis',
 team: 'YNG Dreamerz',
 ppg: 32.9,
 apg: 5.1,
 rpg: 5.5,
 image: 'https://images.overtime.tv/ote-games/e3008e5d-0f63-423a-abbc-49f9bbacc2e0/8e251d72-2e5c-4f4f-86f5-27ecf66c268a.webp', // <-- add an image URL
 },
 {
 id: 2,
 name: 'Ian Jackson',
 team: 'Jelly Fam',
 ppg: 23.4,
 apg: 6.3,
 rpg: 5.4,
 image: 'https://images.overtime.tv/ote-games/e3008e5d-0f63-423a-abbc-49f9bbacc2e0/596c2acd-6993-4230-bcb2-04a64d1a6cd8.webp', // <-- add an image URL
 },
 {
 id: 3,
 name: 'Karter Knox',
 team: 'RWE',
 ppg: 22.7,
 apg: 6.3,
 rpg: 5.4,
 image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8eBNAygFC15sP-8Y9pi7TqD0FN59sIjrHXg&s', // <-- add an image URL
 }
];

// API endpoint
app.get('/api/players', (req, res) => {
 res.json(players);
});

const PORT = 3001;
app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
});