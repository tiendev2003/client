import {
  BillardPopular,
  BillardPromotion,
  BillardTag,
  BlogItem,
  Destination,
  Hero,Download,
  Search,
  Testimonial
} from "../../components";
 
const HomePage = () => {
  return (
    <>
      <Hero />
      <Search />
      <BillardPromotion />
      <Destination />
      <BillardPopular />
      {/* <BillardTag /> */}
      <Testimonial />
      <Download />
      <BlogItem />
    </>
  );
};

export default HomePage;
