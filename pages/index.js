import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

const Index = ({ navigation, settings, page, items }) => {


  console.log(items)
  return (
    <Layout
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{settings.data.site_title}</title>
        <meta name="description" content={settings.data.site_description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={settings.data.site_title} />
        <meta property="og:description" content={settings.data.site_description} />
        <meta property="og:image" content={settings.data.image.url} />
      </Head>
      <div className="container">
        <div className="intro">
          <PrismicNextImage field={page.data.image}/>
          <div className="intro-text">
            <PrismicRichText field={page.data.text}/>
          </div>
        </div>
        <div className="lab-items">
          {items.map((item, i) => {
            function toggle(){
              document.getElementById(item.uid).classList.toggle("active");
            }
            return(
              <div className="lab-item" key={`labitem${i}`} onClick={toggle} id={item.uid}>
                <div className="lab-item-cover">
                  <h2>{item.data?.title}</h2>
                  <h4>{item.data.person.data?.title}</h4>
                </div>
                <div className="content">
                  {item.data.slices.map((slice, j) => {
                    return(
                      <div className="content-block" key={`slice${j}`}>
                        <h3>{slice.primary.title}</h3>
                        <PrismicRichText field={slice.primary.text}/>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });
  const page = await client.getByUID("page", "home", { lang: locale });
  const items = await client.getAllByType("item", { 
    lang: locale,
    fetchLinks: 'person.title'
  });


  return {
    props: {
      navigation,
      settings,
      page,
      items
    },
  };
}
