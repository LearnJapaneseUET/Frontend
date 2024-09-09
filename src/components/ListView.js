import React from 'react'
import WordItem from '../components/WordItem'

const ListView = ({words}) => {
  return (
    <div className='mt-6'>
        {words && words.length > 0 && (
            <div className="list_detail">
                {words.map((word, index) => (
                    <div key={index}>
                        <WordItem word={word} className={'flex flex-row p-1 rounded-xl hover:bg-gray-200 text-justify'}/>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default ListView