import "./feature.css"
import timer from "./../../../assets/feature-icons/timer-feature.png"
import customer from "./../../../assets/feature-icons/customer-feature.png"
import repeat from "./../../../assets/feature-icons/repeat-feature.png"

const features = () => {
    return (
        <div className="bg-cyan-700 py-20">
            <h1 className='text-center text-white text-3xl mb-24'>أهم المميزات</h1>
            <div className='max-w-screen-xl mt-5 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-10'>
                <div className="feature-wrapper">
                        <img src={repeat} alt="Feature Image" />
                    <h4 className="title">وفر وقت المواصلات</h4>
                    <p className="text">وفر وقت و مجهود المواصلات و ذاكر اونلاين  بأفضل جودة.</p>
                </div>
                <div className="feature-wrapper">
                    <img src={customer} alt="Feature Image" />
                    <h4 className="title">شاهد دروسك اونلاين</h4>
                    <p className="text">تقدر تشوف دروسك اكثر من مره و تقدر تسأل علي اي حاجه وقفت معاك.</p>
                </div>
                <div className="feature-wrapper">
                    <img src={timer} alt="Feature Image" />
                    <h4 className="title">دعم فني متواجد</h4>
                    <p className="text">متوفر دعم فني في خدمتك علي مدار الـ24 ساعه.</p>
                </div>
            </div>
        </div>
    )
}

export default features