type carouselItem = {
  id: number;
  promoName: string;
  promoDesc: string;
  url: string;
};
const carouselData: carouselItem[] = [
  {
    id: 1,
    promoName: "Spring Sale",
    promoDesc: "Suit up for Spring with up to 30% discount",
    url: "https://static.nike.com/a/images/t_prod/w_1536,c_limit/3de1aac6-ff9b-40df-aca0-407857781bb8/pdp.jpg",
  },
  {
    id: 2,
    promoName: "Black Friday Sale",
    promoDesc: "Suit up for Black Friday with up to 20% discount",
    url: "https://img.buzzfeed.com/buzzfeed-static/static/2020-05/15/13/asset/5ddd925391f1/sub-buzz-872-1589548499-9.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto",
  },
  {
    id: 3,
    promoName: "Chrismas Sale",
    promoDesc: "Suit up for Chrismas with up to 30% discount",
    url: "https://thumbs.dreamstime.com/b/model-walks-runway-nike-levi-s-kids-fashion-show-mercedes-benz-fashion-week-fall-new-york-ny-february-51215011.jpg",
  },
];

const Carousel = () => {
  return (
    <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img
          src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
