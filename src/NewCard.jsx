import axios from 'axios'
import React, { useEffect, useState } from 'react'

const NewCard = () => {
    const [newdata, setNewdata] = useState(null)
    useEffect(() => {
      getData()
    
    }, [])

    const getData=async()=>{
        const res=await axios.get('https://www.gov.uk/bank-holidays.json')
        console.log('new card res',res);
        setNewdata(res.data)
    }

    
    console.log(newdata, "comes as props");
    return (
        <div className="App">
            NewCArd
            {Object?.values(newdata)?.map((val, ind) => {
                return (
                    <div key={ind}>
                        <h2>{val?.division}</h2>
                        <div className="grid">
                            {val?.events?.slice(0, 10)?.map((item, ind) => {
                                return (
                                    <div className="card" key={ind.id}>
                                        <p>{item?.title}</p>
                                        <p>{item?.date}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}
export default NewCard