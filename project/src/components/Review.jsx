import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { db,  } from "../config/firebase";
import Order from "./Order";
function ReviewOrders() {

    const search = useLocation().search
    const searchParams = new URLSearchParams(search)

  const [ordersList, setOrdersList] = useState(null);
  const postsRef = collection(db, "orders");



  const getOrders = async () => {
    let data = await getDocs(postsRef);
    
    console.log(searchParams.get('user'))

    setOrdersList(data)
    
    setOrdersList(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  
    
    

    console.log(data);
  };

  useEffect(() => {
   
  getOrders();
  console.log(ordersList)
  }, []);

  return (
    <div>
    <table>
      {ordersList?.map((order) => {
        if ( order.userid === searchParams.get('user')) {
          return <tr>
          <tr>

          <th>{order?.user}</th>
          <th>{order?.color}</th>
          <th>{(new Date(order?.timestamp?.seconds*1000)).toUTCString()}</th>
          <th>{order?.vendor}</th>
          </tr>
          <tr>

          <th>{order?.paperType}</th>
          <th>{order?.completeStatus === false ? "Pending" : "Completed" }</th>
          <th>{order?.description}</th>
          <td>{order?.completeStatus === true ? <button onClick={async() => {
            
            await deleteDoc(doc(db, "orders", order?.id));
            alert('Order completed and deleted')
          }}>Order Picked Up</button>  : ""}
          </td>

        
        
        </tr>
        <br />
        </tr>;
        }
      })}
      </table>
      {/* {ordersList?.map((order) => {
        return <Order order={order} key={order.id} />;
      })} */}
    </div>
  );
}

export default ReviewOrders;
