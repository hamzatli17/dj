import qs from 'qs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

export default function SearchPage({ events }) {
  const router = useRouter()

  return (
    <Layout title='Search Results'>
      <Link href='/events'>Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.attributes.id} evt={evt} />
      ))}
    </Layout>
  )
}  

export async function getServerSideProps({ query: { term } }) {
    const qs = require('qs');
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  })

  const res = await fetch(`${API_URL}/events?${query}`)
  console.log("res",res)
  const eve = await res.json()
  console.log(eve)
  const events =eve.data
console.log(events)
  return {
    props: { events },
  }
}
