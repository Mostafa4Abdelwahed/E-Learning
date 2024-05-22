import Hero from './components/hero';
import Courses from "./components/courses"
import Features from './components/features';
import HelmetHandler from "./../../utils/helmetHandler"
import "./home.css";


const Home = () => {
    return (
        <>
            <HelmetHandler title="الصفحة الرئيسية" />
            <Hero />
            <Features />
            <Courses />
        </>
    )
}

export default Home
