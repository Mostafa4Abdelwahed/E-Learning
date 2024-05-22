import { Link } from "react-router-dom"
import heroImg from "./../../../assets/hero-section/hero.png"
import { useSelector } from "react-redux"

const hero = () => {
    const { user } = useSelector(state => state.auth);
    return (
        <section className="hero-section text-gray-600 bg-slate-100 body-font">
            <div className="container max-w-5xl mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                    <img className="max-h-full hero-img" width="320" alt="hero" src={heroImg} />
                </div>
                <div className="lg:flex-grow font-ku md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <span className='text-rose-500 font-ku font-bold text-lg'>مستر/</span>
                    <h1 className='font-ku mb-3 text-cyan-700 font-bold text-6xl handlename text-right'>خالد صقر</h1>
                    <p className='font-ku text-rose-500 text-3xl text-right leading-relaxed'>مــــنصة متخــــصــــصــــة في علم الأحياء</p>
                    <div className="flex justify-center gap-2 mt-3 flex-col">
                        {!user ? <Link to="/login" className="bg-cyan-500 border-2 border-cyan-500 hover:text-cyan-500 hover:bg-white flex items-center text-white dark:text-gray-300 justify-center gap-x-3 text-sm sm:text-base  dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg duration-300 transition-colors px-5 py-2.5">
                            <span className='text-lg text-right'>تسجيل الدخول !</span>
                        </Link> : <></>}
                        {/* <button className="bg-rose-700 border-2 border-rose-700 hover:text-rose-700 hover:bg-white flex items-center text-white dark:text-gray-300 justify-center gap-x-3 text-sm sm:text-base  dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg duration-300 transition-colors px-5 py-2.5">
                            <span className='text-sm font-ku'>منتدي طلبه خالد صقر</span>
                        </button> */}

                    </div>
                </div>
            </div>
        </section>

    )
}

export default hero
