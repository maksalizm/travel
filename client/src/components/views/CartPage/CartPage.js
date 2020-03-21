import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import { Empty, Result } from 'antd';


function CartPage(props) {
  const dispatch = useDispatch();
  const {userData, cartDetail, order} = props.user;
  const [total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    let cartItems = [];
    if (userData && userData.cart) {
      if (userData.cart.length > 0) {
        userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, userData.cart));
      }
    }
    
  }, [userData]);
  
  useEffect(() => {
    if (cartDetail && cartDetail.length > 0) {
      calculateTotal(cartDetail)
    } else {
      setShowTotal(false);
    }
  }, [cartDetail]);
  
  
  
  const calculateTotal = () => {
    let tempTotal = 0;
    
    cartDetail.map(item => {
      tempTotal += parseInt(item.price, 10) * item.quantity;
    });
    setTotal(tempTotal);
    setShowTotal(true);
  };
  
  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId))
  };
  
  return (
    <div style={{width: '85%', margin: '3rem auto'}}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock
          products={cartDetail}
          removeItem={removeFromCart}
        />
        
        {showTotal ?
          <div style={{marginTop: '3rem'}}>
            <h2>Total amount: ${total}</h2>
          </div>
          :
          showSuccess ?
          <Result
            status="success"
            title="Successfully Purchased Items"
          /> :
          <div style={{
            width: '100%', display: 'flex', flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <br/>
            <Empty description={false}/>
            <p>No Items In the Cart</p>
          </div>
        }
      </div>
    </div>
  );
}

export default CartPage;