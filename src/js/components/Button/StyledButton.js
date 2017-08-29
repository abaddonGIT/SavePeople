/**
 * Created by abaddon on 29.08.2017.
 */
import styled from 'styled-components';

const Button = styled.button`
      display: inline-block;
      box-sizing: border-box;
      padding: 0.25em 2em;
      text-decoration: none;
      border-radius: 4px;
      margin-left: auto;
      background-color: #EC407A;
      -webkit-font-smoothing: antialiased;
      -webkit-touch-callout: none;
      user-select: none;
      cursor: pointer;
      outline: 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: bold;
      font-size: 18px;
      height: 40px;
      border: none;
      color: white;
      &:active {
        background: #41addd;
        color: #fff;
      }
`;

export default Button;