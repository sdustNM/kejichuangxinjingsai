import React from 'react';
import { Carousel } from 'antd'
import p1 from '../../assets/images/p1.jpg'
import p2 from '../../assets/images/p2.jpg'
import p3 from '../../assets/images/p3.jpg'
import p4 from '../../assets/images/p4.jpg'

class HomeCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [p1, p2, p3, p4]
    };
  }


  render() {
    return (
      <Carousel autoplay effect='fade'>
        {
          
          this.state.pictures.map((p, i) => (
            <div key={'pic_key_'+ i} >
              <img src={p} alt={i} width='100%' height={280}/>
            </div>
          ))
        }
      </Carousel>
          )
  }
}

export default HomeCarousel;