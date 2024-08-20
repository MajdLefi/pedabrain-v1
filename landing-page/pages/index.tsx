import dynamic from "next/dynamic";
import { NextPageWithLayout } from "@/interfaces/layout";
import { MainLayout } from "@/components/layout";
const Herosection = dynamic(() => import("@/components/home-page/Herosection"));
const AboutUs = dynamic(() => import("@/components/home-page/AboutUs"));
const Activities = dynamic(() => import("@/components/home-page/Activities"));
const Books = dynamic(() => import("@/components/home-page/Books"));
const OurTeam = dynamic(() => import("@/components/home-page/OurTeam"));
const ContactUs = dynamic(() => import("@/components/home-page/ContactUs"));

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Herosection />
      <AboutUs />
      <Activities />
      <Books />
      <OurTeam />
      <ContactUs />
    </>
  );
};

Home.getLayout = (page) => <MainLayout headerBgColor={3} footerBgColor={3}>{page}</MainLayout>

export default Home;
