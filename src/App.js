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
  const [searchWord, setSearchWord] = useState("");
  const [showImage, setShowImage] = useState(false);

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
      setShowImage(true);
  }

  function filterSearch(event){
    const value = event.target.value;
    console.log(value);
    setSearchWord(value);
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

      {/* show search box only if show image button is pressed */}
      {showImage && 
        <div> 
        <Row className="pt-2">
          <input type="text" onChange={filterSearch}/>
        </Row>
        <Row>
            {flowerImages.map((image, index) => (
              <div>
              {image.tags.includes(searchWord) && 
          
              <Card className="mr-3 mt-3" key={index}>
                <Card.Text>
                  {image.tags}
                </Card.Text>
                <Card.Img src={image.previewURL} />
              </Card>
              }
            </div>
           ))
          }
      </Row>
      </div>}
      </Container>
    </div>
  );
}

export default App;
