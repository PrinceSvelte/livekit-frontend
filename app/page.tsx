import Hero from '@/components/Hero'
import Image from 'next/image'
import LoginForm from "../components/LoginForm"
import LiveKitComponent from '@/components/LivekitComponent'

export default function Home() {
  return (
    <main className='overflow-hidden'>
      {/* <Hero /> */}
      {/* <LoginForm /> */}
      {/* <LiveKitComponent /> */}
      <LoginForm />
    </main>
  )
}
