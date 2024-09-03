import React from 'react'
import AnalysicsOverview from '../components/AnalysicsOverview'
import CurrentLessons from '../components/CurrentLessons'
import CurrentActivity from '../components/CurrentActivity'

const HomePage = () => {
  return (
    <div>
      <div>
        <AnalysicsOverview/>
      </div>
      <div className='flex flex-row gap-48 pt-6'>
        <div>
          <CurrentLessons/>
        </div>
        <div>
          <CurrentActivity/>
        </div>
      </div>
    </div>
  )
}

export default HomePage