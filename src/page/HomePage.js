import React from 'react'
import AnalysicsOverview from '../components/AnalysicsOverview'
import CurrentLessons from '../components/CurrentLessons'

const HomePage = () => {
  return (
    <div>
      <div>
        <AnalysicsOverview/>
      </div>
      <div className='gap-16 pt-6'>
        <div>
          <CurrentLessons/>
        </div>
      </div>
    </div>
  )
}

export default HomePage