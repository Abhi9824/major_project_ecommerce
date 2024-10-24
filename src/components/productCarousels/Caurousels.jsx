import Carousel from 'react-bootstrap/Carousel';
import "./Caurousels.css";

const Caurousels = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className='d-block w-100 img-fluid'
          style={{ height: '80vh', objectFit: 'cover', objectPosition: 'center' }}
          src='https://www.superkicks.in/cdn/shop/files/GEL_KAYANO_14.png?v=1728461017'
          alt="Latest Nike Dunks"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className='d-block w-100 img-fluid'
          style={{ height: '80vh', objectFit: 'cover', objectPosition: 'center' }}
          src='https://www.superkicks.in/cdn/shop/files/PUMA_PALERMO_SUPERTIFO.jpg?v=1728131939'
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className='d-block w-100 img-fluid'
          style={{ height: '80vh', objectFit: 'cover', objectPosition: 'center' }}
          src='https://www.superkicks.in/cdn/shop/files/GAZELLE_INDOOR_BANNERpsb.jpg?v=1727946424'
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className='d-block w-100 img-fluid'
          style={{ height: '80vh', objectFit: 'cover', objectPosition: 'center' }}
          src='https://www.superkicks.in/cdn/shop/files/PUMA_x_KIDSUPER.png?v=1728461017'
          alt="Fourth slide"
        />
        <Carousel.Caption>
          <h3>Fourth slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Caurousels;
