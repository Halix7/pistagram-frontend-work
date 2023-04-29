import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { client } from '../client';
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { FeedQuery, SearchQuery } from '../utils/data';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins,setPins] =useState(null);
  const {categoryId} = useParams();
  
  useEffect(() => {
    setLoading(true);
    if(categoryId){
      const query = SearchQuery(categoryId);
      client.fetch(query).then((data)=>{
        setPins(data);
        setLoading(false);
      })
    }else{
      client.fetch(FeedQuery).then((data)=>{
        // console.log(data);
        setPins(data);
        setLoading(false);
        // console.log(pins);
      })
    }
  }, [categoryId])
  
  if(loading) return <Spinner message="We are adding new ideas for your feed!"/>
  if(!pins?.length) return <h2>No Pins Available</h2>
  return (
    <div>
      {
        pins && <MasonryLayout pins={pins}/>
      }
    
    </div>
  )
}

export default Feed