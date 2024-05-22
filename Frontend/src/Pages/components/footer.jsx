import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


const footer = () => {
    return (
        <footer className='py-20 border-white shadow-lg border-t-2 bg-cyan-950 flex flex-col items-center justify-items-center'>
            <div className="social">
                <a href="https://www.facebook.com" target="_blank" className="site-social facebook hover:scale-110 transition-all">
                    <FaFacebook />
                </a>
                <a href="https://www.youtube.com" target="_blank" className="site-social youtube hover:scale-110 transition-all">
                    <FaYoutube />
                </a>
                <a href="https://www.instagram.com" target="_blank" className="site-social instagram hover:scale-110 transition-all">
                    <FaInstagram />
                </a>
                <a href="https://www.twitter.com" target="_blank" className="site-social twitter hover:scale-110 transition-all">
                    <FaTwitter />
                </a>
            </div>
            <span className="min-w-96 h-2 mt-5 bg-white/15 rounded-full" />
            <p className="text-white text-center mt-5 desc-style">تم صنع هذه المنصة بهدف تهيئة الطالب لـ كامل جوانب الثانوية العامة و ما بعدها</p>
            <p className="mt-5 text-center text-gray-200"><span className="af-be">Developed By</span><a href="https://www.facebook.com/sasa.des2" target="_blank" className="mx-3 text-yellow-400 transition-all hover:scale-x-125 hover:text-yellow-500/75"> Mostafa Abdelwahed </a><span className="af-be">All Copy Rights Reserved @2024</span></p>
        </footer>
    )
}

export default footer
