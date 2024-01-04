import React from 'react';
import styled from "styled-components";

export const ContainerStyled = styled.div`
  
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;

  .container {
    max-width: 2500px;
    width: 100%;
    height: 120vh;
    padding: 20px;
    background-color: #d9d9d9;


  }
  .topo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

  }
  .logoutButton {
    width: 5rem;
    height: 2rem;
    border-radius: 0.5rem;
    color: white;
    background-color: red;
    
  }

  .textH1 {
    font-size: 25px;
  }


  .skillsList {
    padding-left: 50px;
    padding-right: 50px;
  }

  .skillItem {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 25px;
    padding-right: 25px;
    border: 1px solid #12486B;
    border-radius: 5px;
  }

  .centerContent {
      display: flex;
      align-items: center;
      width: 100%;
  }

  .textContainer {
      flex: 1; 
      text-align:left; 
  }

  .skillImage {
      width: 50px;
      height: 50px;
      margin-right: 20px; 
  }

  .deleteButton {
    width: 5rem;
    height: 2rem;
    border-radius: 0.5rem;
    color: white;
    background-color: red;
    
  }

  .addButton {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 10rem;
    height: 3rem;
    border-radius: 0.5rem;
    color: white;
    background-color: green;
    font-size: 1.2rem;
    
  }
  .addButton:hover {
    scale: 1.1;
    font-weight: bold;
    background-color: darkgreen;

  }

  .levelButton {
      margin-left:10px;
      text-align: center;
      width: 120px; 
      border-radius: 4px;
      background-color: #419197;
      color: #fff;
  }
  .levelButton:hover {
      scale: 1.1;
  }


`;
