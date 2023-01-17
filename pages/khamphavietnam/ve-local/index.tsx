import AboutPage from "@/app/about";
import type { NextPage } from "next";
const AboutLocal: NextPage = () => {
  return <AboutPage />;
};

export default AboutLocal;

export async function getStaticProps() {
  return {
    props: {},
  };
}
