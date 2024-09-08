import React from 'react'
import AnalysicsOverview from '../components/AnalysicsOverview'
import CurrentLessons from '../components/CurrentLessons'
import CurrentActivity from '../components/CurrentActivity'
import Current from '../components/Current'

const HomePage = () => {
  return (
    <div>
      <div>
        <AnalysicsOverview/>
      </div>
      <div className='gap-16 pt-6'>
        {/* <div>
          <CurrentLessons/>
        </div>
        <div>
          <CurrentActivity/>
        </div> */}
        <div>
          <Current />
        </div>
      </div>
    </div>
  )
}

export default HomePage