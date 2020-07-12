import React from "react";
import Header from "./header";
import Footer from "./footer";
import Note from "./note";

function App() {
  return (
    <div>
      <Header />
      <Note name="List of all cars" 
      about="Here we will render all the cars" 
      />
      <Note
        name="List of all available cars"
        about="Here we will render all the available cars"
      />
      <Note
        name="List of all SUV cars"
        about="Here we will render all the SUV cars"
      />
      <Note
        name="List of all Sedan cars"
        about="Here we will render all the Sedan cars"
      />
      <Note
        name="List of all Hatchback cars"
        about="Here we will render all the Hatchback cars"
      />
      <Note name="Rent cars" />
      <Footer />
    </div>
  );
}

export default App;
