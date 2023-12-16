import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

const Index = ({ navigation, settings, page, items }) => {
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
          <PrismicLink field={page.data.image_link} className="cover-image">
            <PrismicNextImage field={page.data.image}/>
          </PrismicLink>
          <div className="intro-text">
            <PrismicRichText field={page.data.text}/>
          </div>
        </div>
        <div className="lab-items">
          {items.map((item, i) => {
            function toggle(){
              document.getElementById(item.uid).classList.toggle("active");
              setTimeout(function() {
                document.getElementById(item.uid).scrollIntoView();
              }, 100);
              
            }
            return(
              <div className="lab-item" key={`labitem${i}`} id={item.uid}>
                <div className="lab-item-cover" onClick={toggle}>
                  <h2>{item.data?.title}</h2>
                  <h4>{item.data.person.data?.title}</h4>
                  <PrismicLink className="download-button" field={item.data.pdf}></PrismicLink>
                </div>
                <div className="content">
                  {item.data.slices.map((slice, j) => {
                    return(
                      <>
                      {slice.slice_type == 'image' &&
                        <div className="image">
                          <PrismicNextImage field={slice.primary.image}/>
                          <div className="caption"><PrismicRichText field={slice.primary.caption}/></div>
                        </div>
                      }
                      {slice.slice_type == 'text' &&
                        <div className="content-block" key={`slice${j}`}>
                          {slice.primary.title &&<h3>{slice.primary.title}</h3>}
                          {slice.primary.text &&<PrismicRichText field={slice.primary.text}/>}
                        </div>
                      }
                      {slice.slice_type == 'quote' &&
                        <div className={`content-block quote ${slice.primary.size}`} key={`slice${j}`}>
                          <PrismicRichText field={slice.primary.quote}/>
                        </div>
                      }
                      </>
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
  const settings = await client.getSingle("settings");
  const page = await client.getByUID("page", "home", { lang: locale });
  const items = await client.getAllByType("item", { 
    lang: locale,
    fetchLinks: 'person.title',
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
