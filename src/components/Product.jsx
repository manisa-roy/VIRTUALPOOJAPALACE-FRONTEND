import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { addProductApi } from '../service/productApi'
import { useLocation, useNavigate } from 'react-router'
import { publicRequest } from '../requestMethods'
// import {addProduct} from "../redux/cartRedux";
import { useDispatch } from 'react-redux'
// import { addProductApi } from '../service/productApi'

const Info = styled.div`
opacity: 0;
width: 100%;
height: 100%;
position: absolute;
top:0;
left:0;
background-color: rgba(0,0,0,0.2);
z-index: 3;
display: flex;
flex-direction: column;
align-items:center;
justify-content: center;
transition: all 0.5s ease;
cursor: pointer;
`
const Subtotal = styled.div`
width: 40px;
height: 20px;
margin-top  : 80px;
border-radius: 10%;
background-color: green;
${'' /* align-items: center; */}
display: flex;
text-align:center;
padding:1px 20px;
`

const Container = styled.div`
display:flex;
flex-wrap: wrap;
margin: 5px;
width:18%;
max-width:25%;
height: 350px;
display: flex;
align-items: center;
justify-content: center;
background-color: #f5fbfd;
position: relative;
margin-right: 10px;
margin-bottom: 20px; 

&:hover ${Info}{
    opacity: 1;
}
`

const Circle = styled.div`
width: 200px;
height: 200px;
border-radius: 50%;
background-color: white;
position: absolute;
`
const Image = styled.img`
width: 100%;
height: 100%;
border-radius:20px;
z-index: 2;
object-fit: cover;
`

const Icon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: white;
display: flex;
align-items: center;
justify-content: center;
margin: 10px;
transition: all 0.5s ease;

&:hover{
    background-color: #e9f5f5;
    transform:scale(1.1);
}
`
const Button=styled.button`
${'' /* padding: 15px; */}
width: 40px;
height: 40px;
border-radius: 50%;
background-color: white;
${'' /* border: 2px solid teal;
background-color: white; */}
${'' /* cursor: pointer;
font-weight: 500;` */}`

const Product = ({ item }) => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
      const getProduct = async () => {
        try {
          const res = await publicRequest.get('/products/find/' + id);
          console.log(res);
          setProduct(res.data);
        } catch (e) {}
      };
      getProduct();
    }, [id]);
  
    // const handleQuantity = (type) => {
    //   if (type === 'dec') {
    //     quantity > 1 && setQuantity(quantity - 1);
    //   } else {
    //     setQuantity(quantity + 1);
    //   }
    // };
  
    const handleClick = async () => {
      // update cart
      const data = localStorage.getItem('user');
      console.log('data ,iss ', data);
      if (!data) {
        navigate('/login');
      } else {
        const data = await addProductApi({
          userId: JSON.parse(localStorage.getItem('user'))._id,
          productId: id,
          size: size,
          pricePerItem: product.price,
          quantity: quantity,
        });
        if (data) {
          window.location.reload();
          navigate('/cart');
        }
        navigate('/cart');
        alert('See already added Product');
      }
    };
  
    return (
      <Container>
        <Circle />
        <Image src={item.img} />
        <Info>
          <total>
            <Icon>
              <Button onClick={handleClick}>
                <ShoppingCartOutlined />
              </Button>
            </Icon>
            <Icon>
              <Link to={`/product/${item._id}`}>
                <SearchOutlined />
              </Link>
            </Icon>
          </total>
          <Subtotal>₨-{item.price}</Subtotal>
        </Info>
      </Container>
    );
  };
  export default Product;