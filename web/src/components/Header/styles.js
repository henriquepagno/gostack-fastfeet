import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1920px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      height: 25px;
      width: 160px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const StyledLink = styled(Link)`
  font-weight: bold;
  color: ${(props) => (props.to.selected ? darken(0.4, '#b2b2b2') : '#b2b2b2')};
  padding: 0 10px;
  transition: color 0.2s;

  &:hover {
    color: ${darken(0.09, '#b2b2b2')};
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    button {
      background: #fff;
      margin: 5px 0 0;
      color: #d13e3e;
      border: 0;
      font-size: 14px;
      transition: color 0.2s;

      &:hover {
        color: ${darken(0.09, '#d13e3e')};
      }
    }
  }
`;
