import dynamic from "next/dynamic";
import { NextPageWithLayout } from "@/interfaces/layout";
import { MainLayout } from "@/components/layout";

const NotFoundPage: NextPageWithLayout = () => {
    return (
      <>

      </>
    );
  };
  
  NotFoundPage.getLayout = (page) => <MainLayout headerBgColor={3} footerBgColor={3}>{page}</MainLayout>
  
  export default NotFoundPage;