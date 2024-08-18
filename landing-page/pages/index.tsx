import dynamic from "next/dynamic";
import { NextPageWithLayout } from "@/interfaces/layout";
import { MainLayout } from "@/components/layout";
const Herosection = dynamic(() => import("@/components/home-page/Herosection"));
const AboutUs = dynamic(() => import("@/components/home-page/AboutUs"));
const Activities = dynamic(() => import("@/components/home-page/Activities"));

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Herosection />
      <AboutUs />
      <Activities />
    </>
  );
};

Home.getLayout = (page) => <MainLayout headerBgColor={3} footerBgColor={3}>{page}</MainLayout>

export default Home;
