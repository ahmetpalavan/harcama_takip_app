import { useState,useEffect,useRef } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where, orderBy} from "firebase/firestore"; //onSnapshot anlık veride değişiklik olursa ekrana getirir.//

export const useCollection=(col,_query,_orderBy)=>{

    const [belgeler, setBelgeler] = useState(null)
    const [error, setError] = useState(null)
    const q=useRef(_query).current;
    const oBy=useRef(_orderBy).current
    useEffect(()=>{
        let ref=collection(db,col);
        if(q){
            ref=query(ref,where(...q))
        }
        if(oBy){
            ref=query(ref,orderBy(...oBy))
        }
        const unsubscribe=onSnapshot(ref,onSnapshot=>{
            let sonuclar=[];
            onSnapshot.docs.forEach(doc=>{
                sonuclar.push({...doc.data(),id:doc.id})
            })
            setBelgeler(sonuclar);
            setError(null)
        },error=>{
            console.log(error);
            setError('Veriler getirilemedi')
        })
        return ()=>unsubscribe()
    },[col])

    return {belgeler,error}
}