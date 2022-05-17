import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'


export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>My Events</h1>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.attributes.id} evt={evt} />
      ))}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const eve = await res.json()
const events = eve.data
  return {
    props: { events },
    revalidate: 1,
  }
}