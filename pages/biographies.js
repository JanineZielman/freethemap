import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { PrismicRichText } from "@prismicio/react";
import Collapsible from 'react-collapsible';
import { PrismicNextImage } from "@prismicio/next";

const BioPage = ({ navigation, settings, page, items }) => {
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
      <div className="container bios">
        <h2 className="page-title">{page.data.title}</h2>
        <div className="people">
          {items.map((item, i) => {
            return(
              <div className="person" id={item.uid} key={`person${i}`}>
                <Collapsible trigger={item.data.title}>
                  <PrismicNextImage field={item.data.image}/>
                  <PrismicRichText field={item.data.bio}/>
                </Collapsible>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  );
};

export default BioPage;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings");
  const page = await client.getSingle("biographies", { lang: locale });
  const items = await client.getAllByType("person", { 
    lang: locale
  });

  items.sort((a, b) => {
    if (a.uid < b.uid) {
      return -1;
    }
    if (a.uid > b.uid) {
      return 1;
    }
    return 0;
  })


  return {
    props: {
      navigation,
      settings,
      page,
      items
    },
  };
}
