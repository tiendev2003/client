import {
  BillardPopular,
  BillardPromotion,
  BillardTag,
  Destination,
  Hero,
  Search
} from "../../components";
 
const HomePage = () => {
  return (
    <>
      <Hero />
      <Search />
      <BillardPromotion />
      <Destination />
      <BillardPopular />
      <BillardTag />
    
      {/* <BlogItem /> */}
    </>
  );
};

export default HomePage;
