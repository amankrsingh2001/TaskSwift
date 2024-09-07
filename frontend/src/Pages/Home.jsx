import Body from "../components/Body/Body.jsx"
import Footer from "../components/Footer/Footer.jsx"
import Header from "../components/Header/Header.jsx"

const Home = () => {
    return (
        <section className="flex flex-col gap-1 p-2 h-screen">
          <Header />
          <Body/>
          <Footer/>
        </section>
      )
}

export default Home;