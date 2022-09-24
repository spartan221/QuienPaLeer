import React, { useEffect, useState } from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const baseURL = 'http://localhost:5000/api/book/getWithUsers'

const ViewBookSales = ()=>{
    const [books,setBooks] = useState([])

    useEffect(()=>{
        const getBooks = async()=>{
            const res = await axios.get(baseURL)
            setBooks(res.data)
        }
        getBooks();
    },[books])

    return(
        <Container>
        <Row>
          <Col>
          
          </Col>
          <Col>
          
          </Col>
          <Col>
          
          </Col>
        </Row>
        <Row>
          <Col>
          
          </Col>
          <Col>
          
          </Col>
          <Col>
          
          </Col>
        </Row>
      </Container>
    )

}

export default ViewBookSales