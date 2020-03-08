import React, {useState} from 'react';
import randomWords from 'random-words';
import fetch from 'node-fetch';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";



function App() {

  const [currentWord, setCurrentWorld] = useState();
  const [flowerImages, setImages] = useState([]);

  function buttonClick(){
    setCurrentWorld(randomWords());
  }

  function searchButton(){
    const key = "15419233-8d28ff99c4a3abd7ff68c5e3b";
    fetch(`https://pixabay.com/api/?key=${key}&q=${currentWord}&image_type=photo`)
      .then(res => res.json())
      .then(json => {
        setImages(json.hits);
        console.log(json.hits);
      })

  }
  return (
    <div>
      <Container>
        
      <h1>{currentWord}</h1>
      <Row className="pb-2">
      <button className="btn btn-primary" onClick={buttonClick}>change heading</button>
      </Row>
      <Row>
      <button className="btn btn-primary" onClick={searchButton}>show images</button>
      </Row>
      <Row>
        {flowerImages.map((image, index) => (
          <img src={image.previewURL} key={index}/>
        ))}
        
      </Row>
      </Container>
    </div>
  );
}

export default App;
