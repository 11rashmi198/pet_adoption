const express = require('express');
const app = express();

app.use(express.json());

// Sample pet data
const pets = [
  {
    id: 1,
    name: "Bella",
    type: "Dog",
    age: "3",
    breed: "Labrador Retriever",
    fun_fact: "They can smell incredibly well",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=400&h=400&q=80.jpg"
  },
  {
    id: 2,
    name: "Luna",
    type: "Cat",
    age: "2",
    breed: "Persian",
    fun_fact: " Cats can make over 100 different sounds",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Persialainen.jpg"
  },
  {
    id: 3,
    name: "Luna",
    type: "Rabbit",
    age: "1",
    breed: " Mini Lop",
    fun_fact: "  Rabbits cannot vomit",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Miniature_Lop.jpg/250px-Miniature_Lop.jpg"
  },
   {
  id: 4,
    name: "Rio",
    type: "Parrot",
    age: "4",
    breed: "  Macaw",
    fun_fact: "  ability to mimic sounds, including human speech",
    image: "https://lafeber.com/pet-birds/wp-content/uploads/2018/06/Blue-and-Gold-Macaw.jpg"
  }
];


let nextAdoptionId = 7000;
const adoptions = [];

// API 1: GET /pets — list basic info of all pets
app.get('/pets', (req, res) => {
  const list = pets.map(({id, name, type, image}) => ({id, name, type, image}));
  res.json(list);
});

// API 2: GET /pets/:id — details of one pet
app.get('/pets/:id', (req, res) => {
  const petId = parseInt(req.params.id);
  const pet = pets.find(p => p.id == petId);
  if (!pet) {
    return res.status(404).json({error: "Pet not found"});
  }
  res.json(pet);
});

const mockAuth = (req, res, next) => {
  next();
};

// API 3: POST /adopt — submit adoption request
app.post('/adopt', mockAuth, (req, res) => {
  const { pet_id, applicant_name, email, reason } = req.body;
  if (!pet_id || !applicant_name || !email || !reason) {
    return res.status(400).json({error: "Missing required fields"});
  }

  const pet = pets.find(p => p.id == pet_id);
  if (!pet) {
    return res.status(400).json({error: "Invalid pet_id"});
  }

  const newAdoption = {
    adoption_id: ++nextAdoptionId,
    pet_id,
    applicant_name,
    email,
    reason,
    status: "pending_review"
  };

  adoptions.push(newAdoption);

  res.json({
    adoption_id: newAdoption.adoption_id,
    status: newAdoption.status,
    message: "Your adoption request has been received!"
  });
});

// Start server
app.listen(1000, () => {
    console.log("Server started")
})