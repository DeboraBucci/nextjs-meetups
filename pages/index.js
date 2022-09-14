// our-domain/
import { Fragment } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// THESE TWO FUNCTIONS ONLY RUN ON THE SERVER SIDE, AND NOT THE CLIENT SIDE
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }

export async function getStaticProps() {
  // fetch data
  const client = await MongoClient.connect(
    "mongodb+srv://Max:panqueques123@cluster0.alrbrza.mongodb.net/meetups"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, // seconds waited to re-generate the page
  };
}

export default HomePage;
