
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import {useRouter} from 'next/router'
export default function EventPage({evt}) {
  const router = useRouter()
  const deleteEvent = async (e) => {
   if (confirm('Are you sure?')) {
     const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
      method: 'DELETE'
      })
   const data = await res.json()
   if (!res.ok) {
    toast.error(data.message)
   } else {
     router.push('/events')
   }

     }
}
  return (
    <Layout>
    <h1>My Event</h1>
    <div className={styles.event}>
      <div className={styles.controls}>
        <Link href={`/events/edit/${evt.id}`}>
          <a>
            <FaPencilAlt /> Edit Event
          </a>
        </Link>
        <a href='#' className={styles.delete} onClick={deleteEvent}>
          <FaTimes /> Delete Event
        </a>
      </div>

      <span>
        {evt.attributes.date} at {evt.attributes.time}
      </span>
      <h1>{evt.attributes.name}</h1>
      {evt.attributes.image.data.attributes && (
        <div className={styles.image}>
          <Image src={evt.attributes.image.data.attributes.formats.medium.url} width={960} height={600} />
        </div>
      )}

      <h3>Performers:</h3>
      <p>{evt.attributes.performers}</p>
      <h3>Description:</h3>
      <p>{evt.attributes.description}</p>
      <h3>Venue: {evt.attributes.venue}</h3>
      <p>{evt.attributes.address}</p>

      <Link href='/events'>
        <a className={styles.back}>{'<'} Go Back</a>
      </Link>
    </div>
  </Layout>
  )
}
/* export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`)
  
  const eve = await res.json()
  const events =eve.data
  const paths = events.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }))

  return {
    paths,
    fallback: true,
  }
}
export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const eve = await res.json()
 
console.log (eve)
  return {
    props: {
      evt: eve[0],
    },
    revalidate: 1,
  }
} */


 export async function getServerSideProps({ query: { slug } }) {
  const qs = require('qs');
  const query = qs.stringify({
    populate: '*', 
  }, {
    encodeValuesOnly: true,
  });
  const res = await fetch(`${API_URL}/api/events?${query}&slug=${slug}`)
  const eve = await res.json()
  const events =eve.data
 console.log(events)
   return {
     props: {
       evt: events[0],
     },
   }
  }