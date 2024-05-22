import React, { useEffect, useState } from 'react'
import request from '../../../utils/request';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import SkeletonSession from './components/skeletonSession';

const DetailsUserSession = () => {
  const [session, setSession] = useState({});
  const params = useParams();
  const { user } = useSelector(state => state.auth)


  const dataHandler = async () => {
    const { data } = await request.get(`/api/session/one/${params.session}`, {
      headers: {
        Authorization: user.token
      }
    });
    setSession(data.data)
  }

  useEffect(() => {
    dataHandler();
    console.log(session);
  }, [session])

  return (
    <div>
      {
        session._id ?
          <div>
            <h1 className='text-2xl mt-10 mb-7 bg-gray-300 px-10 py-5 rounded'>{session.title}</h1>
            <div style={{padding:"56.34% 0 0 0",position: "relative"}}>
              <iframe src={session.videoUrl} frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style={{position:"absolute", top: "0", left:"0", width:"100%", height: "100%"}}>
              </iframe>
            </div>

            <div dangerouslySetInnerHTML={{__html: session.description}} className='text-xl mt-5 border-b-black border-b-4 bg-gray-300 rounded-xl px-10 py-14'>
              {/* {session.description} */}
              </div>
          </div>
          :
          <SkeletonSession />
      }
    </div>
  )
}

export default DetailsUserSession
